import React, { useState } from 'react';
import { FieldAttributes, useField } from 'formik';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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

const MyTextField: React.FC<FieldProps> = (props) => {
    return MyField(props);
};

const MyPasswordField: React.FC<FieldProps> = (props) => {
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

export { MyTextField, MyPasswordField };
