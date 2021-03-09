import { useDispatch, useSelector } from 'react-redux'
import { triggerSearch, clearSearch, setSearchQuery } from './searchActions';
import { createSearchQuerySelector, createSearchResultsSelector } from './searchSelectors';

export const useSearchQuery = (id) => {
    return useSelector(createSearchQuerySelector(id));
}

export const useSearchResults = (id) => {
    return useSelector(createSearchResultsSelector(id));
}

export const useTriggerSearch = (id) => {
    const dispatch = useDispatch();
    return (searchQuery) => dispatch(triggerSearch(id, searchQuery));
}

export const useClearSearch = (id) => {
    const dispatch = useDispatch();
    return () => dispatch(clearSearch(id));
}

export const useSetSearchQuery = (id) => {
    const dispatch = useDispatch();
    return (searchQuery) => dispatch(setSearchQuery(id, searchQuery));
}
