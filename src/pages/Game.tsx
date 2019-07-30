import React, { useState, useEffect, FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { Paper } from '@material-ui/core';

interface GameProps {
    history: History;
    match: any;
}

export const Game: FC<GameProps> = ({ history, match }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const DBref = firebase.database().ref('rooms/' + match.params.lobbyId);
        DBref.on('value', function(snapshot) {
            snapshot.val() && setPlayers(snapshot.val().players);
            if (snapshot.val().process === 'result') {
                history.push('/result/' + match.params.lobbyId);
            }
        });
        return () => {
            DBref.off();
        };
    }, []);

    return (
        <Paper className='game'>
            Lobby id: {match.params.lobbyId}
            <p>Players:</p>
            {players &&
                Object.keys(players).map((player, i) => {
                    return <div key={i}>{player}</div>;
                })}
        </Paper>
    );
};
