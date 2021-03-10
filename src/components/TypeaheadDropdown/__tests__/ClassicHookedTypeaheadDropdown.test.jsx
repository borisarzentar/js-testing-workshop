import * as reactRedux from 'react-redux';
import { render, screen } from '@testing-library/react';
import TypeaheadDropdown from '../ReduxHookedTypeaheadDropdown';

describe('TypeaheadDropdown', () => {
    it('should show the correct value in the input and clear button', () => {
        const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
        useSelectorSpy.mockReturnValue('I am TypeaheadDropdown')
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

        const { rerender } = render(
            <TypeaheadDropdown
                id="TypeaheadDropdown"
                testId="iAmTypeaheadDropdown"
            />
        );
        const typeaheadDropdown = screen.getByTestId('iAmTypeaheadDropdown');
        expect(typeaheadDropdown).toBeInTheDocument();

        const input = screen.getByTestId('iAmTypeaheadDropdown-input');
        expect(input).toHaveValue('I am TypeaheadDropdown');

        const clearButton = screen.getByTestId('iAmTypeaheadDropdown-clear');
        expect(clearButton).toBeInTheDocument();

        useSelectorSpy.mockReturnValue('I am new TypeaheadDropdown')

        rerender(
            <TypeaheadDropdown
                id="TypeaheadDropdown"
                testId="iAmTypeaheadDropdown"
            />
        );

        expect(input).toHaveValue('I am new TypeaheadDropdown');
    });
});
