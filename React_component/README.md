0x04 React Components


## Learning Objectives
- When to use a Class or a function to create a component
- The lifecycle of a Class component
- How to test a component
- How to utilize a Jest spy to verify that a function is being called correctly
- What an HOC is and how to use it
- How to optimize performance and control which components to render

## Some helpful links to start with

The difference between mount, shallow and render in [one sweet post](https://stackoverflow.com/questions/38710309/when-should-you-use-render-and-shallow-in-enzyme-react-tests)

An extremely helpful primer on [Pure Components](https://medium.com/technofunnel/working-with-react-pure-components-166ded26ae48)

## When to use a Class or a function to create a component
The reason why you would want to use a Class function is to take advantage of it's Lifecycle methods. These are the methods that control what should happen when a component mounts, when it unmounts, whether or not it should re-render based on the incoming props. Lifecycle methods offer simple tooling around the important events of a component.

Functional Components, on the other hand, are just as easy to use, if not easier. Thanks to the new addition of React Hooks, they have access to the same lifecycle methods as Class functions. So it really is up to the developer to use whatever makes the most sense for their project.

## The lifecycle of a Class component
A component is =>
- Mounted
- Rendered
- re-rendered when different props flow in (Unless otherwise specified on shouldComponentUpdate)
- Unmounted

## How to test a component
Testing in react is a huge deal. Jest is the foremost testing library for React and JavaScript as a whole. In order for it to work properly, you probably have `import` statements, which means you need to *transpile* your code in order for it to be tested. Ensure that you thoroughly research Babel and Jest and set up the configuration files for both. Note that Jest uses a babel.config.js and it *ignores* a .babelrc, which if you don't know, could lead to *a lot* of npm install'ing before you figure out why Jest refuses to use it. Jest *itself* is configurable from a jest.config.js OR directly from the package.json, which is where I like to put my configurations. Last but not least, testing react components typically also requires *Enzyme* a package specifically for testing React components, with a serious caveat. You see Enzyme doesn't work for React 17, the most updated version of react, and this could create problems for you, fortunately some brave soul created an unofficial Enzyme adapter for react 17, it's called `@wojtekmaj/enzyme-adapter-react-17` and you can install it like this, `npm install --save-dev @wojtekmaj/enzyme-adapter-react-17`

Make sure Jest is seeing a setupTests function that looks like this:
```
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
```

With a line like this in your Jest config..
```
  "jest": {
    "setupFilesAfterEnv": [
      "<rootDir>/config/setupTests.js"
    ],
  }
```

And you may need to add a mock file for css and other files and configure for that..
```
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/assetMock.js",
      "\\.(css|less|scss|sass)$": "<rootDir>/assetMock.js"
    }
  }

// And my assetMock.js file in the root directory
module.exports = {};
```

Then it's as simple as
```
import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
    it('renders an <NotificationItems /> component', () => {
        const wrapper = shallow(<NotificationItem />);
        expect(wrapper).toHaveLength(1);
    });

    it('renders an <NotificationItem /> component with type and value', () => {
        const wrapper = shallow(<NotificationItem type="default" value="test" />);
        expect(wrapper.props()[ 'data-notification-type' ]).toEqual('default');
        expect(wrapper.text()).toEqual('test');
        expect(wrapper.html()).toContain('<li data-notification-type="default"');
        expect(wrapper.html()).toContain('test</li>');
    });

    it('renders an <NotificationItem /> component checking for html pass through', () => {
        const wrapper = shallow(<NotificationItem html={ { __html: '<u>test</u>' } } />);
        expect(wrapper.html()).toContain('<u>test</u>');
    });
});
```

Easy, right? I'm not crying, you're crying.

## How to utilize a Jest spy to verify that a function is being called correctly
Jest spies are able to spy on objects and *pretend* that they are the mocked object's method(s). Then when you call those methods from the object you can internally *catch* what's being called, and test that against what *should* be called. I'll show you an example, here I'm using a markAsRead function that calls console's log method on a specific line:
console.log(\`Notification ${id} has been marked as read\`);
So by using my markAsRead function, I call the console, and the spy catches what was called and I check it against what *should* be called.
```
    it('Verifies that when calling the function markAsRead on an instance of the component, the spy is being called with the right message', () => {
        const wrapper = shallow(<Notifications displayDrawer={true}
            listNotifications={listNotifications}/>);

        // spy on the console object, its log method
        const spy = jest.spyOn(console, 'log');

        // an instance of the wrapper is able to directly use its methods
        const instance = wrapper.instance();

        instance.markAsRead(1);
        expect(spy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    });
```

## What an HOC is and how to use it
An HOC is a Higher-Order-Component, and it's useful for describing containers that need Wrapping of some kind. You use them like picture frames for components, adding a wrapper to them that has some kind of effect for the component and all of it's children.

## How to optimize performance and control which components to render
React.memo and shouldComponentUpdate!