import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Paper, Typography } from '@material-ui/core';

export const Main: FC = () => {
    return (
        <Paper className='main'>
            <Typography variant="h1" component="div">S P Y F A L L</Typography>
            <Button variant="contained" color="primary" component={Link} to="/create">Новая игра</Button>
            <Button variant="contained" color="primary" component={Link} to="/join">Присоединиться</Button>
        </Paper>
    );
};
