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
import ErrorHandler from '../../components/commons/ErrorHandler';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Formik } from 'formik';
import * as yup from 'yup';

const initValues = {};

const schema = yup.object({});

const TodoDetail: FC = () => {
  return (
    <Formik
      initialValues={initValues}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        console.log({ values });
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
            <Card sx={{ maxWidth: 320 }}>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<EditIcon />}>
                  Edit
                </Button>
                <Button size="small" startIcon={<SaveIcon />}>
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default TodoDetail;
