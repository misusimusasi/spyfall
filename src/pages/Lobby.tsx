import React, { useState, useEffect, FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { Chip, CircularProgress  } from '@material-ui/core';
import { PlayersList, WrappedButton } from '../components';
import { API } from '../api/api';

interface LobbyProps {
    history: History;
    match: any;
}

interface Players {
    [propName: string]: {
        role?: string;
    };
}

export const Lobby: FC<LobbyProps> = ({ history, match }) => {
    const [players, setPlayers] = useState<Players>({});
    const [loading, setLoading] = useState<boolean>(true);

    const { lobbyId } = match.params;

    useEffect(() => {
        const DBref = firebase.database().ref('rooms/' + lobbyId);
        DBref.once('value').then(snapshot => {
            if (snapshot.exists()) {
                DBref.on('value', (snapshot) => {
                    if (snapshot.val().process === 'game') {
                        history.push('/game/' + lobbyId);
                    } else {
                        setPlayers(snapshot.val().players);
                        setLoading(false);
                    }
                })
            } else {
                history.push('/');
            }
        })
        return () => {
            DBref.off();
        };
    }, []);

    const handleStart = () => {
        API.startGame(lobbyId);
    };

    return (
        <>
            {
                loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Chip label={'Код игры: ' + lobbyId} variant='outlined' />
                        <PlayersList players={players} />
                        <WrappedButton onClick={handleStart}>Start</WrappedButton>
                    </>
                )
            }
        </>
    );
};
