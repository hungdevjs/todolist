import { FC } from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import NextIcon from '@mui/icons-material/NavigateNext';
import { Formik } from 'formik';
import * as yup from 'yup';

import ErrorHandler from '../../components/commons/ErrorHandler';

import useCheckAuth from '../../hooks/useCheckAuth';
import useLogin from '../../hooks/useLogin';

const schema = yup.object({
  name: yup.string().trim().required('Name is required'),
});

const initValues = { name: '' };

const Login: FC = () => {
  useCheckAuth();
  const { login } = useLogin();

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        login(values.name);
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
      }) => (
        <Grid
          container
          spacing={2}
          className="min-vh-100 min-vw-100 d-flex align-items-center justify-content-center"
        >
          <Grid item md={4}>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              className="w-100 mb-2"
              value={values.name}
              onChange={(e: any) => setFieldValue('name', e.target.value)}
              placeholder="Name"
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && <ErrorHandler text={errors.name} />}
            <Button
              variant="contained"
              className="w-100"
              endIcon={<NextIcon />}
              onClick={(_e: any) => handleSubmit()}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default Login;
