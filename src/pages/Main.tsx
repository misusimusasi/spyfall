import React, { FC, useState, useEffect } from 'react';
import { Title } from '../components';
import { ActionsWrapper, StyledLink } from '../styled';
import * as firebase from 'firebase/app';

const playerId = localStorage.getItem('playerId');
const lobbyId = localStorage.getItem('lobbyId');

export const Main: FC = () => {
    const [ isAbleToRejoin, setIsAbleToRejoin ] = useState<boolean>(false);

    useEffect(() => {
        if (playerId && lobbyId) {
            firebase.database().ref('rooms/' + lobbyId).once('value').then(snap => {
                snap.val() && (snap.val().process === 'game' || snap.val().process === 'prepare') && setIsAbleToRejoin(true)
            })
        }
    }, []);
    
    return (
        <>
            <Title />
            <ActionsWrapper>
                <StyledLink to="/create">New game</StyledLink>
                <StyledLink to="/join">Join game</StyledLink>
                {/* {isAbleToRejoin && <ButtonLink link={`/lobby/${lobbyId}`}>Your last game still in progress. Rejoin</ButtonLink>} */}
            </ActionsWrapper>
        </>
    )
};
