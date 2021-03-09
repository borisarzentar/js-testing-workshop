
export const triggerSearch = (id, query) => (dispatch) => {
    dispatch(setSearchQuery(id, query));
    return fetch('http://localhost:4000/search', {
        method: 'POST',
        body: JSON.stringify({
            query,
        }),
    })
        .then((response) => response.json())
        .then((universities) => (
            universities.map((university) => ({
                value: university.id,
                label: university.name,
            }))
        ))
        .then((universities) => dispatch(setSearchResults(id, universities)))
        .catch((error) => console.log(error));
}

export const setSearchQuery = (id, query) => ({
    type: 'SET_QUERY',
    id,
    query,
})

export const clearSearch = (id) => setSearchQuery(id, '');

const setSearchResults = (id, results) => ({
    type: 'SET_RESULTS',
    id,
    results,
});
