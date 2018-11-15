import React, { Component } from 'react';
import Login from './components/login/Login';


class App extends Component {
  render() {
    var url='www.phonegap100.com/appapi.php?a=getPortalList&catid=20';
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
