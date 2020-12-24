import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: ''
        };
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
        };
        console.log(newUser);
        
        // server is at port 5000 on same hostname
        var url = new URL(window.location.href).hostname; // eg "192.168.1.181"
        axios.post('http://' + url + ':5000/users/add', newUser)
            .then(res => console.log(res.data));
        
        this.setState({
            username: ''
        })
    }

}
