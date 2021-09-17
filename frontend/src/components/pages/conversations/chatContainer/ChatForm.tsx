import React, { useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Button, Divider, makeStyles, Theme } from '@material-ui/core';

import { MyTextField } from '../../../CustomFields';
import { chatFormFieldsValidationSchema } from '../../../../utils/formsDataValidation';
import { IConversation, IMessageFormValues } from '../../../../interfaces/conversations';

const useStyles = makeStyles((theme: Theme) => ({
    layout: {
        width: '100%'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

interface Props {
    currentConversation: IConversation | undefined;
    sendMessage: (values: IMessageFormValues) => void
}

const ChatForm: React.FC<Props> = ({ sendMessage }) => {
    const classes = useStyles();
    const initialValues = { content: '' };
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        textFieldRef.current?.focus();
    });

    return (
        <div className={ classes.layout }>
            <Divider className={ classes.divider }/>
            <Formik
                initialValues={ initialValues }
                validationSchema={ chatFormFieldsValidationSchema }

                onSubmit={ (values: IMessageFormValues, { resetForm }: FormikHelpers<IMessageFormValues>) => {
                    // setSubmitting(true);
                    sendMessage(values);
                    // setSubmitting(false);
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
