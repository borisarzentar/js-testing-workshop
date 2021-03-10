import * as searchHooks from '../searchHooks';
import { render, screen } from '@testing-library/react';
import TypeaheadDropdown from '../HookedTypeaheadDropdown';

describe('TypeaheadDropdown', () => {
    it('should show the correct value in the input and clear button', () => {
        jest.spyOn(searchHooks, 'useSearchQuery').mockReturnValue('I am TypeaheadDropdown');
        jest.spyOn(searchHooks, 'useSearchResults').mockReturnValue(null);
        jest.spyOn(searchHooks, 'useClearSearch').mockReturnValue(null);
        jest.spyOn(searchHooks, 'useTriggerSearch').mockReturnValue(null);
        jest.spyOn(searchHooks, 'useSetSearchQuery').mockReturnValue(null);

        render(
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
    });
});
