import React, { FC, useRef } from 'react';
import { Form, Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import { Button, Divider, makeStyles, Theme } from '@material-ui/core';

import { MyTextField } from '../../../CustomFields';
import { chatFormFieldsValidationSchema } from '../../../../utils/formsDataValidation';

const useStyles = makeStyles((theme: Theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    formPosition: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    }
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

interface IChatMessage {
    message: string
}

const ChatForm: FC<Props> = (props) => {
    const classes = useStyles();
    const initialValues = { message: '' };
    const textFieldRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={ classes.formPosition }>
            <Divider className={ classes.divider }/>
            <Formik
                initialValues={ initialValues }
                validationSchema={ chatFormFieldsValidationSchema }

                onSubmit={ async (values: IChatMessage, { resetForm }) => {
                    // setSubmitting(true);
                    // await sendMessage(value);
                    // setSubmitting(false);
                    textFieldRef.current?.focus();
                    resetForm({});
                } }
            >
                {
                    ({ isSubmitting, isValid }) => (
                        <Form>
                            <Grid container spacing={ 1 } alignItems='center' justify={ 'space-between' }>
                                <Grid item xs={ 10 }>
                                    <MyTextField
                                        fullWidth
                                        name='message'
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
