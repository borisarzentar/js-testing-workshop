import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearButton from '../ClearButton/ClearButton';
import Input from '../Input/Input';
import ItemList from '../ItemList/ItemList';
import { triggerSearch, setSearchQuery, clearSearch } from './searchActions';
import { createSearchQuerySelector, createSearchResultsSelector } from './searchSelectors';
import styles from './TypeaheadDropdown.module.css';

// Prevents instance rerendering because of reference change
const emptyArray = [];

export default function TypeaheadDropdown({
    id,
    testId,
    onSearch = () => {},
    onSelect,
    placeholder,
}) {
    const dispatch = useDispatch();
    const selectSearchQuery = useMemo(() => createSearchQuerySelector(id), [id]);
    const selectSearchResults = useMemo(() => createSearchResultsSelector(id), [id]);

    const searchUniversityQuery = useSelector(selectSearchQuery) || '';
    const searchUniversityResults = useSelector(selectSearchResults) || emptyArray;
  
    const dropdownRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [isShowingResults, setIsShowingResults] = useState(false);

    const handleInputChange = (event) => {
        const searchQuery = event.target.value;
        dispatch(triggerSearch(id, searchQuery));
        onSearch(searchQuery);
    }

    const showResults = useCallback(() => {
        if (searchUniversityResults.length) {
            setIsShowingResults(true);
        }
    }, [searchUniversityResults.length])

    const hideResults = () => {
        setIsShowingResults(false);
    }

    const handleResultSelect = (item) => {
        dispatch(setSearchQuery(id, item.label));
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
        dispatch(clearSearch(id));
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
    }, [isFocused, isShowingResults, searchUniversityResults, showResults]);

    return (
        <div className={styles.typeaheadDropdown} ref={dropdownRef} data-test-id={testId}>
            <Input
                value={searchUniversityQuery}
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
                        testId={`${testId}-results`}
                        items={searchUniversityResults}
                        itemClassName={styles.dropdownItem}
                        onSelect={handleResultSelect}
                    />
                </div>
            )}
        </div>
    );
}
