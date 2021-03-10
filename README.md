# JS Testing Workshop

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start:server`

Runs the fake node server to use in development.\
Server is listening on http://localhost:4000 by default.

### `npm run start:web`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Running single test is possible by running `npm test [testfilename].test.js`

## Tools used

### [Jest](https://jestjs.io/)
Jest test format:
```js
describe('Button component', () => {
    it('should trigger onClick callback when clicked on it', () => {
        ...
    });
});
```
Jest mock functions:
```js
const handleClickMock = jest.fn();
...
expect(handleClickMock).toBeCalled();
```
Jest spies:
```js
import * as reactRedux from 'react-redux';

const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
useSelectorSpy.mockReturnValue('I am value from the selector');

const mockDispatch = jest.fn();
const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
useDispatchSpy.mockReturnValue(mockDispatch);
expect(mockDispatch).toBeCalledWith(...);
```

### [Testing Library](https://testing-library.com/)
Component test example:
```js
import { render, screen } from '@testing-library/react';

const handleClickMock = jest.fn();

render(<Button onClick={handleClickMock} testId="iamButton">I'm button</Button>);

const buttonElement = screen.getByTestId('iamButton');
buttonElement.click();
expect(handleClickMock).toBeCalled();
```
Hook test example:
```js
const { result } = renderHook(() => useSignUpFlow());
expect(result.current.email).toBe('');

act(() => {
    result.current.setEmail('email@example.com');
});

expect(result.current.email).toBe('email@example.com');
```
