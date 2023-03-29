import { useState, useEffect } from "react"

function useSearch() {
    function getQuery () {
        const query = localStorage.getItem('query');
        return query && query
    }

    const [query, setQuery] = useState(getQuery());

    function saveQuery(query) {
        localStorage.setItem('query', query);
        setQuery(query);
    };

    useEffect(() => {
        saveQuery(query)
    }, [query, setQuery])

    function removeQuery() {
        localStorage.removeItem("query");
        setQuery(null);
    }

    return {
        setQuery: saveQuery,
        query,
        removeQuery
    }
}

export default useSearch;