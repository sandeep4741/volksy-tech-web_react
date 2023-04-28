import React, { Component, Fragment } from 'react';
import { StyleSheet, css } from "aphrodite";
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';


export default class Notifications extends Component {
	constructor(props) {
		super(props);
		this.markAsRead = this.markAsRead.bind(this);
	}
	shouldComponentUpdate(nextProps) {
		return (
			nextProps.listNotifications.length > this.props.listNotifications.length ||
			nextProps.displayDrawer !== this.props.displayDrawer
		  );
		}



	markAsRead(id) {
		console.log(`Notification ${id} has been marked as read`);
	};
	render() {
		let {
			displayDrawer,
			listNotifications,
			handleDisplayDrawer,
			handleHideDrawer
		} = this.props;

		return (
			<>
			  <div id="menuItem" className={css(styles.menuItem, styles.menuItemSmall)} onClick={handleDisplayDrawer}>
				{
				  !displayDrawer && 'Your notifications'
				}
			  </div>
			  { displayDrawer &&
				<div className={css(styles.notifications, styles.notificationSmall)}>
				  <button
					id="closeButton"
					style={{float: 'right', background: 'transparent', border: 'white'}}
					aria-label="Close"
					onClick={handleHideDrawer}
					>
					<img src={closeIcon} alt="close-icon" style={{width: '15px', marginRight: '10px' }} />
				  </button>
				  <p>Here is the list of notifications</p>
				  <ul className={css(styles.ulStyle)}>
					{
					  listNotifications.length === 0 &&
					  (<NotificationItem
						  type="default"
						  value="No new notification for now"
						  markAsRead={this.markAsRead}
					  />)
					}
					{
					  listNotifications.map((notification) => (
						<NotificationItem
						  key={notification.id}
						  type={notification.type}
						  value={notification.value}
						  html={notification.html}
						  markAsRead={this.markAsRead}
						  id={notification.id}
						/>
					  ))
					}
				  </ul>
				</div>
			  }
			</>
		  );
		}
	  }

	  const translateKeyframes = {
		'0%': {
		  transform: 'translateY(0)',
		},
		'50%': {
		  transform: 'translateY(0px)',
		},
		'75%': {
		  transform: 'translateY(5px)',
		},
		'100%': {
		  transform: 'translateY(5px)',
		},
	  };

	  const opacityKeyframes = {
		'from': {
		  opacity: 0.5,
		},

		'to': {
		  opacity: 1,
		}
	  };

	  const styles = StyleSheet.create({
		notifications: {
			float: 'right',
			borderWidth: '1px',
			borderStyle: 'dashed',
			borderColor: '#e0344b',
			padding: '3px'
		},
		menuItem: {
		  textAlign: 'right',
		  marginRight: '10px',
		  backgroundColor: '#fff8f8',
		  ":hover": {
			cursor: 'pointer',
			animationName: [opacityKeyframes, translateKeyframes],
			animationDuration: "1s, 0.5s",
			animationIterationCount: 3
		  }
		},
		notificationSmall: {
		  '@media (max-width: 900px)': {
			position: 'absolute',
			backgroundColor: 'white',
			height: '200vh',
			width: '100vw',
			border: 'none',
			fontSize: '20px',
		  }
		},
		ulStyle: {
		  '@media (max-width: 900px)': {
			padding: '0px',
			listStyle: 'none'
		  }
		},
		menuItemSmall: {
		  '@media (max-width: 900px)': {
			fontSize: '20px'
		  }
		}
	  });



Notifications.protoTypes = {
	displayDrawer: PropTypes.bool,
	listNotifications: PropTypes.arrayOf(NotificationItemShape),
	handleHideDrawer: PropTypes.func,
	handleDisplayDrawer: PropTypes.func,

};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
	handleDisplayDrawer: () => {},
	handleHideDrawer: () => {}


};

