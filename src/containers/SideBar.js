import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/side-bar.css';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import MenuItem from 'material-ui/MenuItem';
import Icon from 'react-fontawesome'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }


  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    console.log(localStorage.getItem('access_token'), 'this is access token');
    console.log(this.props.location);

    return(
      <div>
        {localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
          ?
          <Paper className="side-bar" style={{backgroundColor: 'RGB(54, 150, 167)'}} >
            <Menu disableAutoFocus={true}>
              <MenuItem
                className="menu-item"
                primaryText="Dashboard"
                style={{ backgroundColor: this.props.location.pathname === '/' ? 'rgb(94, 194, 214)' : 'transparent'}}
                containerElement={<Link to={'/'} />}
                leftIcon={<Icon name="bar-chart"/>}
              />
              <Divider/>
              <MenuItem
                className="menu-item"
                primaryText="Offers"
                containerElement={<Link to={'/offers'}/>}
                leftIcon={<Icon name="handshake-o"/>}
                style={{ backgroundColor: this.props.location.pathname === '/offers' ? 'rgb(94, 194, 214)' : 'transparent'}}
              />
              <MenuItem
                className="menu-item"
                primaryText="Users"
                containerElement={<Link to={'/users/1'}/>}
                leftIcon={<Icon name="user-o"/>}
                style={{ backgroundColor: this.props.location.pathname.indexOf('/users') > -1 ? 'rgb(94, 194, 214)' : 'transparent'}}
              />
            <List>
              <ListItem
                className="menu-item"
                primaryText="Reports"
                leftIcon={<Icon name="book" />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    className="menu-item"
                    key={1}
                    containerElement={<Link to={'/reports/customers'} />}
                    primaryText="Top customers"
                    leftIcon={<Icon name="users" />}
                  />,
                  <ListItem
                    className="menu-item"
                    key={2}
                    containerElement={<Link to={'/reports/games'} />}
                    primaryText="Top Gamers"
                    leftIcon={<Icon name="gamepad"/>}
                  />
                ]}
              />
            </List>
            </Menu>
          </Paper>
          :
          null
        }

      </div>
    )
  }
}


export default withRouter(connect(
  state => ({

  }),
  dispatch => ({

  })
)(SideBar))
