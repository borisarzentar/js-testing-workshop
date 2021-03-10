import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Button component', () => {
    it('should render text we pass to it', () => {
        render(<Input value="I'm input" onChange={() => {}} testId="iamInput" />);
        const inputElement = screen.getByTestId('iamInput');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('I\'m input');
    });

    it('should trigger the change handler when we type into it', () => {
        let inputValue = '';
        const handleOnChange = jest.fn((event) => inputValue = event.target.value);
        render(<Input value={inputValue} onChange={handleOnChange} testId="iamInput" />);
        const inputElement = screen.getByTestId('iamInput');
        expect(inputElement).toHaveValue('');
        fireEvent.change(
            inputElement,
            {
                target: {
                    value: 'r'
                },
            },
        );
        expect(handleOnChange).toBeCalledTimes(1);
        expect(inputValue).toBe('r');

        fireEvent.change(
            inputElement,
            {
                target: {
                    value: 'react'
                },
            },
        );

        expect(handleOnChange).toBeCalledTimes(2);
        expect(inputValue).toBe('react');
    });
});
