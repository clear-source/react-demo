import React, { Component } from 'react';

import Navigation from '../../pages/Navigation';
import Header from '../header/Header';
class Main extends Component {
    render() {
        return (
            <div className="box">
                <Header/>
                <Navigation/>
            </div>
        );
    }
}

export default Main;