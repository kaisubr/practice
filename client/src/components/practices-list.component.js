import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Practice = props => (
  <tr>
    <td>{props.practice.username}</td>
    <td>{props.practice.description}</td>
    <td>{props.practice.duration}</td>
    <td>{props.practice.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.practice._id}>edit</Link> | <a href="#delete" onClick={() => { props.deletePractice(props.practice._id) }}>delete</a>
    </td>
  </tr>
)


export default class PracticesList extends Component {
    constructor(props) {
        super(props);
        this.deletePractice = this.deletePractice.bind(this);
        this.state = {practices: []};
    }
    
    componentDidMount() {
        // server is at port 5000 on same hostname
        var url = new URL(window.location.href).hostname;
        axios.get('https://' + url + '/practices/')
        .then(response => {
            this.setState({ practices: response.data });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deletePractice(id) {
        // server is at port 5000 on same hostname
        var url = new URL(window.location.href).hostname;
        axios.delete('https://' + url + '/practices/'+id)
            .then(res => console.log(res.data));
        this.setState({
            practices: this.state.practices.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Practices</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.practiceList() }
                    </tbody>
                </table>
            </div>

        )
    }
    
    practiceList() {
        return this.state.practices.map(currentpractice => {
            return <Practice practice={currentpractice} deletePractice={this.deletePractice} key={currentpractice._id}/>;
        })
    }

}
