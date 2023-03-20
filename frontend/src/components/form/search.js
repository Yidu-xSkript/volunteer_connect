import Input from "./input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
function Search() {
    return (
        <Input placeholder={"Search by Title"} className={'text-base lg:text-lg mb-0 mt-0 rounded-xl border border-gray-200 shadow shadow-slate-50 bg-white focus:shadow-xl'} type="text" icon={
            <MagnifyingGlassIcon className="w-10 p-2 shadow-xl duration-75 bg-primary text-white rounded-full" />
        } />
    );
}
export default Search;