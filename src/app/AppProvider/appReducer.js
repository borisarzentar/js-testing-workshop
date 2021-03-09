import { combineReducers } from 'redux';
import searchReducer from '../../components/TypeaheadDropdown/searchReducer';

export default combineReducers({
    search: searchReducer,
});
