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
import ImageIcon from '@mui/icons-material/Image';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import ErrorHandler from '../../components/commons/ErrorHandler';
import {
  DATE_FORMAT,
  INPUT_FILE_ID,
  LABEL_FILE_ID,
} from '../../utils/constants';
import useTodoDetail from '../../hooks/useTodoDetail';

const schema = yup.object({
  header: yup.string().trim().required('Header is required'),
  description: yup.string().trim().required('Description is required'),
  isDone: yup.boolean().required('Status is required'),
});

const TodoDetail: FC = () => {
  const {
    data,
    submit,
    isEditing,
    setIsEditing,
    backToList,
    imagePreviewUrl,
    handleImageChange,
    todoId,
    openInputFile,
    resetImage,
  } = useTodoDetail();

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        submit(values);
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
          <input
            className="d-none"
            type="file"
            id={INPUT_FILE_ID}
            onChange={handleImageChange}
            accept="image/x-png,image/jpeg"
          />
          <label htmlFor={INPUT_FILE_ID} id={LABEL_FILE_ID} className="mb-0" />
          <Grid item md={4}>
            <div className="mb-2">
              <Button onClick={() => backToList()}>Back to list</Button>
            </div>
            <Card sx={{ width: 320 }}>
              {imagePreviewUrl || values.image ? (
                <div className="todo-image-container">
                  <CardMedia
                    component="img"
                    height="140"
                    image={imagePreviewUrl || values.image}
                    alt="todo"
                  />
                  {isEditing && (
                    <Button
                      className="todo-change-image-btn"
                      size="small"
                      startIcon={<ImageIcon />}
                      onClick={() => openInputFile()}
                    >
                      Change image
                    </Button>
                  )}
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center todo-image-container">
                  <Button
                    size="small"
                    startIcon={<ImageIcon />}
                    onClick={() => openInputFile()}
                  >
                    Add image
                  </Button>
                </div>
              )}

              <CardContent>
                {isEditing ? (
                  <>
                    <div className="mb-2">
                      <InputLabel>Header</InputLabel>
                      <OutlinedInput
                        className="w-100"
                        placeholder="Header"
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
                        placeholder="Description"
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
                {isEditing && !!todoId && (
                  <Button
                    size="small"
                    startIcon={<ClearIcon />}
                    onClick={() => {
                      resetImage();
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
