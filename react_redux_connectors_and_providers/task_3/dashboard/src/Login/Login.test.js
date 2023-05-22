import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Login from './Login';
import { StyleSheetTestUtils } from "aphrodite";

configure({adapter: new Adapter()});
describe("Testing the <Login /> Component", () => {
	beforeAll(() => {
		StyleSheetTestUtils.suppressStyleInjection();
	  });

	  afterAll(() => {
		StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
	  });

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Login shouldRender />);
	});




	it("<Login /> is rendered without crashing", () => {
		expect(wrapper.render()).to.not.be.an('undefined');
	});

	it("<Login /> render 2 labels", () => {
		expect(wrapper.find('label')).to.have.lengthOf(2);
	});
	it('Test to verify that the submit button is disabled by default', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find('input').at(2).props().disabled)==(true);
	  });

	  it('Test to verify that after changing the value of the two inputs, the button is enabled', () => {
		const wrapper = shallow(<Login />);
		wrapper.find('input').at(0).simulate('change', { target: { name: 'email', value: 'inoublii@hotmail.com'} });
		wrapper.find('input').at(1).simulate('change', { target: { name: 'password', value: '1234'} });
		expect(wrapper.find('input').at(2).props().disabled)==(false);
	  });
});
