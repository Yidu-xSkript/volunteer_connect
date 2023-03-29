import Modal from ".";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import UploadWidget from "../form/file_upload";
import AxiosService from "../../services/axios.services";
import API from "../../utils/API";
import { useState } from "react";

function Apply({ id, showModal, close, filename, setUser }) {
    const { _api } = AxiosService()
    const { auth_api_url, base_api_url } = API()
    const [isLoading, setIsLoading] = useState(false)
    const [removeIsLoading, setRemoveIsLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    const apply = () => {
        setIsLoading(true)
        const data = {
            'resume': !filename && uploadedFile
        }
        _api.post(`${base_api_url}/application/mission/${id}/apply`, data)
            .then(res => {
                setIsLoading(false)
                close()
                setUser(JSON.stringify(res.data))
                assignMessage("Thank you for applying! we'll contact you as soon as possible!")
            })
            .catch(err => {
                setIsLoading(false)
                if (err.response.data['error'] !== undefined)
                    assignMessage(err.response.data?.error)
                console.log(err)
            })
    }
    const assignMessage = (message) => {
        setShowMessage(true)
        setMessage(message)
        setTimeout(() => {
            setShowMessage(false)
        }, 5000)
    }
    const removeFile = () => {
        setRemoveIsLoading(true)
        _api.patch(`${auth_api_url}/user/resume/destroy`)
            .then(res => {
                setRemoveIsLoading(false)
                setUser(JSON.stringify(res.data))
            }).catch(err => {
                setRemoveIsLoading(false)
                console.log(err)
            })
    }
    const [uploadedFile, setUploadedFile] = useState();
    return (
        <>
            {showMessage && <div className="z-20 absolute bottom-10 left-10 bg-white rounded-lg border border-primary text-primary font-bold shadow-xl p-10">
                {message}
            </div>}
            <Modal isLoading={isLoading} onClick={apply} showModal={showModal} close={close} buttonName={"Apply"}>
                {filename && <div className="flex items-center justify-between p-3 border border-gray-200 rounded-3xl" title="This is your resume.">
                    <DocumentIcon className="w-12 p-1 rounded-2xl border border-gray-200" />
                    <p className="text-lg text-gray-500 font-semibold select-none">{filename}</p>
                    {!removeIsLoading && <XMarkIcon className="w-10 text-gray-500 cursor-pointer" onClick={removeFile} />}
                    {removeIsLoading && <div role="status">
                        <svg aria-hidden="true" className={`w-10 h-10 mr-2 text-gray-200 animate-spin fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>}
                </div>}

                {!filename && <div className="w-full py-10">
                    <UploadWidget
                        mime={['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']}
                        uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}
                        type='file' className={'h-64'} text="Upload a new resume?" text2="PDF, JPEG, or PNG" />
                </div>}
            </Modal>
        </>
    );
}

export default Apply;