import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
    it('should render text we pass to it', () => {
        render(<Button testId="iamButton">I'm button</Button>);
        const buttonElement = screen.getByTestId('iamButton');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('I\'m button');
    });

    it('should trigger click handler when we click on it', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} testId="iamButton">I'm button</Button>);
        const buttonElement = screen.getByTestId('iamButton');
        buttonElement.click();
        expect(handleClick).toBeCalled();
    });

    it('should not trigger click handler if disabled', () => {
        const handleClick = jest.fn();
        render(<Button disabled onClick={handleClick} testId="iamButton">I'm button</Button>);
        const buttonElement = screen.getByTestId('iamButton');
        buttonElement.click();
        expect(handleClick).not.toBeCalled();
    });
});
