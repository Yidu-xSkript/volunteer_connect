import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../form/button";

function Modal({ showModal, title, children, buttonName, close }) {

    return (
        <>
            {/* overlay */}
            {showModal && <div className="fixed top-0 right-0 w-screen h-screen bg-primary opacity-5 z-40" />}
            {/* Modal */}
            <div id="modal" className={`w-full h-full fixed z-40 overflow-y-scroll left-0 xl:left-1/4 sm:p-20 px-2 py-20 duration-100 ease-in-out ${showModal ? "translate-y-0 block" : "translate-y-full"}`}>
                <div className="bg-white rounded-3xl xl:w-1/2 w-full shadow-xl border border-gray-400">
                    {/* Modal Header */}
                    <div className={`flex ${title ? 'justify-between' : 'justify-end'} p-5`}>
                        {title && <h3 className="text-2xl uppercase tracking-[0.4rem] font-light">{title}</h3>}
                        <XMarkIcon className="w-8 bg-gray-100 rounded-full p-1 cursor-pointer" onClick={close} />
                    </div>
                    <hr className="h-px bg-gray-200 border-0 w-full" />
                    {/* Modal Body */}
                    <div className="p-5">
                        {children}
                    </div>
                    {/* Modal Footer */}
                    <hr className="h-px bg-gray-100 border-0 w-full" />
                    <div className="p-5">
                        <Button className="w-full rounded-3xl" text={buttonName} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;