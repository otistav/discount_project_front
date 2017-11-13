import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getGames,
  getGameStatistic
} from '../actions/reports';
import '../styles/page.css';
import '../styles/reports.css';
import Paper from 'material-ui/Paper';

class GameReportsPage extends Component {

  componentDidMount() {
    this.props.getGames();
    this.props.getGameStatistic('a22651e4-6875-4c34-9319-4e1ef7cef60f');
  }

  render() {
    return (
      <Paper className="page">
        <div className="top-players-container">
          Top players in doodle jump
          <ol className="top-players">
            {this.props.topPlayers.sort((a, b) => {
              return b.total_value - a.total_value
            }).map(item => (
                <li>{item.username} : {item.total_value}</li>
            ))}
          </ol>
        </div>


      </Paper>
    )
  }
}

export default withRouter(connect(
  state => ({
    topPlayers: state.reports.gameTop
  }),
  dispatch => ({
    getGames: () => {
      dispatch(getGames())
    },
    getGameStatistic: (game_id) => {
      dispatch(getGameStatistic(game_id));
    }
  })
)(GameReportsPage))
