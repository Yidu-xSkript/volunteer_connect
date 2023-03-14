import OrgMissionCard from "../../components/cards/mission_org";
import AuthLayout from "../../Layout/Auth";
import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/form/button";
import empty from "../../assets/empty.svg";
import { useState } from "react";
import ManageMissionModal from "../../components/modal/manageMission";
import DeleteMissionModal from "../../components/modal/deleteMission";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Mission() {
    const missions = [
        {
            id: 1,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 2,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 3,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 4,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 5,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            id: 6,
            applicants: 5,
            deadline: 'Feb 02, 23',
            est_time: '1 to 3 months',
            post_human_date: '2 hours ago',
            title: 'Mission Title 1',
            volunteering_hours: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        }
    ]

    const [showModal, setShowModal] = useState(false)
    const [showDelModal, setShowDelModal] = useState(false)
    const [type, setType] = useState()
    // const [selectedMission, setSelectedMission] = useState()


    const bodyScrollStatus = (disable = true) => {
        const targetElement = document.querySelector('#modal');
        disable ? disableBodyScroll(targetElement) : enableBodyScroll(targetElement);
    }
    const openEditModal = () => {
        setType("Edit")
        setShowModal(true)
        bodyScrollStatus()
    }
    const openAddModal = () => {
        setType("Add")
        setShowModal(true)
        bodyScrollStatus()
    }
    const closeModal = () => {
        if (showModal) setShowModal(false)
        if (showDelModal) setShowDelModal(false)
        // setType("")
        bodyScrollStatus(false)
    }
    const OpenDeleteModal = () => {
        setShowDelModal(true)
        bodyScrollStatus()
    }

    return (
        <>
            {/* Add Modal + Edit Modal  - defined with type */}
            <ManageMissionModal showModal={showModal} type={type} close={closeModal} />
            <DeleteMissionModal showModal={showDelModal} close={closeModal} />
            <AuthLayout>
                <div className="relative">
                    <div className="p-10 mx-auto container">
                        {missions.length > 0 && <div className="flex justify-center my-10">
                            <h1 className="text-4xl uppercase tracking-[0.3rem] font-light">Missions</h1>
                        </div>}
                        {/* Checks if there are any missions created */}
                        {missions.length > 0 ?
                            <div className="grid grid-cols-3 gap-7 my-10">
                                {missions.map((mission) => (
                                    // I'm referring to the attributes 1by1 for ease. I'm gonna pass the whole object later when i send a get request to the api.
                                    <OrgMissionCard
                                        key={mission.id}
                                        applicants={mission.applicants}
                                        deadline={mission.deadline}
                                        description={mission.description}
                                        est_time={mission.est_time}
                                        id={mission.id}
                                        post_human_date={mission.post_human_date}
                                        title={mission.title}
                                        volunteering_hours={mission.volunteering_hours}
                                        openEditModal={openEditModal}
                                        openDeleteModal={OpenDeleteModal} />
                                ))}
                            </div> :
                            <div className="rounded-3xl border border-gray-300 shadow p-10 grid grid-cols-4">
                                <img src={empty} alt="No Content Found." className="col-span-1" />
                                <div className="flex flex-col items-center justify-center col-span-3 space-y-6">
                                    <h3 className="uppercase tracking-[0.6rem] font-light text-4xl">Empty!</h3>
                                    <p className="text-2xl font-light text-gray-500 capitalize">You have not created any missions yet!</p>
                                    <Button text={"Create Mission"} className="text-xl px-8 rounded-full" action={openAddModal} />
                                </div>
                            </div>}
                        {missions.length > 0 && <div className="cursor-pointer text-lg text-center uppercase tracking-[0.2rem] font-semibold" title="Load More Missions">Load More</div>}
                    </div>
                    <PlusIcon className="w-20 p-3 rounded-full bg-primary shadow-xl fixed bottom-10 right-10 text-white cursor-pointer" title="Add Mission" onClick={openAddModal} />
                </div>
            </AuthLayout>
        </>
    );
}
export default Mission;