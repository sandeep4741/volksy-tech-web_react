import React from 'react';
import { expect } from "chai";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import App from './App';
import Notifications from "../Notifications/Notifications";
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { StyleSheetTestUtils, } from 'aphrodite';
import CourseList from '../CourseList/CourseList';
import { user, logOut} from '../App/AppContext';
import AppContext from '../App/AppContext.js';

configure({adapter: new Adapter()});


configure({adapter: new Adapter()});
describe("Testing the <App /> Component", () => {
	let events = {};


	beforeEach(() => {
		events = {};
		document.addEventListener = jest.fn((event, callback) => {
			events[event] = callback;
		  });

		StyleSheetTestUtils.suppressStyleInjection();
	});

	afterEach(() => {

		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
		jest.useFakeTimers();
		jest.runAllTimers();

	});

	it('check that renders without crashing', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.exists());
	  });

	it('verify  <App /> contains the <Notifications /> Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).to.have.lengthOf(1);
  });

  it("verify <App /> contains the <Header /> Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Header />)).to.equal(true);
  });


  it("verify <App /> contains the <Footer /> Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Footer />)).to.equal(true);
  });

  it("verify <App /> doesn't render <CourseList /> component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<CourseList />)).to.equal(false);
  });
});
describe(" verify <App /> Is isLoggedIn", () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.useFakeTimers();
    jest.runAllTimers();
  });

  it("verify isLoggedIn is true ", () => {
    const props = {
      isLoggedIn: true,
    };


    const wrapper = shallow(<App {...props} />);

    expect(wrapper.contains(<Login />)).to.equal(false);
    expect(wrapper.find(CourseList)).to.have.lengthOf(0);
});


  it('Verify that after calling handleDisplayDrawer, the state should now be true', () =>{
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state().displayDrawer).to.equal(true);
  });

  it('Verify that after calling handleHideDrawer, the state is updated to be false', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state().displayDrawer).to.equal(true);
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state().displayDrawer).to.equal(false);
});
it('Check if logOut is being called by verify if the state is updated correctly instead', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut}}>
        <App />
      </AppContext.Provider>
    );
    wrapper.instance().logOut();
    expect(wrapper.state().user).to.equal(user);
  });

  it('Verify that the logIn function updates the state correctly', () => {
    const user1 = {
      email: 'hafed.inoubli@gmail.com',
      password: '1235',
      isLoggedIn: true
    };
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut}}>
        <App />
      </AppContext.Provider>
    );

  });

  it('Verify that the logIn function updates the state correctly', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut}}>
        <App />
      </AppContext.Provider>
    );
    wrapper.instance().logIn('hafed.inoubli@gmail.com', '1235');
    wrapper.instance().logOut();
    expect(wrapper.state().user).equal(user);
  });


  it('Verify that markNotificationAsRead works ', () => {
    const newListNotifications = [
      { id: 1, type: "default", value: "New course available", },
      { id: 2, type: "urgent", value: "New resume available", },
    ];
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut}}>
        <App />
      </AppContext.Provider>
    );
    wrapper.instance().markNotificationAsRead(3);
    expect(wrapper.state().listNotifications) == (newListNotifications);
  });
  test("verify logOut alerts ", () => {
    const myLogOut = jest.fn(() => undefined);
    const myAlert = jest.spyOn(global, "alert");

    const wrapper = shallow(<App logOut={myLogOut} />);

    expect(myAlert);
    expect(myLogOut);
    jest.restoreAllMocks();
  });
});
