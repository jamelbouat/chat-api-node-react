import React, { useState } from 'react';
import { FieldAttributes, useField } from 'formik';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as Yup from 'yup';

export interface FieldProps extends FieldAttributes<any> {
    label: string,
    type?: string,
    autoComplete?: string
}

const MyField: React.FC<FieldProps> = ({ name, ...props }) => {
    const [field, meta] = useField<FieldAttributes<any>>(name);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return(
        <TextField
            { ...props }
            { ...field }
            helperText={ errorText }
            error={ !!errorText }
        />
    );
};

export const MyTextField: React.FC<FieldProps> = (props) => {
    return MyField(props);
};

export const MyPasswordField: React.FC<FieldProps> = (props) => {
    const [ showPassword, setShowPassword ] = useState(false);
    const type = showPassword ? 'text' : 'password';

    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const InputProps = {
        endAdornment : (
            <InputAdornment position='end'>
                <IconButton
                    aria-label='toggle password visibility'
                    onClick={ handleClickShowPassword }
                >
                    { showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )
    };

    return MyField({ ...props, type, InputProps });
};

export const loginFormFieldsValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),

    password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
});

export const registerFormFieldsValidationSchema = Yup.object({
    firstName: Yup.string()
        .max(20, 'Must be 15 characters or less')
        .min(3, 'Must be at least 3 characters long')
        .required('Required'),

    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(3, 'Must be at least 3 characters long')
        .required('Required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),

    password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
});
