
const initialState = {
    queries: {},
    results: {},
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUERY':
            return {
                ...state,
                queries: {
                    ...state.queries,
                    [action.id]: action.query,
                }
            };
        case 'SET_RESULTS':
            return {
                ...state,
                results: {
                    ...state.results,
                    [action.id]: action.results,
                }
            };
        default: return state;
    }
}
