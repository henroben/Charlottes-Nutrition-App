import React, { Component } from 'react';
import { connect } from 'react-redux';
var {Navbar, Nav, NavItem} = require('react-bootstrap');
var {LinkContainer, IndexLinkContainer} = require('react-router-bootstrap');

class App extends Component {
    onSignOut() {
        
    }
    displayLoginDetails() {
        if(this.props.auth.uid) {
            return (
                <Nav pullRight>
                    {/*<LinkContainer to="/signout" activeClassName="active"><NavItem><span className="glyphicon glyphicon-user"></span> Sign Out</NavItem></LinkContainer>*/}
                    <button onClick={this.onSignOut.bind(this)}><span className="glyphicon glyphicon-user"></span> Sign Out</button>
                </Nav>
            );
        } else {
            return (
                <Nav pullRight>
                    <LinkContainer to="/signup" activeClassName="active"><NavItem><span className="glyphicon glyphicon-user"></span> Sign Up</NavItem></LinkContainer>
                    <LinkContainer to="/signin" activeClassName="active"><NavItem><span className="glyphicon glyphicon-log-in"></span> Login</NavItem></LinkContainer>
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

export default connect(mapStateToProps, null)(App);