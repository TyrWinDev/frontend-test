import React from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  paperStyle,
  avatarStyle,
  headerStyle,
  root,
} from './AutoPaymentsStyles';

import LowerContent from '../LowerContent/LowerContent';

const AutoPayments = ({ handleChange }) => {
  const useStyles = makeStyles({
    root,
    label: {
      textTransform: 'capitalize',
    },
  });

  const classes = useStyles();
  const initialValues = {
    documento: '',
  };

  const validationSchema = Yup.object().shape({
    documento: Yup.number()
      .positive('Introduzca solo numeros positivos')
      .required('Campo requerido')
      .integer('Solo numeros enteros')
      .typeError('Debe especificar solo numeros de documento'),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>{/* <AccountBalanceIcon /> */}</Avatar>
          <h2 style={headerStyle}>
            Suscriba sus facturas para pagos automaticos
          </h2>
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
                name='documento'
                placeholder='Ingrese Documento'
                fullWidth
                required
                helperText={<ErrorMessage name='documento' />}
              />

              <Button
                type='submit'
                color='primary'
                fullWidth
                variant='contained'
                disabled={props.isSubmitting}
                classes={{
                  root: classes.root,
                  label: classes.label,
                }}
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

export default AutoPayments;
