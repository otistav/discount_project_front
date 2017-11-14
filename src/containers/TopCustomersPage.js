import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getGames,
  getGameStatistic,
  getTopCustomers
} from '../actions/reports';
import '../styles/page.css';
import '../styles/reports.css';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';

class TopCustomersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min_date: new Date("1990"),
      max_date: new Date()
    }
  }
  componentDidMount() {
    this.props.getGames();
    this.props.getGameStatistic('a22651e4-6875-4c34-9319-4e1ef7cef60f');
    this.props.getTopCustomers();
  }

  render() {
    return (
      <Paper className="page">
        <div className="top-players-container">
          <DatePicker
            container="inline"
            hintText="minimum date"
            onChange={
              (e, date) => {
                this.setState({min_date: date}, () => {
                  this.props.getTopCustomers(this.state.min_date, this.state.max_date)
                })
                console.log('this is event\n', e, '\nthis is date', date)
              }
            }
          />
          <DatePicker
            container="inline"
            hintText="maximum date"
            formatDate={(date) => {
              console.log('heeey date', date.getDay());

            }}
            onChange={
              (e, date) => {
                this.setState({max_date: date}, () => {
                  this.props.getTopCustomers(this.state.min_date, this.state.max_date)
                })
                console.log('this is event\n', e, '\nthis is typeof date', typeof date)
              }
            }
          />
          <ol>
            {this.props.customersTop.map(item => (
              <li>{item.username} : {item.count_deal}</li>
            ))}
          </ol>

        </div>


      </Paper>
    )
  }
}

export default withRouter(connect(
  state => ({
    customersTop: state.reports.customersTop
  }),
  dispatch => ({
    getTopCustomers: (min_date, max_date) => {
      dispatch(getTopCustomers(min_date, max_date))
    },
    getGames: () => {
      dispatch(getGames())
    },
    getGameStatistic: (game_id) => {
      dispatch(getGameStatistic(game_id));
    }
  })
)(TopCustomersPage))
