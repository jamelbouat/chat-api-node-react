import React, { FC, MouseEvent } from 'react';
import { Button, ButtonGroup, makeStyles, Theme } from '@material-ui/core';

import ContactsList from './ContactsList';
import ConversationsList from './ConversationsList';
import { IUser } from '../../../../interfaces/user';

const useStyles= makeStyles((theme: Theme) => ({
    buttonGroupLayout: {
        justifyContent: 'center',
        width: '100%',
        paddingBottom: theme.spacing(2)
    },
    contactsConversationsLayout: {
        overflow: 'auto',
        height: '70vh'
    },
}));

interface Props {
    users: IUser[],
}

const SideBar: FC<Props> = ({ users }) => {
    const classes = useStyles();
    const [alignment, setAlignment] = React.useState<string | null>('contacts');

    const handleAlignment = (e: MouseEvent<HTMLButtonElement> | string) => {
        setAlignment(typeof e === 'string' ? e : e.currentTarget.value);
    };

    return (
        <>
            <ButtonGroup classes={ { root: classes.buttonGroupLayout } } >
                <Button
                    value='contacts'
                    onClick={ handleAlignment }
                    color={ alignment === 'contacts' ? 'primary': 'default' }
                    variant='contained'
                >
                        Contacts
                </Button>
                <Button
                    value='conversations'
                    onClick={ handleAlignment }
                    color={ alignment === 'conversations' ? 'primary': 'default' }
                    variant='contained'
                >
                        Conversations
                </Button>
            </ButtonGroup>

            <div className={ classes.contactsConversationsLayout }>
                {
                    alignment === 'contacts' && <ContactsList users = { users } handleAlignment={ handleAlignment }/>
                }
                {
                    alignment === 'conversations' && <ConversationsList />
                }
            </div>

        </>
    );
};

export default SideBar;
