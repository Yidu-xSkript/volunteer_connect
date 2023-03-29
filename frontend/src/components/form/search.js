import Input from "./input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AxiosService from "../../services/axios.services";
import API from "../../utils/API";

function Search({ query, setQuery, filter, setIsLoading, setMissions }) {
    const { _api } = AxiosService()

    const applySearch = async () => {
        const data = JSON.parse(filter)
        // Use Redux to store data. but for now let's just use localstorage.
        await _api.get(`/missions?query=${data['query']}&applicants=${data['applicants']}&location=${data['location']}&volunteerLocation=${JSON.stringify(data['volunteerLocation'])}&organizations=[${data['organizations']}]`)
            .then((res) => {
                setMissions(JSON.stringify(res.data))
            })
            .catch(err => console.log(err.data))
    }

    return (
        <Input onChange={(e) => setQuery(e.target.value)} value={query} placeholder={"Search by Title"} className={'text-base lg:text-lg mb-0 mt-0 rounded-xl border border-gray-200 shadow shadow-slate-50 bg-white focus:shadow-xl'} type="text" icon={
            <MagnifyingGlassIcon className="w-10 p-2 shadow-xl duration-75 bg-primary text-white rounded-full" onClick={applySearch} />
        } />
    );
}
export default Search;