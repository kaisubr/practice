import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark bg-info rounded-lg navbar-expand-lg">
            <Link to="/" className="navbar-brand">[PracticeTracker]</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Recent Sessions</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Practice Entry</Link>
                    </li>
                </ul>
                
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">New User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
  }
}
