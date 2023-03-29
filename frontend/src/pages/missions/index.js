import OrgMissionCard from "../../components/cards/mission_org";
import AuthLayout from "../../Layout/Auth";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/form/button";
import empty from "../../assets/empty.svg";
import { useEffect, useState } from "react";
import ManageMissionModal from "../../components/modal/manageMission";
import DeleteMissionModal from "../../components/modal/deleteMission";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import AxiosService from "../../services/axios.services";
import useMission from '../../hooks/useMission';

function Mission() {
    const [missions_, setMissions_] = useState([])
    const { setMissions } = useMission()

    const [showModal, setShowModal] = useState(false)
    const [showDelModal, setShowDelModal] = useState(false)
    const [type, setType] = useState()
    const [selectedMission, setSelectedMission] = useState()
    const { _api } = AxiosService()

    const bodyScrollStatus = (disable = true) => {
        const targetElement = document.querySelector('#modal');
        disable ? disableBodyScroll(targetElement) : enableBodyScroll(targetElement);
    }
    const openEditModal = (index) => {
        setSelectedMission(index)
        bodyScrollStatus()
        setType("Edit")
        setShowModal(true)
    }
    const openAddModal = () => {
        setType("Add")
        setShowModal(true)
        bodyScrollStatus()
    }
    const closeModal = () => {
        if (showModal) setShowModal(false)
        if (showDelModal) setShowDelModal(false)
        setSelectedMission()
        bodyScrollStatus(false)
        setType('')
    }
    const OpenDeleteModal = (index) => {
        setSelectedMission(index)
        setShowDelModal(true)
        bodyScrollStatus()
    }

    useEffect(() => {
        if (missions_.length === 0)
            _api.get(`/missions/organization`).then(res => {
                setMissions_([...res.data])
            }).catch(err => console.log(err))
    }, [missions_, _api])

    return (
        <>
            {/* Add Modal + Edit Modal  - defined with type */}
            {missions_.length > 0 & selectedMission !== undefined || type === 'Add' ? <ManageMissionModal setMissions={setMissions} setMissions_={setMissions_} showModal={showModal} type={type} close={closeModal} mission={missions_[selectedMission]} /> : ''}
            {missions_.length > 0 && selectedMission !== undefined && <DeleteMissionModal setMissions={setMissions} setMissions_={setMissions_} mission={missions_[selectedMission]} showModal={showDelModal} close={closeModal} />}
            <AuthLayout>
                <div className="relative">
                    <div className="p-10 mx-auto container">
                        {missions_.length > 0 && <div className="flex justify-center my-10">
                            <h1 className="text-4xl uppercase tracking-[0.3rem] font-light">Missions</h1>
                        </div>}
                        {/* Checks if there are any missions created */}
                        {missions_.length > 0 ?
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 my-10">
                                {missions_.map((mission, index) => (
                                    <OrgMissionCard
                                        key={index}
                                        mission={mission}
                                        openEditModal={() => openEditModal(index)}
                                        openDeleteModal={() => OpenDeleteModal(index)} />
                                ))}
                            </div> :
                            <div className="rounded-3xl border border-gray-300 shadow p-10 grid grid-cols-4">
                                <img src={empty} alt="No Content Found." className="col-span-1" />
                                <div className="flex flex-col items-center justify-center col-span-3 space-y-6">
                                    <h3 className="uppercase tracking-[0.6rem] font-bold text-4xl">Empty!</h3>
                                    <p className="text-2xl font-light text-gray-500 capitalize">You have not created any missions yet!</p>
                                    <Button text={"Create Mission"} className="text-xl px-8 rounded-full" action={openAddModal} />
                                </div>
                            </div>}
                        {/* I'm not going to do pagination because i don't have time. */}
                        {/* {missions_.length > 0 && <div className="cursor-pointer text-lg text-center uppercase tracking-[0.2rem] font-semibold" title="Load More Missions">Load More</div>} */}
                    </div>
                    <PlusIcon className="w-20 p-3 rounded-full bg-primary shadow-xl fixed bottom-10 right-10 text-white cursor-pointer" title="Add Mission" onClick={openAddModal} />
                </div>
            </AuthLayout>
        </>
    );
}
export default Mission;