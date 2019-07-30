import React, { useState, useEffect, FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { Button, Paper, Chip, Container } from '@material-ui/core';

interface LobbyProps {
    history: History;
    match: any;
}

interface Players {
    [propName: string]: {
        role?: string;
    };
}

const LOCATIONS = ['WORK', 'HOME', 'STREET'];

const ROLES = ['NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY', 'NOTSPY'];

const shuffle = (arr: string[]) => {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
};

export const Lobby: FC<LobbyProps> = ({ history, match }) => {
    const [players, setPlayers] = useState<Players>({});

    useEffect(() => {
        const DBref = firebase.database().ref('rooms/' + match.params.lobbyId);
        DBref.on('value', function(snapshot) {
            snapshot.val() && setPlayers(snapshot.val().players);
            if (snapshot.val().process === 'game') {
                history.push('/game/' + match.params.lobbyId);
            }
        });
        return () => {
            DBref.off();
        };
    }, []);

    const start = () => {
        // firebase.database().ref('rooms/' + match.params.lobbyId + '/players').once('value').then((snapshot) => {
        //   console.warn(snapshot.val())
        // })
        const playersId = Object.keys(players);
        let roles = ROLES.slice(0, playersId.length - 1);
        roles.push('SPY');
        roles = shuffle(roles);
        console.warn(roles);
        // RANDOM LOCATION
        const location =
            LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

        // RANDOM ROLE
        for (let player in players) {
            console.warn(players[player]);
            players[player].role = roles.pop();
        }

        console.warn(players);
        firebase
            .database()
            .ref('rooms/' + match.params.lobbyId)
            .update({
                process: 'game',
                location: location,
                players: players,
            });
    };

    return (
        <Paper className='lobby'>
            <Chip label={"Код игры: " + match.params.lobbyId} variant="outlined"/>
            <Container>
            {players &&
                Object.keys(players).map((player, i) => {
                    return <Chip key={i} label={player} className="player"/>;
                })}
                </Container>
            <Button onClick={start} variant='contained' color='primary'>
                Старт
            </Button>
        </Paper>
    );
};
