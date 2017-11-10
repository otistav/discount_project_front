import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getGames
} from '../actions/reports';

class GameReportsPage extends Component {

  componentDidMount() {
    this.props.getGames();
  }

  render() {
    return(

    )
  }
}

export default withRouter(connect(
  state => ({

  }),
  dispatch => ({
    getGames: () => {
      dispatch(getGames())
    }
  })
)(GameReportsPage))
