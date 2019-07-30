import React, { FC, useState } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { Paper, Button, TextField, Typography } from '@material-ui/core';

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
            firebase
                .database()
                .ref('rooms/' + lobbyId + '/players')
                .update({
                    [playerId]: {
                        spy: false,
                    },
                });

            history.push('/lobby/' + lobbyId);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
        }
    };

    return (
        <Paper className='join'>
            <form onSubmit={joinLobby} autoComplete="off">
                <Typography variant="h1" component="div">S P Y F A L L</Typography>
                <TextField label="Player name" variant="outlined" name='playerId' id='playerId' margin="dense" required/>
                <TextField label="Lobby id" variant="outlined" name='lobbyId' id='lobbyId' margin="dense" required error={isError} helperText={isError && "Лобби не существует"}/>
                <Button variant="contained" color="primary" type="submit">Присоединиться</Button>
            </form>
        </Paper>
    );
};
