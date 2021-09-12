import React from 'react';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';

import { IUser } from '../../../../interfaces/user';
import ContactCard from '../../../../containers/ContactCard';

const useStyles = makeStyles(() => ({
    layout: {
        height: '100%',
    },
    imageList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '100%',
        overflow: 'auto'
    },
    imageListItem: {
        minWidth: '200px'
    }
}));

interface Props {
    users: IUser[]
}

const ContactsContainer: React.FC<Props> = ({ users }) => {
    const classes = useStyles();

    return(
        <div className={ classes.layout } >
            <ImageList rowHeight={ 280 } gap={ 8 } cols={ 4 } className={ classes.imageList }>
                {
                    users && users.map(user => (
                        <ImageListItem key={ user._id } rows={ 1 } className={ classes.imageListItem }>
                            <ContactCard user={ user } />
                        </ImageListItem>
                    ))
                }
            </ImageList>
        </div>
    );
};

export default ContactsContainer;
