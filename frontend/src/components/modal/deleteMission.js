import { useState } from "react";
import Modal from ".";
import AxiosService from "../../services/axios.services";

function DeleteMission({ showModal, close, mission, setMissions, setMissions_ }) {
    const [isLoading, setIsLoading] = useState()
    const { _api } = AxiosService()
    const destroy = () => {
        setIsLoading(true)
        _api.delete(`/missions/${mission.id}/destroy`).then(res => {
            setIsLoading(false)
            setMissions(JSON.stringify(res.data.missions))
            setMissions_([...res.data.org_missions])
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    return (
        <Modal onClick={destroy} isLoading={isLoading} showModal={showModal} close={close} buttonName={"Delete Mission"} title={"Delete Mission"}>
            <div className="flex items-center justify-center">
                <p className="text-2xl">Are you sure?</p>
            </div>
        </Modal>
    );
}

export default DeleteMission;