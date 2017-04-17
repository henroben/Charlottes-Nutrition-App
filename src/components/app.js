import React, { Component } from 'react';
var {Navbar, Nav, NavItem} = require('react-bootstrap');
var {LinkContainer, IndexLinkContainer} = require('react-router-bootstrap');

export default class App extends Component {
  render() {
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
            <Nav pullRight>
              <LinkContainer to="/signup" activeClassName="active"><NavItem><span className="glyphicon glyphicon-user"></span> Sign Up</NavItem></LinkContainer>
              <LinkContainer to="/login" activeClassName="active"><NavItem><span className="glyphicon glyphicon-log-in"></span> Login</NavItem></LinkContainer>
            </Nav>
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
