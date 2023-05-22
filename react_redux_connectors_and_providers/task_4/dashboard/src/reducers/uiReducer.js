import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER} from '../actions/uiActionTypes';
import { Map } from "immutable";
import { logout } from "../actions/uiActionCreators";

export const initialUiState = {
		isNotificationDrawerVisible: false,
	isUserLoggedIn: false,
	user: null,
  };
  export function uiReducer(state = Map(initialUiState), action){
	  	switch (action.type) {
	  case DISPLAY_NOTIFICATION_DRAWER:
		return state.set("isNotificationDrawerVisible", true);

	  case HIDE_NOTIFICATION_DRAWER:
		return state.set("isNotificationDrawerVisible", false);

	  case LOGIN_SUCCESS:
		return state.set("isUserLoggedIn", true);

	  case LOGIN_FAILURE:
		return state.set("isUserLoggedIn", false);

	  case LOGIN:
		return state.set("user", action.user);

	  case LOGOUT:
		return state.set("isUserLoggedIn", false).set("user", null);

	  default:
		break;
	}
	return state;
  };

  export default uiReducer;
