import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import CardboxListPage from '../pages/CardboxListPage/CardboxListPage';
import CardboxQuizPage from '../pages/CardboxQuizPage/CardboxQuizPage';
import EditCardboxPage from '../pages/EditCardboxPage/EditCardboxPage';
import CreateCardboxPage from '../pages/CreateCardboxPage/CreateCardboxPage';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app">
                <Routes></Routes>
            </div>
        </Router>
    );
}

export default App;

const _Routes: React.FC = () => {
    return (
        <div className="app__container">
            <Navbar></Navbar>
            <div className="app__content">
                <Switch>
                    <Route path="/learn/:cardbox" component={CardboxQuizPage}></Route>
                    <Route path="/edit/:cardbox" component={EditCardboxPage}></Route>
                    <Route path="/create" component={CreateCardboxPage}></Route>
                    <Route path="*" component={CardboxListPage}></Route>
                </Switch>
            </div>
        </div>
    );
}

const Routes = withRouter(_Routes);
