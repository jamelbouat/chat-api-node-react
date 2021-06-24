import * as Yup from 'yup';

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
