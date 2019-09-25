import React, { FC, useState } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { TextField, Container } from '@material-ui/core';
import { Title, WrappedButton } from '../components';
import { ActionsWrapper, Form, StyledLink } from '../styled';

import { API } from '../api/api';

interface FormElements extends HTMLFormElement {
    playerId: HTMLInputElement;
}

interface JoinProps {
    history: History;
}

export const Join: FC<JoinProps> = ({ history }) => {
    const [isError, setError] = useState(false);
    
    const joinLobby = async (e: React.FormEvent<FormElements>) => {
        e.preventDefault();
        const playerId = e.currentTarget.playerId.value;
        const lobbyId = e.currentTarget.lobbyId.value;

        const lobby = await firebase
            .database()
            .ref('rooms/' + lobbyId)
            .once('value');

        if (lobby.val() && lobby.val().process === 'prepare') {
            API.joinLobby(playerId, lobbyId);
            localStorage.setItem('playerId', playerId);
            localStorage.setItem('lobbyId', lobbyId);
            history.push('/lobby/' + lobbyId);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    };

    return (
        <>
            <Title />
            <ActionsWrapper>
                <Form onSubmit={joinLobby} autoComplete="off">
                    <TextField label="Player name" variant="outlined" name='playerId' id='playerId' margin="dense" required/>
                    <TextField label="Lobby id" variant="outlined" name='lobbyId' id='lobbyId' margin="dense" required error={isError} helperText={isError && "Лобби не существует"}/>
                    <Container>
                        <WrappedButton>Join</WrappedButton>
                        <StyledLink to='/'>Back</StyledLink>
                    </Container>
                </Form>
            </ActionsWrapper>
        </>
    );
};
