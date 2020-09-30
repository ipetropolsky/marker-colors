import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MuiContainer from '@material-ui/core/Container';

import routes from './routes';
import Menu from './components/Menu';
import Header from './components/Header';
import Footer from './components/Footer';
import ResponsiveDrawer from './components/common/ResponsiveDrawer';

function App() {
    return (
        <Router>
            <ResponsiveDrawer title={<Header />} menu={<Menu />}>
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
            </ResponsiveDrawer>
        </Router>
    );
}

export default App;
