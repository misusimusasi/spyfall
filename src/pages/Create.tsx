import React, { FC, useState } from 'react';
import { History } from 'history';
import { TextField, Container } from '@material-ui/core';
import { Title, WrappedButton } from '../components';
import { Form, ActionsWrapper, StyledLink } from '../styled';
import { API } from '../api/api';

interface FormElements extends HTMLFormElement {
    playerId: HTMLInputElement;
}

interface CreateProps {
    history: History;
}

export const Create: FC<CreateProps> = ({ history }) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    
    const createLobby = async (e: React.FormEvent<FormElements>) => {
        setLoading(true);
        e.preventDefault();
        const playerId = e.currentTarget.playerId.value;
        const lobbyId = await API.createLobby(playerId);

        localStorage.setItem('playerId', playerId);
        localStorage.setItem('lobbyId', lobbyId);
        history.push('/lobby/' + lobbyId);
    };

    return (
        <>
            <Title />
            <ActionsWrapper>
                <Form onSubmit={createLobby} autoComplete="off">
                    <TextField label="Player name" variant="outlined" name='playerId' id='playerId' margin="dense" required />
                    {loading || (
                        <Container>
                            <WrappedButton>Create</WrappedButton>
                            <StyledLink to='/'>Back</StyledLink>
                        </Container>
                    )}
                </Form>
            </ActionsWrapper>
        </>
    );
};
