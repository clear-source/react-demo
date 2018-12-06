import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link,HashRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Home from './Home';
import About from './About';
import Users from './Users';

class Navigation extends Component {

    render() {
        return (
            <HashRouter>
                <Grid container >
                    <Grid item xs={2}>
                        <ul className="menu-items">
                            <li>
                                <Link to="/main/">Home</Link>
                            </li>
                            <li>
                                <Link to="/main/about">About</Link>
                            </li>
                            <li>
                                <Link to="/main/users">Users</Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs>
                        <Route path="/main/" exact component={Home} />
                        <Route path="/main/about" component={About} />
                        <Route path="/main/users" component={Users} />
                    </Grid>
                </Grid>
            </HashRouter>
        );
    }
}

  
  export default Navigation;