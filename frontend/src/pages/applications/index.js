import AuthLayout from "../../Layout/Auth";
import App from "../../components/cards/application";
import empty from "../../assets/empty.svg";
import { useEffect, useState } from "react";
import AxiosService from "../../services/axios.services";

function Applications() {
    const [apps, setApps] = useState([])
    const { _api } = AxiosService()

    useEffect(() => {
        if (apps.length === 0)
            _api.get(`/application`)
                .then(res => {
                    setApps([...res.data])
                })
                .catch(err => console.log(err))
    }, [_api, apps])

    return (
        <AuthLayout>
            <div className="relative">
                <div className="max-w-7xl p-10 mx-auto container">
                    {apps.length > 0 && <div className="flex justify-center my-10">
                        <h1 className="text-4xl uppercase tracking-[0.3rem] font-light">Applications</h1>
                    </div>}
                    {apps.length > 0 ?
                        <div className="space-y-4">
                            {apps.map((_app) => (
                                <App
                                    amount_of_volunteers={_app?.mission.max_people}
                                    approval_status={_app.status}
                                    est_time={_app?.mission.estTime}
                                    image={_app.mission.organization.image}
                                    mission_title={_app.mission.name}
                                    name={_app.mission.organization.name}
                                    key={_app.id} />
                            ))}
                        </div>
                        : <div className="rounded-3xl border border-gray-300 shadow p-10 grid grid-cols-4">
                        <img src={empty} alt="No Content Found." className="col-span-1" />
                        <div className="flex flex-col items-center justify-center col-span-3 space-y-6">
                            <h3 className="uppercase tracking-[0.6rem] font-bold text-4xl">Empty!</h3>
                            <p className="text-2xl font-light text-gray-500 capitalize">You have not applied to any organizations yet!</p>
                        </div>
                    </div>}
                </div>
            </div>
        </AuthLayout>
    );
}

export default Applications;