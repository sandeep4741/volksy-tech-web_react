import React from 'react';
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Notifications from "../Notifications/Notifications";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { StyleSheetTestUtils, } from 'aphrodite';
import CourseList from '../CourseList/CourseList';
import { user, logOut} from '../App/AppContext';
import AppContext from '../App/AppContext.js';
import uiReducer, { initialState } from "../reducers/uiReducer";
import { createStore } from "redux";
import { fromJS } from "immutable";
import App, { listNotificationsInitialState, mapStateToProps } from "./App";

const store = createStore(uiReducer, initialState);

configure({adapter: new Adapter()});


configure({adapter: new Adapter()});
describe("Testing the <App /> Component", () => {

  it("mapStateToProps returns the right object from user Login", () => {
    let state = fromJS({
      isUserLoggedIn: true,
    });

    const result = mapStateToProps(state);

    expect(result)==({ isLoggedIn: true });
  });
});
