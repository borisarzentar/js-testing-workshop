
export const createSearchQuerySelector = (id) => (state) => state.search.queries[id];

export const createSearchResultsSelector = (id) => (state) => state.search.results[id];
