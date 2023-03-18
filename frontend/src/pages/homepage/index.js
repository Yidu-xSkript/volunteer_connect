import AuthLayout from "../../Layout/Auth";
import MissionHomeCard from "../../components/cards/mission_home";
import Search from "../../components/form/search";
import Filter from "../../components/form/filter";
import MissionSideBar from "../../components/mission_sidebar";
import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

function Home() {
    // missions static
    const missions = [
        {
            id: 1,
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title 1',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'On Site',
            requirements: [
                {id: 1, name: 'requirement1'},
                {id: 2, name: 'requirement2'},
                {id: 3, name: 'requirement3'},
                {id: 4, name: 'requirement4'},
                {id: 5, name: 'requirement5'},
            ]
        },
        {
            id: 2,
            image: 'https://seeklogo.com/images/H/hewlett-packard-company-logo-F5676A4E16-seeklogo.com.png',
            title: 'Mission Title 2',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'On Site',
            requirements: [
                {id: 1, name: 'Requirement 1'},
                {id: 2, name: 'Requirement 2'},
                {id: 3, name: 'Requirement 3'},
                {id: 4, name: 'Requirement 4'},
                {id: 5, name: 'Requirement 5'},
            ]
        },
        {
            id: 3,
            image: 'https://download.logo.wine/logo/The_Boring_Company/The_Boring_Company-Logo.wine.png',
            title: 'Mission Title 3',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'On Site',
            requirements: [
                {id: 1, name: 'Requirement 1'},
                {id: 2, name: 'Requirement 2'},
                {id: 3, name: 'Requirement 3'},
                {id: 4, name: 'Requirement 4'},
                {id: 5, name: 'Requirement 5'},
            ]
        },
        {
            id: 4,
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Computools_company_logo.png',
            title: 'Mission Title 4',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'Remote',
            requirements: [
                {id: 1, name: 'Requirement 1'},
                {id: 2, name: 'Requirement 2'},
                {id: 3, name: 'Requirement 3'},
                {id: 4, name: 'Requirement 4'},
                {id: 5, name: 'Requirement 5'},
            ]
        },
        {
            id: 5,
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title 5',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'Remote',
            requirements: [
                {id: 1, name: 'Requirement 1'},
                {id: 2, name: 'Requirement 2'},
                {id: 3, name: 'Requirement 3'},
                {id: 4, name: 'Requirement 4'},
                {id: 5, name: 'Requirement 5'},
            ]
        },
        {
            id: 6,
            image: 'https://www.logo.wine/a/logo/Plaid_(company)/Plaid_(company)-Logo.wine.svg',
            title: 'Mission Title 6',
            post_human_date: '2 Hours Ago',
            volunteering_hours: '5hrs/day',
            est_time: '1 to 3 months',
            deadline: 'Feb 02, 23',
            volunteer_amount: 5,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            location: 'Ethiopia, Addis Ababa',
            job_location: 'Remote',
            requirements: [
                {id: 1, name: 'Requirement 1'},
                {id: 2, name: 'Requirement 2'},
                {id: 3, name: 'Requirement 3'},
                {id: 4, name: 'Requirement 4'},
                {id: 5, name: 'Requirement 5'},
            ]
        }
    ]
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedMission, setSelectedMission] = useState(0);
    const openCard = (mission_id) => {
        const targetElement = document.querySelector('#m_sidebar');
        setShowSidebar(true)
        setSelectedMission(mission_id)
        disableBodyScroll(targetElement)
    }
    const hideSidebar = () => {
        const targetElement = document.querySelector('#m_sidebar');
        setShowSidebar(false)
        enableBodyScroll(targetElement)
    }
    return (
        <>
            <MissionSideBar showSidebar={showSidebar} onClick={hideSidebar} mission={missions[selectedMission]} />
            <AuthLayout>
                <main className="container mx-auto px-5 lg:px-10 xl:px-0 flex py-14 space-x-5 lg:space-x-10 scrollbar-hide">
                    {/* Filter Component */}
                    <div className="w-1/3">
                        <Filter />
                    </div>
                    <div className="w-2/3 space-y-7">
                        {/* Search Component */}
                        <Search />
                        {/* Missions */}
                        <div className="shadow shadow-slate-50 p-5 border border-gray-200 space-y-5 bg-white rounded-2xl">
                            {missions.map((mission) => (
                                <MissionHomeCard
                                    key={mission.id}
                                    action={() => openCard(mission.id-1)}
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
                            <div className="cursor-pointer lg:text-lg text-base text-center">Load More</div>
                        </div>
                    </div>
                </main>
            </AuthLayout>
        </>
    );
}

export default Home;