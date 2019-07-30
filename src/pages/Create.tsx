import React, { FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import TextField from '@material-ui/core/TextField';
import { Button, Paper, Typography } from '@material-ui/core';

interface FormElements extends HTMLFormElement {
    playerId: HTMLInputElement;
}

interface CreateProps {
    history: History;
}

export const Create: FC<CreateProps> = ({ history }) => {
    const createLobby = (e: React.FormEvent<FormElements>) => {
        e.preventDefault();

        const newLobbyId = Math.round(Math.random() * 10000);

        firebase
            .database()
            .ref('rooms/' + newLobbyId)
            .set({
                roomId: newLobbyId,
                players: {[e.currentTarget.playerId.value]: {
                  spy: false,
                }},
                process: 'prepare',
            });

        history.push('/lobby/' + newLobbyId);
    };

    return (
        <Paper className='create'>
            <form onSubmit={createLobby} autoComplete="off">
                <Typography variant="h1" component="div">S P Y F A L L</Typography>
                <TextField label="Player name" variant="outlined" name='playerId' id='playerId' margin="dense"/>
                <Button variant="contained" color="primary" type="submit">Создать</Button>
            </form>
        </Paper>
    );
};
