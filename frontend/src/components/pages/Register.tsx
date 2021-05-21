import React from 'react';
import { Button, Container, Link, Paper, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import {
    MyTextField,
    MyPasswordField,
    registerFormFieldsValidationSchema
} from '../CustomField';
import useStyles from '../makeFormStyles';
import { IRegisterValues } from '../../interfaces';
import { removeProperties } from '../../utils/objects';
import AlertInfo from '../AlertInfo';
import ProgressIndicator from '../ProgressIndicator';

interface Values {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string
}

interface Props {
    isLoading: boolean,
    registerUser: (values: IRegisterValues) => void,
    alert: {
        alertType: string,
        alertMessage: string
    }
}

const Register: React.FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const { isLoading, registerUser, alert } = props;
    const alertType = alert.alertType === 'REGISTER_SUCCESS' ? 'success' : null;
    const alertMessage = alert.alertMessage || 'error !';

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
                            setSubmitting(true);
                            await registerUser(registrationValues as IRegisterValues);
                            setSubmitting(false);
                        }}
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
                                        classes={{ root: classes.button, disabled: classes.disabled }}
                                    >
                                            Sign up
                                    </Button>
                                    <Typography variant='subtitle1'>
                                        <Link href="#" variant="body2">
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
