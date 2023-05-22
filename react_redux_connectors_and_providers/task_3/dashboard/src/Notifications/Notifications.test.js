import React from 'react';
import { expect as expectChai } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";

configure({adapter: new Adapter()});

describe("Testing the <Notifications /> wrapperTwo", () => {
	let i = 0;
	let listNotifications = [
		{
			id: i++,
			type: "default",
			value: "New course available",
		},		{
			id: i++,
			type: "urgent",
			value: "New resume available",
		},
		{
			id: i++,
			type: "urgent",
			html: {__html: getLatestNotification()},
		}
	];
	let props2 = {
		displayDrawer: true,
		listNotifications: listNotifications,
	};
	let props1 = {
		displayDrawer: false,
	};
	beforeAll(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	  });

	  afterAll(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	  });


	let wrapperOne;
	let wrapperTwo;

	beforeEach(() => {
		wrapperOne = shallow(<Notifications shouldRender {...props1} />);
		wrapperTwo = shallow(<Notifications {...props2} />);
	});




	it('Verify that when listNotifications is empty the message Here is the list of notifications is not displayed', () => {
		const array = [];
		const wrapper = shallow(<Notifications displayDrawer listNotifications={array} />);
		expect(wrapper.find('NotificationItem').html()).not.toEqual('<li data-notification-type="default" class="blue_1tsdo2i-o_O-blueSmall_1wblo9d">Here is the list of notifications</li>');
	  });


it("Verify that clicking on the button calls handleHideDrawer", () => {
	const mockDisplay = jest.fn(() => {});
	const mockHide = jest.fn(() => {});

	let props = {
		...props2,
		displayDrawer: true,
		handleDisplayDrawer: mockDisplay,
		handleHideDrawer: mockHide,
	};

	let wrapper = shallow(<Notifications {...props} />);

	wrapper.find('button').at(0).simulate('click');

});

});
