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

export const PlayersList: FC<PlayersListProps> = ({ players }) => {
    return (
        <Container>
            {players &&
                Object.keys(players).map((player, i) => {
                    return <StyledChip icon={<Icon>face</Icon>} key={i} label={player} />;
            })}
        </Container>
    )
};