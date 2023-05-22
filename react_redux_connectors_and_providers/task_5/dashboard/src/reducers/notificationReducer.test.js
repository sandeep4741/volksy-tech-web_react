import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import notificationReducer, {initialNotificationState,  } from "./notificationReducer";
  import { configure } from 'enzyme';
import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters, FETCH_NOTIFICATIONS_SUCCESS } from '../actions/notificationActionTypes.js';
import { markAsAread, setNotificationFilter,  fetchNotificationsSuccess} from '../actions/notificationActionCreators.js';
import  notificationsNormalizer from '../schema/notifications';
import { Map, fromJS } from "immutable";


configure({ adapter: new Adapter() });


describe("courseReducer tests", function () {
	it("Tests that the default state returns an initial state", function () {
	  const state = notificationReducer(undefined, {});

	  expect(state)==(Map(initialNotificationState));
	});
	it("Tests that SET_TYPE_FILTER returns data with right item ", function () {
		const initialState = {
		  filter: "DEFAULT",
		  notifications: [
			{
			  id: 1,
			  isRead: false,
			  type: "default",
			  value: "New course available",
			},
			{
			  id: 2,
			  isRead: false,
			  type: "urgent",
			  value: "New resume available",
			},
			{
			  id: 3,
			  isRead: false,
			  type: "urgent",
			  value: "New data available",
			},
		  ],
		};

		initialState.notifications = notificationsNormalizer(
		  initialState.notifications
		).notifications;

		const action = {
		  type: SET_TYPE_FILTER,
		  filter: "URGENT",
		};

		const data = [
		  {
			id: 1,
			isRead: false,
			type: "default",
			value: "New course available",
		  },
		  {
			id: 2,
			type: "urgent",
			isRead: false,
			value: "New resume available",
		  },
		  {
			id: 3,
			type: "urgent",
			isRead: false,
			value: "New data available",
		  },
		];

		const normalizedData = notificationsNormalizer(data);

		const expectedData = {
		  filter: "URGENT",
		  ...normalizedData,
		};

		const state = notificationReducer(fromJS(initialState), action);

		expect(state.toJS())==(expectedData);
	  });



  });
