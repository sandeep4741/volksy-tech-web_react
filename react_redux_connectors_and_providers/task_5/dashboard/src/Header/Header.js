import React from 'react';
import logo from '../assets/logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import AppContext from '../App/AppContext';
import { connect } from "react-redux";
import { logout } from "../actions/uiActionCreators";
import PropTypes from "prop-types";

export class Header extends React.Component {
	constructor(props) {
		super(props);
	  }
	  render() {
		const { user, logout } = this.props;
		return (
			<header className={css(style.appHeader)}>
      <img src={logo} className={css(style.appLogo)} alt='logo' />
      <h1 className={css(style.appHeaderH1)}>School dashboard</h1>
        {user && (
			<p id="logoutSection">
                Welcome <b>{user.email}</b>
                  <span onClick={logout}><i>(logout)</i></span>
              </p>
            )
          }
		  </header>
        	);
        }
	}
	const style = StyleSheet.create({
	appHeader: {
	  backgroundColor: '#fff',
	  borderBottom: '3px solid #e1354b',
	  height: '200px',
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'left',
	},
	appLogo: {
	  width: '200px',
	  height: '200px',
	},
	appHeaderH1: {
		margin: 'auto auto auto 0',

	  display: 'inline',
	  top: '-6rem',
	  color: '#e1354b',
	}
  });

  Header.contextType = AppContext;

  Header.defaultProps = {
	user: null,
	logout: () => {},
  };

  Header.propTypes = {
	user: PropTypes.object,
	logout: PropTypes.func,
  };


  const mapStateToProps = (state) => {
	return {
		user: state.ui.get("user")
		};
  };
  const mapDispatchToProps = {
	logout,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
