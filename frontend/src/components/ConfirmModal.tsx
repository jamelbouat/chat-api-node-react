import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    open: boolean;
    title: string;
    content: string;
    onConfirmModalClick: () => void
    onCancelModalClick: () => void
}

const ConfirmModal: React.FC<Props> = (props) => {
    const { open, title, content, onConfirmModalClick, onCancelModalClick } = props;
    const handleConfirmModalClick = () => onConfirmModalClick();
    const handleCloseModalClick = () => onCancelModalClick();

    return (
        <Dialog
            open={ open }
            onClose={ handleCloseModalClick }
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    { content }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleCloseModalClick } color='primary'>
                        Cancel
                </Button>
                <Button onClick={ handleConfirmModalClick } color='primary'>
                        Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
