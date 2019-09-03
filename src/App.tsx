import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import './App.css';
import { Create, Lobby, Join, Game, Main, Result } from './pages';
import { Background } from './styled';

const theme = responsiveFontSizes(
        createMuiTheme({
            palette: {
                type: 'dark',
            },
        })
    );

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <Background>
                    <Router>
                        <Route path={'/'} exact component={Main} />
                        <Route path={'/create'} exact component={Create} />
                        <Route path={'/join'} exact component={Join} />
                        <Route path={'/lobby/:lobbyId'} component={Lobby} />
                        <Route path={'/game/:lobbyId'} component={Game} />
                        <Route path={'/result/:lobbyId'} component={Result} />
                    </Router>
                </Background>
            </CssBaseline>
        </MuiThemeProvider>
    );
};

export default App;
