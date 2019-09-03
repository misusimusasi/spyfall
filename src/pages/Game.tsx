import React, { useState, useEffect, FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { Chip } from '@material-ui/core';
import { PlayersList, Timer } from '../components';
import moment from 'moment';

interface GameProps {
    history: History;
    match: any;
}

export const Game: FC<GameProps> = ({ history, match }) => {
    const [players, setPlayers] = useState([]);
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        let interval: any;
        const DBref = firebase.database().ref('rooms/' + match.params.lobbyId);
        DBref.on('value', function(snapshot) {
            snapshot.val() && setPlayers(snapshot.val().players);
            if (snapshot.val().process === 'result') {
                history.push('/result/' + match.params.lobbyId);
            }
        });
        DBref.once('value').then(snapshot => {
            const endTime = snapshot.val().endTime;
            interval = setInterval(() => {
                setTime(moment(endTime - +moment()).format('mm.ss'))
            }, 1000);
        })
        return () => {
            clearInterval(interval);
            DBref.off();
        };
    }, []);

    return (
        <>
            <Timer time={time} />
            {/* <Chip label={"Код игры: " + match.params.lobbyId} variant="outlined" /> */}
            <PlayersList players={players} />
        </>
    );
};
