import styled from 'styled-components';
import { Button } from '@material-ui/core';
import React, { FC } from 'react';

export const Wrapper = styled.span`
    margin: 10px
`;

interface WrappedButtonProps {
    onClick?: () => void
};

export const WrappedButton: FC<WrappedButtonProps> = ({children, onClick}) => {
    return (
        <Wrapper>
            <Button onClick={onClick} variant='contained' color='primary' type={'submit'}>
                {children}
            </Button>
        </Wrapper>
    )
};