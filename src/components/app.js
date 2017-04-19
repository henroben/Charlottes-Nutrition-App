import React, { Component } from 'react';
import * as Redux from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import { startLogout } from './../actions/index';
import firebase from 'firebase';

class App extends Component {
    componentWillUpdate() {
        console.log('check firebase auth', firebase.auth().currentUser);
    }
    onSignOut() {
        let {dispatch} = this.props;
        dispatch(startLogout());
        this.props.history.push('/');
    }
    displayLoginDetails() {
        if(firebase.auth().currentUser) {
            return (
                <Nav pullRight>
                    <li>
                        <Navbar.Text>
                            <img src={firebase.auth().currentUser.photoURL} alt={firebase.auth().currentUser.displayName} className="photoID" /> {firebase.auth().currentUser.displayName}
                        </Navbar.Text>
                    </li>
                    <li>
                        <a href="#" onClick={this.onSignOut.bind(this)}><span className="glyphicon glyphicon-user"></span> Sign Out</a>
                    </li>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <LinkContainer to="/signup" activeClassName="active"><NavItem><span className="glyphicon glyphicon-user"></span> Sign Up</NavItem></LinkContainer>
                    <LinkContainer to="/signin" activeClassName="active"><NavItem><span className="glyphicon glyphicon-log-in"></span> Sign In</NavItem></LinkContainer>
                </Nav>
            );
        }
    }
    render() {
    console.log(this.props.auth.uid);
      return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop fluid={true}>
          <Navbar.Header>
            <Navbar.Toggle />
            <Navbar.Brand>
              Charlotte's Nutrition App
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="/" activeClassName="active"><NavItem>Home</NavItem></IndexLinkContainer>
              <LinkContainer to="/foodsearch" activeClassName="active"><NavItem>Food Search</NavItem></LinkContainer>
            </Nav>
              {this.displayLoginDetails()}
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          {this.props.children}
        </div>

        <Navbar fixedBottom inverse fluid={true}>
          <Navbar.Collapse>
            <Nav></Nav>
            <Navbar.Text pullRight>
              Created by <a href="https://github.com/henroben">Benjamin Mercer</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}

export default Redux.connect(mapStateToProps)(App);