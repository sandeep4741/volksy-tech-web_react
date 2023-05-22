import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import AppContext from '../App/AppContext';
import { StyleSheet, css } from 'aphrodite';

function Footer() {
	return (
		<AppContext.Consumer>
		  {
		   (context) => {
			return (
			  <div className={css(styles.footer)}>
				<hr className={css(styles.hrColor)} />
				<i>
				  Copyright {getFullYear()} - {getFooterCopy(true)}
				</i>
				{context.user.isLoggedIn && <a href="inoublii.github.io"> Contact us</a> }
			  </div>
			);
		  }
		}
	  </AppContext.Consumer>
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

export default Footer;
