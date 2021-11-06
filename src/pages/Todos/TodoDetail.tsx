import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import ErrorHandler from '../../components/commons/ErrorHandler';
import { DATE_FORMAT } from '../../utils/constants';
import useTodoDetail from '../../hooks/useTodoDetail';

const schema = yup.object({
  header: yup.string().trim().required('Header is required'),
  description: yup.string().trim().required('Description is required'),
  isDone: yup.boolean().required('Status is required'),
  image: yup.string().trim().required('Image is required'),
});

const TodoDetail: FC = () => {
  const { data, updateData, isEditing, setIsEditing, backToList } =
    useTodoDetail();

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        updateData(values);
      }}
    >
      {({
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        setFieldValue,
        resetForm,
      }) => (
        <Grid
          container
          spacing={2}
          className="min-vh-100 min-vw-100 d-flex align-items-center justify-content-center"
        >
          <Grid item md={4}>
            <div className="mb-2">
              <Button onClick={() => backToList()}>Back to list</Button>
            </div>
            <Card sx={{ maxWidth: 320 }}>
              <CardMedia
                component="img"
                height="140"
                image={values.image || 'https://picsum.photos/200'}
                alt="todo"
              />
              <CardContent>
                {isEditing ? (
                  <>
                    <div className="mb-2">
                      <InputLabel>Header</InputLabel>
                      <OutlinedInput
                        className="w-100"
                        value={values.header}
                        onChange={(e) =>
                          setFieldValue('header', e.target.value)
                        }
                        onBlur={handleBlur('header')}
                      />
                      {touched.header && errors.header && (
                        <ErrorHandler text={errors.header} />
                      )}
                    </div>
                    <div>
                      <InputLabel>Description</InputLabel>
                      <OutlinedInput
                        className="w-100"
                        multiline
                        rows={5}
                        value={values.description}
                        onChange={(e) =>
                          setFieldValue('description', e.target.value)
                        }
                        onBlur={handleBlur('description')}
                      />
                      {touched.description && errors.description && (
                        <ErrorHandler text={errors.description} />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {values.creator && (
                      <p className="todo-item-info mb-2">{values.creator}</p>
                    )}
                    {values.createdAt && (
                      <p className="todo-item-info mb-2">
                        {moment(new Date(values.createdAt)).format(DATE_FORMAT)}
                      </p>
                    )}
                    <Typography gutterBottom variant="h5" component="div">
                      {values.header}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {values.description}
                    </Typography>
                  </>
                )}
              </CardContent>
              <CardActions className="ml-2">
                <Button
                  size="small"
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={() => {
                    isEditing ? handleSubmit() : setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
                {isEditing && (
                  <Button
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={() => {
                      setIsEditing(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default TodoDetail;
