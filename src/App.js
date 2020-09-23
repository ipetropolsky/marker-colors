import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MuiCssBaseline from '@material-ui/core/CssBaseline';
import MuiContainer from '@material-ui/core/Container';

import routes from './routes';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="app-container">
                <MuiCssBaseline />
                <Menu />
                <div className="app-content">
                    <Header />
                    <main>
                        <MuiContainer maxWidth="lg">
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} exact>
                                        {route.component}
                                    </Route>
                                ))}
                            </Switch>
                            <Footer />
                        </MuiContainer>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
