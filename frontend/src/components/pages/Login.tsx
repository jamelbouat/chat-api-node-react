import React, { useEffect } from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import { MyTextField, MyPasswordField, loginFormFieldsValidationSchema } from '../CustomField';
import useStyles from '../makeFormStyles';
import { ILoginResponseData, ILoginValues } from '../../interfaces';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';
import { IAlert } from '../../actions/alertInfo';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface Values {
    email: string;
    password: string;
}

interface Props {
    isLoading: boolean,
    user: ILoginResponseData,
    isAuthenticated: boolean,
    loginUser: (values: ILoginValues) => void,
    clearAlert: () => void,
    alertInfo: IAlert
}

const Login: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { email: '', password: '' };
    const { isLoading, user, isAuthenticated, alertInfo, loginUser, clearAlert } = props;

    const alertType = alertInfo.alertType === 'LOGIN_FAIL' ? 'error' :
        alertInfo.alertType === 'REGISTER_SUCCESS' ? 'success' : null;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        return () => {
            clearAlert();
        };
    }, []);

    return (
        <main className={ classes.layout }>
            {
                isLoading && <ProgressIndicator/>
            }
            <Paper elevation={ 3 } className={ classes.paper}>
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

                        onSubmit={ async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                            // setSubmitting(true);
                            await loginUser(values);
                            // setSubmitting(false);
                        }}
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
                                        classes={{ root: classes.button, disabled: classes.disabled }}
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
