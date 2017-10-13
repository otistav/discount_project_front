import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUser} from "../actions/users";
import Paper from 'material-ui/Paper';
import {getStatistic, setCurrentStatisticValue} from "../actions/statistic";
import MetricsGraphics from 'react-metrics-graphics';
import '../styles/page.css';
import _ from 'lodash/collection';
import '../../node_modules/react-vis/dist/style.css';
import '../styles/diagram.css';
import Diagram from '../components/Diagram';
import SideBar from '../containers/SideBar';



class HomePage extends Component {
  shouldComponentUpdate(nextProps) {
    if (!this.props.statistic) return true;
    return (this.props.currentValue.value !== nextProps.currentValue.value)
  }

  componentDidMount() {
    this.props.getStatistic();
    if (!(localStorage.getItem('access_token') && localStorage.getItem('refresh_token')))
      this.props.history.replace('/sign-in');
  }


  render() {

    let basic_auth_statistic = _.map(this.props.statistic, (obj) => {
      return {y: Number(obj.auth_count), x: obj.date}
    });

    let social_auth_statistic = _.map(this.props.statistic, (obj) => {
      return {x: obj.date, y: Number(obj.social_count)}
    });
    let refresh_token_statistic = _.map(this.props.statistic, (obj) => {
      return {x: obj.date, y: Number(obj.token_count)}
    });

    return(
        <div>
          <Paper className="page">
            <div className="statistic">
              <div className="statistic-header">
                SomeStatistic
              </div>
              <div className="diagrams">

                <Diagram
                  header="Basic Auth Diagram"
                  currentValue={this.props.currentValue}
                  id={1}
                  statistic={basic_auth_statistic}
                  setCurrentStatisticValue={this.props.setCurrentStatisticValue}
                />
                <Diagram
                  header="Social Auth Statistic"
                  currentValue={this.props.currentValue}
                  id={2}
                  statistic={social_auth_statistic}
                  setCurrentStatisticValue={this.props.setCurrentStatisticValue}
                />
                <Diagram
                  header="Refresh Token Statistic"
                  currentValue={this.props.currentValue}
                  id={3}
                  statistic={refresh_token_statistic}
                  setCurrentStatisticValue={this.props.setCurrentStatisticValue}
                />
              </div>
            </div>

          </Paper>
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