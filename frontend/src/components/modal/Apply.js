import Modal from ".";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import UploadWidget from "../form/file_upload";

function Apply({ showModal, close }) {
    return (
        <Modal showModal={showModal} close={close} buttonName={"Apply"}>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-3xl">
                <DocumentIcon className="w-12 p-1 rounded-2xl border border-gray-200" />
                <p className="text-lg text-gray-500 font-semibold">filename.pdf</p>
                <XMarkIcon className="w-10 text-gray-500 cursor-pointer" />
            </div>

            <div className="w-full py-10">
                <UploadWidget className={'h-64'} text="Upload a new resume?" text2="PDF, JPEG, or PNG" />
            </div>
        </Modal>
    );
}

export default Apply;