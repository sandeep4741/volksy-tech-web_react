import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import AppContext from '../App/AppContext';
import { StyleSheet, css } from 'aphrodite';
import { connect } from "react-redux";
import PropTypes from "prop-types";

export function Footer({ user }) {
	return (
			  <div className={css(styles.footer)}>
				<hr className={css(styles.hrColor)} />
				<i>
				  Copyright {getFullYear()} - {getFooterCopy(true)}
				</i>
				{user && <a href="#">Contact us</a>}
			  </div>

	);
  }

  const styles = StyleSheet.create({
	hrColor: {
	  backgroundColor: '#e0344b',
	  border: 'none',
	  height: 2
	},

	footer: {
	  textAlign: 'center',
	}

  });

  Footer.defaultProps = {
	user: null,
  };

  Footer.propTypes = {
	user: PropTypes.object,
  };

  const mapStateToProps = (state) => {
	return {
	  user: state.get("user"),
	};
  };

  export default connect(mapStateToProps, null)(Footer);
