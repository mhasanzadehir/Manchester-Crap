import React, {Component} from 'react';
import {Route , Link} from 'react-router-dom'
import RegisterPage from './Register'
import MainPage from './MainPage'

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <Link to="/RegisterPage">RegisterPage</Link>
                    <br/>
                    <Link to="/MainPage">MainPage</Link>
                </header>
                <main>
                    <Route exact path="/RegisterPage" component={RegisterPage}/>
                    <Route exact path="/MainPage" component={MainPage}/>
                </main>
            </div>
        );
    }
}

export default App;
