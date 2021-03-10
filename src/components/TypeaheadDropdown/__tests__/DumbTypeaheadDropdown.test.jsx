import { render, screen } from '@testing-library/react';
import { TypeaheadDropdown } from '../ConnectedTypeaheadDropdown';

describe('TypeaheadDropdown', () => {
    it('should show the correct value in the input and clear button', () => {
        render(
            <TypeaheadDropdown
                value="I am TypeaheadDropdown"
                testId="iAmTypeaheadDropdown"
                results={[]}
            />
        );
        const typeaheadDropdown = screen.getByTestId('iAmTypeaheadDropdown');
        expect(typeaheadDropdown).toBeInTheDocument();

        const input = screen.getByTestId('iAmTypeaheadDropdown-input');
        expect(input).toHaveValue('I am TypeaheadDropdown');

        const clearButton = screen.getByTestId('iAmTypeaheadDropdown-clear');
        expect(clearButton).toBeInTheDocument();
    });
});
