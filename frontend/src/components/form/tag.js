import { XCircleIcon } from "@heroicons/react/24/solid";

function tag({ name, onRemove }) {
    return (
        <span className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-primary opacity-90 text-gray-200 hover:opacity-100 hover:text-gray-100">
            {name}
            <XCircleIcon className="h-5 w-5 ml-3 hover:text-gray-300" onClick={onRemove} />
        </span>
    );
}

export default tag;
