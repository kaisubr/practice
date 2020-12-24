import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

export default class CreatePractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        // server is at port 5000 on same hostname
        var url = new URL(window.location.href).hostname; // eg "192.168.1.181"
        axios.get('http://' + url + '/users/') // url:5000/
            .then(response => {
                if (response.data.length > 0) {
                this.setState({ 
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        
//         this.setState({ 
//             users: ['testuser'],
//             username: 'testuser'
//         });
    }

    render() {
        return (
            <div>
                <h3>Create New Practice Entry</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                        this.state.users.map(function(user) {
                            return <option 
                            key={user}
                            value={user}>{user}
                            </option>;
                        })
                        }
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                    />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Practice Log" className="btn btn-primary" />
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
    
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const practice = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        };
        console.log(practice);
        
        // server is at port 5000 on same hostname
        var url = new URL(window.location.href).hostname; // eg "192.168.1.181"
        axios.post('http://' + url + '/practices/add', practice)
            .then(res => {
                console.log(res.data)
                window.location = '/';
            });
    }

}
