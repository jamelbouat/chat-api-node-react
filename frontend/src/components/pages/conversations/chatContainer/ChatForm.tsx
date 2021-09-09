import React, { FC, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Button, Divider, makeStyles, Theme } from '@material-ui/core';

import { MyTextField } from '../../../CustomFields';
import { chatFormFieldsValidationSchema } from '../../../../utils/formsDataValidation';
import { IConversation } from '../../../../interfaces/conversations';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        width: '100%'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

export interface IMessageValues {
    content: string
}

interface Props {
    currentConversation: IConversation | undefined;
    sendMessage: (message: IMessageValues) => void
}

const ChatForm: FC<Props> = ({ sendMessage }) => {
    const classes = useStyles();
    const initialValues = { content: '' };
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={ classes.layout }>
            <Divider className={ classes.divider }/>
            <Formik
                initialValues={ initialValues }
                validationSchema={ chatFormFieldsValidationSchema }

                onSubmit={ (values: IMessageValues, { resetForm }: FormikHelpers<IMessageValues>) => {
                    // setSubmitting(true);
                    sendMessage(values);
                    // setSubmitting(false);
                    textFieldRef.current?.focus();
                    resetForm({});
                } }
            >
                {
                    ({ isSubmitting, isValid }) => (
                        <Form>
                            <Grid container spacing={ 1 } alignItems='center' justifyContent={ 'space-between' }>
                                <Grid item xs={ 10 }>
                                    <MyTextField
                                        fullWidth
                                        name='content'
                                        label='Message'
                                        type='text'
                                        variant='outlined'
                                        size='small'
                                        autoFocus
                                        inputRef={ textFieldRef }
                                    />
                                </Grid>
                                <Grid item xs={ 2 }>
                                    <Button
                                        fullWidth
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                        disabled={ !isValid || isSubmitting  }
                                    >
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
            </Formik>
        </div>
    );
};

export default ChatForm;
