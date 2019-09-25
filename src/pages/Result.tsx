import React, { useState, useEffect, FC } from 'react';
import * as firebase from 'firebase/app';
import { History } from 'history';
import { CircularProgress } from '@material-ui/core';
import { StyledLink } from '../styled';

interface ResultProps {
    history: History;
    match: any;
}

export const Result: FC<ResultProps> = ({ history, match }) => {
    const [ spy, setSpy ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        firebase.database().ref('rooms/' + match.params.lobbyId + '/players').once('value').then(snap => {
            if (snap.val()) {
                setSpy(Object.entries(snap.val()).filter((player) => player[1] === 'SPY')[0][0]);
                setLoading(false);
            } else {
                history.push('/');
            }
        })
    }, []);

    const handleFinish = () => {
        firebase.database().ref('rooms/' + match.params.lobbyId).remove()
        localStorage.removeItem('playerId');
        localStorage.removeItem('lobbyId');
    };

    return (
        loading ? (
            <CircularProgress />
            ) : (
                <>
                    <div>Spy is ' + {spy}</div>
                    <StyledLink onClick={handleFinish} to="/">Finish the game</StyledLink>
                </>
            )
    );
};
