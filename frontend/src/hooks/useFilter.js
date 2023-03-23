import { useState } from "react"

function useFilter() {
    function getFilter () {
        const filter = localStorage.getItem('filter');
        return filter && filter
    }

    const [filter, setFilter] = useState(getFilter());

    function saveFilter(filter) {
        localStorage.setItem('filter', filter);
        setFilter(filter);
    };

    function removeFilter() {
        localStorage.removeItem("filter");
        setFilter(null);
    }

    return {
        setFilter: saveFilter,
        filter,
        removeFilter
    }
}

export default useFilter;