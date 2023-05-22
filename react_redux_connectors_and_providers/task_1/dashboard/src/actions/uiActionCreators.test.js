import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import { StyleSheetTestUtils, } from 'aphrodite';
import configureStore from 'redux-mock-store';
import { login, logout,
	displayNotificationDrawer,
	hideNotificationDrawer,
	loginRequest,
	loginSuccess} from "./uiActionCreators";

configure({ adapter: new Adapter() });

StyleSheetTestUtils.suppressStyleInjection();

describe('Test actions', () => {
	it('Test Login', () => {
	  expect(login('inoubli@gmail.com', '231231')).toEqual({ type: 'LOGIN', user: {email: 'inoubli@gmail.com', password:'231231'} });
	});

	it('Test Logout', () => {
	  expect(logout()).toEqual({ type: 'LOGOUT' });
	});

	it('Test displayNotificationDrawer', () => {
	  expect(displayNotificationDrawer()).toEqual({ type: 'DISPLAY_NOTIFICATION_DRAWER' });
	});

	it('Test hideNotificationDrawer', () => {
	  expect(hideNotificationDrawer()).toEqual({ type: 'HIDE_NOTIFICATION_DRAWER' });
	});
  });
