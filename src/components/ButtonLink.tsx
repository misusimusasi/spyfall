import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
    link: string;
    children: string;
    onClick?: () => void;
}

// Нужно подумать как подружить стайлед с mui компонентами и рендер пропсами, так просто это не работает
export const ButtonLink: FC<ButtonLinkProps> = ({ link, children, onClick }) => (
    <Button m={10} variant="contained" color="primary" component={Link} to={link} onClick={onClick} >
        {children}
    </Button>
);