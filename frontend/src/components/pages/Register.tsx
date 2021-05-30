import React, { useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import {
    MyTextField,
    MyPasswordField,
    registerFormFieldsValidationSchema
} from '../CustomField';
import useStyles from '../makeFormStyles';
import { IAlert, IRegisterValues } from '../../interfaces';
import { removeProperties } from '../../utils/objects';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';
import { ALERT_TYPE, ROUTES } from '../../constants';
import { Link } from 'react-router-dom';

type Values = IRegisterValues & { confirmPassword: string };

interface Props {
    isLoading: boolean,
    alertInfo: IAlert,
    registerUser: (values: IRegisterValues) => void,
    clearAlertInfo: () => void,
}

const Register: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const { isLoading, registerUser, alertInfo, clearAlertInfo } = props;

    const alertType = alertInfo.alertType === ALERT_TYPE.FAILURE && 'error';
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        return () => {
            clearAlertInfo();
        };
    }, []);

    return (
        <main className={ classes.layout }>
            {
                isLoading && <ProgressIndicator />
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
                        Sign up
                    </Typography>

                    <Formik
                        initialValues={ initialValues }
                        validationSchema={ registerFormFieldsValidationSchema }

                        onSubmit={ async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                            const registrationValues = removeProperties(values, 'confirmPassword');
                            // setSubmitting(true);
                            await registerUser(registrationValues as IRegisterValues);
                            // setSubmitting(false);
                        } }
                    >
                        {
                            ({ isSubmitting, isValid }) => (
                                <Form>
                                    <MyTextField
                                        fullWidth
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        variant='outlined'
                                        autoComplete='first-name'
                                        className={ classes.field }
                                        size='small'
                                    />
                                    <MyTextField
                                        fullWidth
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        variant='outlined'
                                        autoComplete='last-name'
                                        className={ classes.field }
                                        size='small'
                                    />
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
                                    <MyPasswordField
                                        fullWidth
                                        name='confirmPassword'
                                        label='Confirm password'
                                        autoComplete='confirm-password'
                                        variant='outlined'
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
                                            Sign up
                                    </Button>
                                    <Typography variant='subtitle2'>
                                        <Link to={ ROUTES.LOGIN }>
                                            {'Already have an account? Sign in'}
                                        </Link>
                                    </Typography>
                                </Form>
                            )}
                    </Formik>
                </Container>
            </Paper>
        </main>
    );
};

export default Register;
