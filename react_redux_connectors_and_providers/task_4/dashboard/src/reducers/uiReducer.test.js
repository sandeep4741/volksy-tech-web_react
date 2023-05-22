import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { uiReducer, initialUiState } from "./uiReducer";
const USER = { email: "inoublii@gmail.com", password: "123456" };

describe("uiReducer tests", function () {
  it("verifies the state returned by the uiReducer function equals the initial state ", function () {
    const state = uiReducer(undefined, {});

	expect(state.toJS()).toEqual(initialUiState);
  });
  it("verifies the state returned by the uiReducer function, when the action DISPLAY_NOTIFICATION_DRAWER ", function () {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });

    expect(state.toJS()).toEqual({
      ...initialUiState,
      isNotificationDrawerVisible: true,
    });


  });
  it("verifies the state returned by the uiReducer function equals the initial state action SELECT_COURSE ", function () {
    const state = uiReducer(undefined, { type: "SELECT_COURSE" });

    expect(state.toJS()).toEqual(initialUiState);
  });
  it("verifies the state returned by uiReducer function, when the action LOGIN is passed", function () {
    const state = uiReducer(undefined, { type: LOGIN, user: USER });

    expect(state.toJS()).toEqual({
      ...initialUiState,
      user: USER,
    });
  });
});
