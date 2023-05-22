import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import footer from './footer';
import { StyleSheetTestUtils } from "aphrodite";
import { shallowEqual } from "react-redux";


configure({adapter: new Adapter()});
describe("Testing the <footer /> Component", () => {
	beforeAll(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	  });

	  afterAll(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	  });

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<footer shouldRender />);
	});
	it("footer renders without crashing", () => {
		const wrapper = shallow(<footer />);
		expect(wrapper.exists()) == (true);
	  });
	  it("Verify that the components render the text “Copyright”", () => {
		const wrapper = shallow(<footer />);
	  });
	  it("verify that the link is displayed when the user is logged in ", () => {
		const wrapper = shallow(
		  <footer user={{ email: "inoublii@gmail.com", password: "123456" }} />
		);
	  });



});
