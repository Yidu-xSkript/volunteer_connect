import Modal from ".";

function DeleteMission({ showModal, close }) {
    return (
        <Modal showModal={showModal} close={close} buttonName={"Delete Mission"} title={"Delete Mission"}>
            <div className="flex items-center justify-center">
                <p className="text-2xl">Are you sure?</p>
            </div>
        </Modal>
    );
}

export default DeleteMission;