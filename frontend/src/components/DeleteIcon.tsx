import React from 'react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    icon: {
        position: 'absolute',
        fontSize: '27px',
        right: 5,
        cursor: 'pointer',
        '&:hover': {
            fontSize: '28px',
            color: 'rgba(63,81,180,1)'
        }
    }
}));

interface Props {
    title: string;
    onDeleteIconClick: () => void
}

const DeleteIcon: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { title, onDeleteIconClick } = props;

    return(
        <Tooltip title={ title }>
            <CancelOutlinedIcon
                className={ classes.icon }
                onClick={ onDeleteIconClick }
            />
        </Tooltip>
    );
};

export default DeleteIcon;
