import {configure} from 'enzyme';
import  Adapter from 'enzyme-adapter-react-16';

const mockConsoleMethod = (realConsoleMethod) => {
    const ignoredMessages = [
      'inside a test was not wrapped in act(...)',
    ]
    return (message, ...args) => {
      const containsIgnoredMessage = ignoredMessages.some(ignoredMessage => message.includes(ignoredMessage));
  
      if (!containsIgnoredMessage) {
        realConsoleMethod(message, ...args);
      }
    }
};
  
console.error = jest.fn(mockConsoleMethod(console.error));

configure({adapter: new Adapter()});