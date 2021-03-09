import { useCallback, useEffect, useRef, useState } from 'react';
import ClearButton from '../ClearButton/ClearButton';
import Input from '../Input/Input';
import ItemList from '../ItemList/ItemList';
import {
    useClearSearch,
    useSearchQuery,
    useSearchResults,
    useSetSearchQuery,
    useTriggerSearch,
} from './searchHooks';
import styles from './TypeaheadDropdown.module.css';

// Prevents instance rerendering because of reference change
const emptyArray = [];

export default function HookedTypeaheadDropdown({
    id,
    testId,
    onSearch = () => {},
    onSelect,
    placeholder,
}) {
    const value = useSearchQuery(id) || '';
    const results = useSearchResults(id) || emptyArray;
    const clearSearch = useClearSearch(id);
    const triggerSearch = useTriggerSearch(id);
    const setSearchQuery = useSetSearchQuery(id);

    const dropdownRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [isShowingResults, setIsShowingResults] = useState(false);

    const handleInputChange = (event) => {
        const searchQuery = event.target.value;
        triggerSearch(searchQuery);
        onSearch(searchQuery);
    }

    const showResults = useCallback(() => {
        if (results.length) {
            setIsShowingResults(true);
        }
    }, [results.length])

    const hideResults = () => {
        setIsShowingResults(false);
    }

    const handleResultSelect = (item) => {
        setSearchQuery(item.label);
        onSelect(item);
        hideResults();
    }

    const handleMouseDown = useCallback((event) => {
        if (!dropdownRef.current.contains(event.target)) {
            setIsFocused(false);
            hideResults();
        }
    }, []);

    const clearValue = () => {
        clearSearch();
        onSearch('');
        hideResults();
        onSelect(null);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }
    
    const handleFocus = () => {
        setIsFocused(true);
    }

    useEffect(() => {
        if (!isShowingResults) {
            return;
        }
        window.addEventListener('mousedown', handleMouseDown, false);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown, false);
        }
    }, [handleMouseDown, isShowingResults]);

    useEffect(() => {
        // We track `results` in this hook and open the dropdown
        // if the input is focused but results not rendered.
        if (isFocused && !isShowingResults) {
            showResults();
        }
    }, [isFocused, isShowingResults, results, showResults]);

    return (
        <div className={styles.typeaheadDropdown} ref={dropdownRef} data-test-id={testId}>
            <Input
                value={value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                onChange={handleInputChange}
                testId={`${testId}-input`}
            />
            <div className={styles.clearButton}>
                <ClearButton onClick={clearValue} testId={`${testId}-clear`} />
            </div>
            {isShowingResults && (
                <div className={styles.dropdown}>
                    <ItemList
                        items={results}
                        itemClassName={styles.dropdownItem}
                        onSelect={handleResultSelect}
                        testId={`${testId}-results`}
                    />
                </div>
            )}
        </div>
    );
}
