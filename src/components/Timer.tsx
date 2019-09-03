import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

interface TimerProps {
    time: string;
}

const Wrapper = styled.div`
    margin-bottom: 10px
`;

export const Timer: FC<TimerProps> = ({ time }) => {
    return (
        <Wrapper>
            <Typography variant="h3" component="div">{time}</Typography>
        </Wrapper>
    )
};