import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUser} from "../actions/users";
import Paper from 'material-ui/Paper';
import {getStatistic, setCurrentStatisticValue} from "../actions/statistic";
import MetricsGraphics from 'react-metrics-graphics';
import '../styles/home-page.css';
import _ from 'lodash/collection';
import '../../node_modules/react-vis/dist/style.css';
import '../styles/diagram.css';
import Diagram from '../components/Diagram';



class HomePage extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.currentValue.id === nextProps.currentValue.id && this.props.statistic) return false;
    return true
  }
  componentDidMount() {
    if (!(localStorage.getItem('access_token') && localStorage.getItem('refresh_token')))
      this.props.history.replace('/sign-in');
    this.props.getStatistic();

  }


  render() {

    let basic_auth_statistic = _.map(this.props.statistic, (obj,iter) => {
      return {y: Number(obj.auth_count), x: obj.date}
    });

    let social_auth_statistic = _.map(this.props.statistic, (obj) => {
      return {x: obj.date, y: Number(obj.social_count)}
    });
    let refresh_token_statistic = _.map(this.props.statistic, (obj) => {
      console.log(obj.social_count);
      return {x: obj.date, y: Number(obj.token_count)}
    });



    return(
      <div className="home-page">
        <div className="basic-auth-diagram">
          <Diagram
            header="Basic Auth Diagram"
            currentValue={this.props.currentValue}
            id={1}
            statistic={basic_auth_statistic}
            setCurrentStatisticValue={this.props.setCurrentStatisticValue}
          />
        </div>

        <div className="social-auth-diagram">
          <Diagram
            header="Social Auth Statistic"
            currentValue={this.props.currentValue}
            id={2}
            statistic={social_auth_statistic}
            setCurrentStatisticValue={this.props.setCurrentStatisticValue}
          />
        </div>

        <div className="token-diagram">
          <Diagram
            header="Refresh Token Statistic"
            currentValue={this.props.currentValue}
            id={3}
            statistic={refresh_token_statistic}
            setCurrentStatisticValue={this.props.setCurrentStatisticValue}
          />
        </div>


      </div>
    )

  }
}


export default connect(
  state => ({
    statistic: state.statistic.statisticByDate,
    currentValue: state.statistic.currentStatisticValue
  }),
  dispatch => ({
    getUser: (access_token) => {
      return dispatch(getUser(access_token))
    },
    getStatistic: () => {
      return dispatch(getStatistic());
    },
    setCurrentStatisticValue: (value, id) => {
      dispatch(setCurrentStatisticValue(value, id))
    }
  })

)(HomePage);