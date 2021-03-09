import { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ClearButton from '../ClearButton/ClearButton';
import Input from '../Input/Input';
import ItemList from '../ItemList/ItemList';
import {
    clearSearch as clearSearchAction,
    triggerSearch as triggerSearchAction,
    setSearchQuery as setSearchQueryAction,
} from './searchActions';
import { createSearchQuerySelector, createSearchResultsSelector } from './searchSelectors';
import styles from './TypeaheadDropdown.module.css';

// Prevents instance rerendering because of reference change
const emptyArray = [];

const mapStateToProps = (state, ownProps) => {
    const searchId = ownProps.id;
    return {
        value: createSearchQuerySelector(searchId)(state) || '',
        results: createSearchResultsSelector(searchId)(state) || emptyArray,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    clearSearch: () => dispatch(clearSearchAction(ownProps.id)),
    triggerSearch: (searchQuery) => dispatch(triggerSearchAction(ownProps.id, searchQuery)),
    setSearchQuery: (searchQuery) => dispatch(setSearchQueryAction(ownProps.id, searchQuery)),
});

export function TypeaheadDropdown({
    value,
    testId,
    results,
    onSearch = () => {},
    onSelect,
    placeholder,
    clearSearch,
    triggerSearch,
    setSearchQuery,
}) {
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
                        testId={`${testId}-results`}
                        items={results}
                        itemClassName={styles.dropdownItem}
                        onSelect={handleResultSelect}
                    />
                </div>
            )}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeaheadDropdown);
