import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import {
    makeStyles,
    Dialog,
    Button,
    DialogContent,
    DialogTitle,
    Fab,
    TextField,
    Tooltip,
    DialogActions, Theme
} from '@material-ui/core';

import { IUser } from '../../../../interfaces/user';

const useStyle = makeStyles((theme: Theme) => ({
    layout:{
        flex: '0 1 auto'
    },
    button: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}));

interface Props {
    users: IUser[]
}

const AddConversationGroupButton: React.FC<Props> = ({ users }) => {
    const classes = useStyle();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div className={ classes.layout }>
            <Tooltip title='Add a conversation group'>
                <Fab
                    className={ classes.button }
                    color='primary'
                    aria-label='add'
                    size='small'
                    onClick={ handleClickOpen }
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog open={ open } onClose={ handleClose } aria-labelledby='form-dialog-title' fullWidth={ true }>
                <DialogTitle id='form-dialog-title'>New conversation group</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        multiple
                        options={ users }
                        getOptionLabel={ (option) => `${ option.firstName } ${ option.lastName }` }
                        filterSelectedOptions
                        renderInput={ (params) => (
                            <TextField
                                { ...params }
                                autoFocus
                                variant='outlined'
                                label='Select a user'
                            />
                        ) }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose } color='primary' variant='contained'>
                        Cancel
                    </Button>
                    <Button onClick={ handleClose } color='primary' variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddConversationGroupButton;
