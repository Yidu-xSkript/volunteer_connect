import AuthLayout from "../../Layout/Auth";
import MissionHomeCard from "../../components/cards/mission_home";

function Home() {
    // missions static
    const missions = [
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        },
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        },
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        },
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        },
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        },
        {
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa'
        }
    ]
    const openCard = () => {

    }
    return (
        <AuthLayout>
            <main className="container mx-auto flex py-20 space-x-10">
                {/* Filter Component */}
                <div className="w-1/3"></div>
                <div className="w-2/3">
                    {/* Search Component */}
                    
                    {/* Missions */}
                    <div className="shadow shadow-slate-50 p-5 border border-gray-200 space-y-5 bg-white rounded-2xl">
                        {missions.map((mission) => (
                            <MissionHomeCard
                                action={openCard}
                                image={mission.image}
                                description={mission.description}
                                deadline={mission.deadline}
                                est_time={mission.est_time}
                                location={mission.location}
                                post_human_date={mission.post_human_date}
                                title={mission.title}
                                volunteer_amount={mission.volunteer_amount}
                                volunteering_hours={mission.volunteering_hours} />
                        ))}
                        <div className="cursor-pointer text-lg text-center">Load More</div>
                    </div>
                </div>
            </main>
        </AuthLayout>
    );
}

export default Home;