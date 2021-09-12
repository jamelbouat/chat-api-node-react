import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import { MyTextField, MyPasswordField } from '../CustomFields';
import useStyles from '../makeFormStyles';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';
import { ROUTES } from '../../constants';
import { loginFormFieldsValidationSchema } from '../../utils/formsDataValidation';
import { ILoginValues } from '../../interfaces/user';
import { IAlert } from '../../interfaces/alert';

interface Props {
    isLoading: boolean,
    alertInfo: IAlert,
    loginUser: (values: ILoginValues) => void,
    clearLoginAlert: () => void
}

const Login: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { email: '', password: '' };
    const { isLoading, alertInfo, loginUser, clearLoginAlert } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        return () => {
            clearLoginAlert();
        };
    }, []);

    return (
        <main className={ classes.layout }>
            {
                isLoading && <ProgressIndicator/>
            }
            <Paper elevation={ 3 } className={ classes.paper }>
                <Container>
                    {
                        alertType &&
                        <AlertInfo
                            message={ alertMessage }
                            severity={ alertType }
                        />
                    }
                    <Typography variant='h5' align='center' gutterBottom>
                        Sign in
                    </Typography>

                    <Formik
                        initialValues={ initialValues }
                        validationSchema={ loginFormFieldsValidationSchema }

                        onSubmit={ async (values: ILoginValues, { setSubmitting }: FormikHelpers<ILoginValues>) => {
                            // setSubmitting(true);
                            await loginUser(values);
                            // setSubmitting(false);
                        } }
                    >
                        {
                            ({ isSubmitting, isValid }) => (
                                <Form>
                                    <MyTextField
                                        fullWidth
                                        name='email'
                                        label='Email'
                                        type='text'
                                        variant='outlined'
                                        autoComplete='email'
                                        className={ classes.field }
                                        size='small'
                                    />
                                    <MyPasswordField
                                        fullWidth
                                        name='password'
                                        label='Password'
                                        variant='outlined'
                                        autoComplete='current-password'
                                        className={ classes.field }
                                        size='small'
                                    />
                                    <Button
                                        fullWidth
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                        disabled={ !isValid || isSubmitting  }
                                        classes={ { root: classes.button, disabled: classes.disabled } }
                                    >
                                            Sign in
                                    </Button>
                                    <Grid container className={ classes.links } >
                                        <Grid item>
                                            <Typography variant='subtitle2'>
                                                <Link to={ ROUTES.LOGIN } >
                                                    Forgot password?
                                                </Link>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='subtitle2'>
                                                <Link to={ ROUTES.REGISTER } >
                                                    {'Don\'t have an account? Sign up'}
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                    </Formik>
                </Container>
            </Paper>
        </main>
    );
};

export default Login;
