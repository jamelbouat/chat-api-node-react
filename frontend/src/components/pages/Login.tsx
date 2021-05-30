import React, { useEffect } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import { MyTextField, MyPasswordField, loginFormFieldsValidationSchema } from '../CustomField';
import useStyles from '../makeFormStyles';
import { IAlert, ILoginValues, IUser } from '../../interfaces';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';
import { Link } from 'react-router-dom';
import { ALERT_TYPE, ROUTES } from '../../constants';

interface Props {
    isLoading: boolean,
    alertInfo: IAlert,
    loginUser: (values: ILoginValues) => void,
    clearAlertInfo: () => void
}

const Login: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { email: '', password: '' };
    const { isLoading, alertInfo, loginUser, clearAlertInfo } = props;

    const alertType = alertInfo.alertType === ALERT_TYPE.FAILURE ? 'error' :
        alertInfo.alertType === ALERT_TYPE.SUCCESS ? 'success' : null;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        return () => {
            clearAlertInfo();
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
