import { Map, fromJS } from "immutable";

import { filterTypeSelected, getNotifications, getUnreadNotifications,} from "./notificationSelector";

import notificationReducer, { initialNotificationState,} from "../reducers/notificationReducer";

import notificationsNormalizer from "../schema/notifications";

describe("Selectors tests", function () {
  it("test that filterTypeSelected works as expected", function () {
  });
  it("test that getUnreadNotifications return a message within the reducer", function () {
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
          isRead: true,
          type: "urgent",
          value: "New data available",
        },
      ],
    };

    const expectedResult = [
      {
        id: 3,
        isRead: true,
        type: "urgent",
        value: "New data available",
      },
    ];

  });
  it("test that getNotifications returns a message within the reducer", function () {
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
  });

});
