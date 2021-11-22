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

const SwalComponent = withReactContent(Swal);

const BillsForm = ({ handleChange }) => {
  //Styles
  const paperStyle = {
    padding: '20',
    height: '36vh',
    width: '300',
    margin: '0 auto',
  };
  const avatarStyle = { backgroundColor: '#02CAF8' };
  const headerStyle = {
    margin: '0',
    fontFamily: 'roboto',
    fontSize: '18',
    fontWeight: '300',
    padding: '25',
  };

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #02CAF8, 30%, blue 70%)',
      borderRadius: '4',
      border: '0',
      color: 'white',
      height: '48',
      padding: '25px 30px',
      margin: '25px 0',
      fontFamily: 'roboto',
      fontSize: '18',
      fontWeight: '300',
    },
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

  const onSubmit = (values, props) => {
    run(values.document, props);
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
  const consultFields = async (token) => {
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

  const consultBills = async (token, document) => {
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

  const run = async (document, props) => {
    const token = await login();
    const campos = await consultFields(token);
    const facturas = await consultBills(token, document);

    setUsers({ campos, facturas });
    props.resetForm();
    props.setSubmitting();
  };

  console.log(users);

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
    let title = '';
    let body = '';
    const campos = users.campos.data;
    const facturas = users.facturas.data.bills;

    for (let index = 0; index < campos.length; index++) {
      title += `<th>${campos[index].name}</th>`;
    }

    for (let index = 0; index < facturas.length; index++) {
      body += '<tr>';
      for (let index2 = 0; index2 < campos.length; index2++) {
        body += `<td data-label="${campos[index2].name}> ${
          facturas[index][campos[index2].key]
            ? facturas[index][campos[index2].key]
            : '-'
        }</td>`;
      }
      body += '</tr>';
    }

    //SWAL
    SwalComponent.fire({
      title: 'Detalle de Factura',
      html: `<table>
      <thead>
        <tr>
          ${title}
        </tr>
      </thead>
      <tbody>
        ${body}
      </tbody>
    </table>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        users.facturas.data.bills.length > 1
          ? 'Pagar Facturas'
          : 'Pagar Factura',
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
      {users
        ? users.facturas.data.bills.length > 0
          ? modalTest()
          : modalHandler()
        : null}
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
                disabled={props.isSubmitting}
                classes={{ root: classes.root, label: classes.label }}
              >
                {props.isSubmitting ? 'Cargando' : 'Continuar'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default BillsForm;
