import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Charlotte's Nutrition App</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="/">Home</a></li>
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
