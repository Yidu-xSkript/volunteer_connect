import Modal from ".";
import Input from "../form/input";
import TextArea from "../form/textarea";
import Dropdown from "../form/dropdown";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import LocationDropdown from "../location";
import Tag from "../form/tag";
import { PlusIcon } from "@heroicons/react/24/outline";
import { City, Country } from "country-state-city";
import AxiosService from "../../services/axios.services";

function ManageMissionModal({ showModal, type, close, mission, setMissions, setMissions_ }) {
    const [deadline, setDeadline] = useState(mission !== undefined ? new Date(mission.created_at) : new Date());
    const [title, setTitle] = useState(mission !== undefined ? mission.name : '')
    const [estTime, setEstTime] = useState(mission !== undefined ? mission.estTime : '')
    const [applicants, setApplicants] = useState(mission !== undefined ? mission.max_people : 1)
    const [volunteeringHours, setVolunteeringHours] = useState(mission !== undefined ? mission.volunteeringHours : 1)
    const [description, setDescription] = useState(mission !== undefined ? mission.description : '')
    const [requirement, setRequirement] = useState('')
    var [requirements, setRequirements] = useState(mission !== undefined && mission ? [...mission?.requirements.map((_) => _?.name)] : [])

    const volunteerLocationOption = [{ id: 'On Site', name: 'On Site' }, { id: 'Remote', name: 'Remote' }]
    var vlArr = []
    volunteerLocationOption.map((loc, i) => {
        if (mission && mission.volunteeringLocation === loc.name)
            vlArr.push(volunteerLocationOption[i].id)
        return null
    })
    const [volunteerLocation, setVolunteerLocation] = useState(mission !== undefined ? vlArr[0] : volunteerLocationOption[0])
    const _countries = Country.getAllCountries()
    var countryArr = []
    _countries.forEach((country) => {
        if (mission && mission?.location.split(/\s*, \s*/)[0] === country.name)
            countryArr.push(country.isoCode)
        return null
    })
    const [selectedCountry, setSelectedCountry] = useState({
        code: mission !== undefined ? countryArr[0] : _countries[0].isoCode,
        name: mission !== undefined ? mission?.location.split(/\s*, \s*/)[0] : _countries[0].name
    })
    var _cities = City.getCitiesOfCountry(selectedCountry.code)
    const [selectedCity, setSelectedCity] = useState(mission !== undefined ? mission?.location.split(/\s*, \s*/)[1] : _cities[0]?.name)

    const setCountry = (e) => {
        setSelectedCountry({ code: _countries[e.target.value].isoCode, name: _countries[e.target.value].name })
    }

    const setCity = (e) => {
        setSelectedCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addRequirements = () => {
        setRequirements([...requirements, requirement])
    }
    const removeRequirementTag = (index) => {
        const temp = [...requirements];
        temp.splice(index, 1);
        setRequirements(temp);
    }

    const { _api } = AxiosService()
    const [isLoading, setIsLoading] = useState(false)

    const data = () => {
        return {
            'name': title,
            'description': description,
            'location': `${selectedCountry.name}, ${selectedCity}`,
            'applicants': applicants,
            'estTime': estTime,
            'volunteeringHours': volunteeringHours,
            'volunteeringLocation': volunteerLocation,
            'deadline': deadline,
            'requirements': requirements
        }
    }

    const sendRequest = (url, request_type) => {
        setIsLoading(true)
        eval(request_type)(`${url}`, data())
            .then(res => {
                setIsLoading(false)
                setMissions_([...res.data.org_missions])
                setMissions(JSON.stringify(res.data.missions))
            }).catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const updateMission = () => {
        sendRequest(`/missions/${mission.id}/update`, '_api.patch')
    }

    const createMission = () => {
        sendRequest(`/missions/create/org`, '_api.post')
    }

    return (
        <Modal isLoading={isLoading} onClick={type === 'Edit' ? updateMission : createMission} showModal={showModal} close={close} buttonName={type === 'Edit' ? "Update Mission" : "Add Mission"} title={type === 'Edit' ? "Edit Mission" : "Add Mission"}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold pl-2">Title</label>
                    <Input onChange={(e) => setTitle(e.target.value)} value={title} className={'border border-gray-200'} placeholder={'Mission Title'} type="text" />
                </div>
                <div>
                    <label className="font-semibold pl-2">Application Deadline</label>
                    <DatePicker className="rounded-full h-14 my-3 text-lg duration-150 focus:bg-white focus:shadow-md focus:outline-none focus:ring focus:ring-primary w-full p-5 border border-gray-200" selected={deadline} onChange={(date) => setDeadline(date)} />
                </div>
                <div>
                    <label className="font-semibold pl-2">Estimated Time</label>
                    <Input onChange={(e) => setEstTime(e.target.value)} value={estTime} className={'border border-gray-200'} placeholder={'1 to 3 months'} type="text" />
                </div>
                <div>
                    <label className="font-semibold pl-2">Total number of applicants</label>
                    <Input onChange={(e) => setApplicants(e.target.value)} value={applicants} className={'border border-gray-200'} placeholder={'4'} type="number" />
                </div>
                <div>
                    <label className="font-semibold pl-2">Volunteering Hours (hrs/day)</label>
                    <Input max={24} onChange={(e) => setVolunteeringHours(e.target.value)} value={volunteeringHours} className={'border border-gray-200'} placeholder={'5'} type="number" />
                </div>
                <div>
                    <label className="font-semibold pl-2">Mission Description</label>
                    <TextArea onChange={(e) => setDescription(e.target.value)} value={description} className={'border border-gray-200 w-full p-5 mb-3 mt-2'} rows={5} placeholder={'Description about the mission.'} />
                </div>
                <div>
                    <label className="font-semibold pl-2">Volunteering Location</label>
                    <Dropdown onChange={(e) => setVolunteerLocation(e.target.value)} className={'border border-gray-200 w-full'} options={volunteerLocationOption} />
                </div>
                <div>
                    <label className="font-semibold pl-2">Location</label>
                    <LocationDropdown _cities={_cities} _countries={_countries} setCity={setCity} setCountry={setCountry} />
                </div>
                <div>
                    {/* Not sure about what to do with this one */}
                    <label className="font-semibold pl-2">Requirements</label>
                    <Input onChange={(e) => setRequirement(e.target.value)} value={requirement} className={'border border-gray-200'} placeholder={'Requirements'} type="text" icon={
                        <PlusIcon className="w-10 text-white h-10 p-2 border border-gray-400 bg-primary rounded-full" onClick={addRequirements} />
                    } />
                    <div className='px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-auth'>
                        {requirements?.map((req, i) => (
                            <Tag name={req} key={i} onRemove={() => removeRequirementTag(i)} />
                        ))}
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default ManageMissionModal;