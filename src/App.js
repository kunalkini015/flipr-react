import React, { Component } from 'react';
import "./styles.css";
import Home from "./containers/Home";
import Main from "./containers/Main";
import {Router, Route, Switch, Redirect } from "react-router-dom";
import history from './history';
import {reactLocalStorage} from 'reactjs-localstorage';
const ProtectedRoute = ({ component: Comp, path,  ...rest }) => {
  return (
        <Route
              path={path}

              render={props => {
                    return reactLocalStorage.get('email',undefined, true) ? <Comp {...rest} /> : <Redirect to="/" />;

              }

              }
        />
  );
};

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEmail: undefined
    }
  }

  setUserEmail = (email) => {
    this.setState({userEmail: email})
  }
  render() {
    return (
      <div className="App">
      <Router history={history}>

          <ProtectedRoute path="/main" component={() => <Main userEmail={this.state.userEmail} />}/>
          <Route component={() => <Home setUserEmail={this.setUserEmail} />} />
      </Router>
    </div>
    )
  }
}


