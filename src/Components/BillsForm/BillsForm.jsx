import { React, useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { paperStyle, avatarStyle, headerStyle, root } from './BillsFormStyles';
import SingleTable from '../SingleTable/SingleTable';
import MultiTable from '../MultiTable/MultiTable';
import LowerContent from '../LowerContent/LowerContent';

const SwalComponent = withReactContent(Swal);

const BillsForm = ({ handleChange }) => {
  const useStyles = makeStyles({
    root,
    label: {
      textTransform: 'capitalize',
    },
  });

  const classes = useStyles();
  const initialValues = {
    document: '',
  };

  const validationSchema = Yup.object().shape({
    document: Yup.number()
      .positive('Introduzca solo numeros positivos')
      .required('Campo requerido')
      .integer('Solo numeros enteros')
      .typeError('Debe especificar solo numeros de documento'),
  });

  const onSubmit = async ({ document }, props) => {
    const token = await login();
    const { data: fieldsData } = await fetchFields(token);
    const {
      data: { bills },
    } = await fetchBills(token, document);
    setUsers({ fields: fieldsData, bills });
    props.resetForm();
    props.setSubmitting();
  };

  //API consumption
  const instance = axios.create({
    baseURL: 'https://apify.epayco.co/',
  });

  //We login using the instance created in axios using the auth credentials provided.
  const login = async () => {
    return await instance
      .post(
        '/login/mail',
        {},
        {
          auth: {
            username: 'pruebafront@payco.co',
            password: 'pruebafront$2020',
          }, //With the promise we get the token from the data
        }
      )
      .then((response) => {
        return response.data.token;
      })
      .catch((error) => {
        console.log(error.message);
        return 'Error';
      });
  };

  //
  const fetchFields = async (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await instance
      .post(
        '/billcollect/proyect/config/consult',
        {
          projectId: 29,
        },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return 'Error';
      });
  };

  const fetchBills = async (token, document) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await instance
      .post(
        '/billcollect/invoices/consult',
        {
          projectId: 29,
          document,
        },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
        return 'Error';
      });
  };

  const [users, setUsers] = useState(null);

  //Modals
  const modalHandler = () => {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, introduzca un documento valido',
      icon: 'warning',
      confirmButtonText: 'Ir al Formulario',
    });
  };

  const modalTest = () => {
    const { fields, bills } = users;
    const data = { titles: fields, bills };

    //SWAL
    SwalComponent.fire({
      title: 'Detalle de Factura',
      html:
        users.bills.length > 1 ? (
          <MultiTable data={data} />
        ) : (
          <SingleTable data={data} />
        ),
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      width: '1200px',
      confirmButtonText:
        users.bills.length > 1 ? 'Pagar Facturas' : 'Pagar Factura',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: 'Cancelar',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.isConfirmed) {
        modalPayment();
      } else {
      }
    });
  };

  const modalPayment = () => {
    SwalComponent.fire({
      title: 'Confirmar Pago',
      text: 'Factura por pagar',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        SwalComponent.fire(
          'Pagado!',
          'Su factura ha sido cancelada.',
          'success'
        );
      }
    });
  };

  return (
    <Grid>
      {users ? (users.bills.length ? modalTest() : modalHandler()) : null}
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>{/* <PermIdentityIcon /> */}</Avatar>
          <h2 style={headerStyle}>Consulte sus facturas</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label='Número de identificación del usuario'
                name='document'
                placeholder='Ingrese Documento'
                fullWidth
                required
                helperText={<ErrorMessage name='document' />}
              />

              <Button
                type='submit'
                color='primary'
                fullWidth
                variant='contained'
                size='large'
                disabled={props.isSubmitting}
                classes={{ root: classes.root, label: classes.label }}
              >
                {props.isSubmitting ? 'Cargando' : 'Continuar'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
      <LowerContent />
    </Grid>
  );
};

export default BillsForm;
