import React, {Component, Fragment } from 'react';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import Footer from '../Footer/Footer.js';
import Notifications from '../Notifications/Notifications.js';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import { StyleSheet, css } from 'aphrodite';
import { user, logOut } from "./AppContext";
import AppContext from './AppContext.js';
import { connect } from "react-redux";
import {displayNotificationDrawer,hideNotificationDrawer,loginRequest,logout,

  } from "../actions/uiActionCreators";

  const listCourses = [
	{ id: 1, name: "ES6", credit: 60 },
	{ id: 2, name: "Webpack", credit: 20 },
	{ id: 3, name: "React", credit: 40 },
  ];

  export const listNotificationsInitialState = [
	{ id: 1, type: "default", value: "New course available" },
	{ id: 2, type: "urgent", value: "New resume available" },
	{ id: 3, type: "urgent", html: { __html: getLatestNotification() } },
  ];
export  class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyCombination = this.handleKeyCombination.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.state = {
      user,
      listNotifications: listNotificationsInitialState,
    };
  }



  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyCombination);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyCombination);
  }

  handleKeyCombination(e) {
    if (e.key === "h" && e.ctrlKey) {
      alert("Logging you out");
      this.props.logout();
    }
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter((notification) => {
        return notification.id !== id;
      }),
    });
  }

  render() {
    const { user, listNotifications } = this.state;


    const {
		isLoggedIn,
		displayDrawer,
		displayNotificationDrawer,
		hideNotificationDrawer,
		login,
		logout,
	  } = this.props;

    const value = { user, logOut };



    ///let  listNotifications = [
    ///  { id: 1, type: 'default', value: 'New course available' },
     /// { id: 2, type: 'urgent', value: 'New resume available' },
    ///  { id: 3, type: 'urgent', html: { __html: getLatestNotification()} }
   /// ];

	return (
		<>
        <Notifications
          listNotifications={listNotifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
          markNotificationAsRead={this.markNotificationAsRead}
        />
		  <div className="App">
			<Header /><hr className={css(styles.hrColor)} />
		  </div>
			<div className={css(styles.appBody)}>
            {!isLoggedIn ? (
				<BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={login} />
				</BodySectionWithMarginBottom>
            ) : (
				<BodySectionWithMarginBottom title="Course list">
				  <CourseList listCourses={listCourses} />
				</BodySectionWithMarginBottom>
            )}
			<BodySection title="News from the School">
				<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
			  </BodySection>
			</div>
			<div className="App-footer">
			  <Footer />
			</div>
			</>
	  );
	}
  }

  const styles = StyleSheet.create({
	appBody: {
	  margin: '30px'
	},
	hrColor: {
	  backgroundColor: '#e0344b',
	  border: 'none',
	  height: '2px'
	}
  });
  App.defaultProps = {
	isLoggedIn: false,
	displayDrawer: false,
	displayNotificationDrawer: () => {},
	hideNotificationDrawer: () => {},
	login: () => {},
  };

  App.propTypes = {
	isLoggedIn: PropTypes.bool,
	displayDrawer: PropTypes.bool,
	displayNotificationDrawer: PropTypes.func,
	hideNotificationDrawer: PropTypes.func,
	login: PropTypes.func,
  };

  export const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.ui.get("isUserLoggedIn"),
		displayDrawer: state.ui.get("isNotificationDrawerVisible"),
		};
  };

  const mapDispatchToProps = {
	displayNotificationDrawer,
	hideNotificationDrawer,
	login: loginRequest,
	logout,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(App);
