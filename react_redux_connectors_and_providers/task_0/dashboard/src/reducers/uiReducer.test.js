import uiReducer from './uiReducer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { Map } from 'immutable';

describe('uiReducer', () => {
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {}
});
test('state does not change when unrelated action is passed', () => {
  const state = uiReducer(initialState, { action: 'SELECT_COURSE' });

  expect(state).toEqual(initialState);
});

test('state changes when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
  const state = uiReducer(initialState, {
  type: DISPLAY_NOTIFICATION_DRAWER
  });



  expect(state.toJS()).toEqual({
  ...initialState.toJS(),
  isNotificationDrawerVisible: true
  });
});

test('state changes when HIDE_NOTIFICATION_DRAWER is passed', () => {
  const state = uiReducer(
  initialState.set('isNotificationDrawerVisible', true),
  {
    type: HIDE_NOTIFICATION_DRAWER
  }
  );

  expect(state.toJS()).toEqual({
  ...initialState.toJS(),
  isNotificationDrawerVisible: false
  });
});

test('state changes when LOGIN_SUCCESS is passed', () => {
  const state = uiReducer(initialState, { type: LOGIN_SUCCESS });

  expect(state.toJS()).toEqual({
  ...initialState.toJS(),
  isUserLoggedIn: true
  });
});

test('state changes when LOGOUT is passed', () => {
  const state = uiReducer(initialState.set('isUserLoggedIn', true), {
  type: LOGOUT
  });

  expect(state.toJS()).toEqual({
  ...initialState.toJS(),
  isUserLoggedIn: false
  });
});
test('state changes when LOGIN_FAILURE is passed', () => {
  const state = uiReducer(initialState, { type: LOGIN_FAILURE });

  expect(state.toJS()).toEqual({
  ...initialState.toJS(),
  isUserLoggedIn: false
  });
});

});
