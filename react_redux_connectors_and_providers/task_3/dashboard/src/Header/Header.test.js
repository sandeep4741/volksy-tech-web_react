/**
 * @jest-environment jsdom
*/
import { shallow, mount } from "enzyme";
import React from "react";
import { Header } from "./Header";
import { StyleSheetTestUtils } from "aphrodite";
import AppContext, { user, logOut } from "../App/AppContext";

const USER = { email: "inoublii@gmail.com", password: "123456" };

describe("<Header />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("Header renders without crashing", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("mounts the Header component with a user defined (isLoggedIn is true and an email is set). The logoutSection is created", () => {
    const wrapper = shallow(<Header user={USER} />);

    expect(wrapper.find("#logoutSection")).toHaveLength(1);
  });
  it("mounts the Header component with a default context value. The logoutSection is not created", () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find("#logoutSection")).toHaveLength(0);
  });


});
