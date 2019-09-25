import React, { FC } from 'react';
import { Container, Chip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

interface PlayersListProps {
    players: Record<string, any>;
}

const StyledChip = styled(Chip)`
    margin: 15px
`

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const PlayersList: FC<PlayersListProps> = ({ players }) => {
    return (
        <StyledContainer>
            {players &&
                Object.keys(players).map((player, i) => {
                    return <StyledChip icon={<Icon>face</Icon>} key={i} label={player} />;
            })}
        </StyledContainer>
    )
};