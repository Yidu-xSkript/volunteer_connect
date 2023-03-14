import Modal from ".";
import Input from "../form/input";
import TextArea from "../form/textarea";
import Dropdown from "../form/dropdown";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function ManageMissionModal({ showModal, type, close }) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Modal showModal={showModal} close={close} buttonName={type === 'Edit' ? "Update Mission" : "Add Mission"} title={type === 'Edit' ? "Edit Mission" : "Add Mission"}>
            {/* Form */}
            <div>
                <label className="font-semibold pl-2">Title</label>
                <Input className={'border border-gray-200'} placeholder={'Mission Title'} type="text" />
            </div>
            <div>
                {/* Not sure about what to do with this one */}
                <label className="font-semibold pl-2">Category</label>
                <Dropdown className={'border border-gray-200 w-full'} options={[{ id: 'On Site', name: 'On Site' }, { id: 'Remote', name: 'Remote' }]} />
            </div>
            <div>
                <label className="font-semibold pl-2">Application Deadline</label>
                <DatePicker className="rounded-full h-14 my-3 text-lg duration-150 focus:bg-white focus:shadow-md focus:outline-none focus:ring focus:ring-primary w-full p-5 border border-gray-200" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
                <label className="font-semibold pl-2">Estimated Time</label>
                <Input className={'border border-gray-200'} placeholder={'1 to 3 months'} type="text" />
            </div>
            <div>
                <label className="font-semibold pl-2">Total number of applicants</label>
                <Input className={'border border-gray-200'} placeholder={'4'} type="number" />
            </div>
            <div>
                <label className="font-semibold pl-2">Volunteering Hours (hrs/day)</label>
                <Input className={'border border-gray-200'} placeholder={'5'} type="number" />
            </div>
            <div>
                <label className="font-semibold pl-2">Mission Description</label>
                <TextArea className={'border border-gray-200 w-full p-5 mb-3 mt-2'} rows={5} placeholder={'Description about the mission.'} />
            </div>
            <div>
                <label className="font-semibold pl-2">Mission Location</label>
                <Dropdown className={'border border-gray-200 w-full'} options={[{ id: 'On Site', name: 'On Site' }, { id: 'Remote', name: 'Remote' }]} />
            </div>
            <div>
                {/* Not sure about what to do with this one */}
                <label className="font-semibold pl-2">Requirements</label>
                <Dropdown className={'border border-gray-200 w-full'} options={[{ id: 'On Site', name: 'On Site' }, { id: 'Remote', name: 'Remote' }]} />
            </div>
        </Modal>
    );
}

export default ManageMissionModal;