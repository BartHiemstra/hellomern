import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateActivity extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: '',
      duration: 0,
      date: new Date(),
    }
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const activity = {
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(activity);

    axios.post('https://api.barthiemstra.nl:5000/activities/add', activity)
      .then(res => console.log(res.data));

    //window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Nieuwe activiteit toevoegen</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Omschrijving: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Tijd in minuten: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Datum: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Activiteit toevoegen" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}