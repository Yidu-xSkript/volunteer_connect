import AuthLayout from "../../Layout/Auth";
import App from "../../components/cards/application";
import empty from "../../assets/empty.svg";

function Applications() {
    const apps = [
        {
            id: 1,
            volunteer_amt: 5,
            total_applied: 2,
            est_time: '1 to 3 months',
            image: 'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png',
            mission_title: 'Mission 1',
            name: 'Organization 1',
            approval_status: 0
        },
        {
            id: 2,
            volunteer_amt: 15,
            total_applied: 12,
            est_time: '1 to 3 months',
            image: 'https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg',
            mission_title: 'Mission 2',
            name: 'Organization 2',
            approval_status: 1
        },
        {
            id: 3,
            volunteer_amt: 3,
            total_applied: 1,
            est_time: '1 to 3 months',
            image: 'https://www.edigitalagency.com.au/wp-content/uploads/Twitter-logo-png.png',
            mission_title: 'Mission 3',
            name: 'Organization 3',
            approval_status: NaN
        }
    ]
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
                                    amount_of_volunteers={_app.volunteer_amt}
                                    approval_status={_app.approval_status}
                                    est_time={_app.est_time}
                                    image={_app.image}
                                    mission_title={_app.mission_title}
                                    name={_app.name}
                                    total_applied={_app.total_applied}
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