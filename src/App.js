import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import { history } from './history';
import { Create, Lobby, Join, Game, Main } from './pages';

let theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    status: {
        danger: 'orange',
    },
});

theme = responsiveFontSizes(theme);

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <Router history={history}>
                    <Route path={'/'} exact component={Main} />
                    <Route path={'/create'} exact component={Create} />
                    <Route path={'/join'} exact component={Join} />
                    <Route path={'/lobby/:lobbyId'} component={Lobby} />
                    <Route path={'/game/:lobbyId'} component={Game} />
                    {/* <Route path={'/result'} exact component={Result} /> */}
                </Router>
            </CssBaseline>
        </MuiThemeProvider>
    );
};

export default App;
