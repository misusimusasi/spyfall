import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledText = styled(Typography)`
    position: absolute
    top: 30%
`;

export const Title: FC = () => <StyledText variant="h1" component="div">S P Y F A L L</StyledText>