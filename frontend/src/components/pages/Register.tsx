import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import { MyTextField, MyPasswordField } from '../CustomFields';
import useStyles from '../makeFormStyles';
import { removeProperties } from '../../utils/objects';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';
import { ROUTES } from '../../constants';
import { registerFormFieldsValidationSchema } from '../../utils/formsDataValidation';
import { IRegisterFormValues } from '../../interfaces/user';
import { IAlert } from '../../interfaces/alert';

type Values = IRegisterFormValues & { confirmPassword: string };

interface Props {
    isLoading: boolean,
    alertInfo: IAlert,
    registerUser: (values: IRegisterFormValues) => void,
    clearRegisterAlert: () => void,
}

const Register: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const { isLoading, registerUser, alertInfo, clearRegisterAlert } = props;
    const alertType = alertInfo.alertType;
    const alertMessage = alertInfo.alertMessage || 'error !';

    useEffect(() => {
        return () => {
            clearRegisterAlert();
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
                            await registerUser(registrationValues as IRegisterFormValues);
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
