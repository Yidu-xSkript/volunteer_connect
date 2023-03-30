import AuthLayout from "../../Layout/Auth";
import MissionHomeCard from "../../components/cards/mission_home";
import Search from "../../components/form/search";
import Filter from "../../components/form/filter";
import MissionSideBar from "../../components/mission_sidebar";
import { useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import useSearch from "../../hooks/useSearch";
import useFilter from "../../hooks/useFilter";
import useMission from "../../hooks/useMission";
import AxiosService from "../../services/axios.services";
import { City, Country } from "country-state-city";

function Home() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedMission, setSelectedMission] = useState(0);
    const openCard = (index) => {
        const targetElement = document.querySelector('#m_sidebar');
        setShowSidebar(true)
        setSelectedMission(index)
        disableBodyScroll(targetElement)
    }
    const hideSidebar = () => {
        const targetElement = document.querySelector('#m_sidebar');
        setShowSidebar(false)
        enableBodyScroll(targetElement)
    }
    const { query, setQuery } = useSearch();
    const { filter, setFilter } = useFilter();
    const { missions, setMissions } = useMission();
    const { _api } = AxiosService()
    const [enableLocation, setEnableLocation] = useState(false)

    const _countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState({ code: _countries[0].isoCode, name: _countries[0].name, value: 0 })
    var _cities = City.getCitiesOfCountry(selectedCountry.code)
    const [selectedCity, setSelectedCity] = useState(_cities[0]?.name)

    const locations = [
        { name: 'On Site', id: 'On Site' },
        { name: 'Remote', id: 'Remote' },
    ]

    const [checkedOrg, setCheckedOrg] = useState([]);
    const [checkedLoc, setCheckedLoc] = useState(new Array(locations.length).fill(false));
    const [organizations, setOrganizations] = useState([]);
    const [applicant, setApplicant] = useState("0")

    useEffect(() => {
        const data = {
            'location': enableLocation ? `${selectedCountry.name}, ${selectedCity}` : '',
            'organizations': checkedOrg.map((org, i) => org && organizations[i]?.id).filter(org => org),
            'volunteerLocation': checkedLoc.map((loc, i) => loc && locations[i]?.id).filter(loc => loc),
            'applicants': applicant,
            'query': query
        }
        setFilter(JSON.stringify(data))
        if (query.length === 0 && !enableLocation && data['organizations'].length === 0 && data['volunteerLocation'] === 0 && data['applicants'] === "0")
            _api.get(`/missions`)
                .then((res) => {
                    setMissions(JSON.stringify(res.data))
                    console.log(missions)
                }).catch(err => console.log(err.data))
    }, [_api, applicant, checkedLoc, checkedOrg, enableLocation, organizations, query, selectedCity, selectedCountry, setFilter, setMissions])
    return (
        <>
            {missions && JSON.parse(missions)?.length > 0 && <MissionSideBar showSidebar={showSidebar} onClick={hideSidebar} mission={JSON.parse(missions)?.length > 0 && JSON.parse(missions)[selectedMission]} />}
            <AuthLayout>
                <main className="container mx-auto px-5 lg:px-10 xl:px-0 flex py-14 space-x-0 sm:space-x-5 lg:space-x-10 scrollbar-hide">
                    {/* Filter Component */}
                    <div className="hidden sm:block w-1/3">
                        <Filter
                            filter={filter}
                            setMissions={setMissions}
                            enableLocation={enableLocation}
                            setEnableLocation={setEnableLocation}
                            setSelectedCountry={setSelectedCountry}
                            setSelectedCity={setSelectedCity}
                            selectedCountry={selectedCountry}
                            selectedCity={selectedCity}
                            checkedLoc={checkedLoc}
                            setCheckedLoc={setCheckedLoc}
                            checkedOrg={checkedOrg}
                            setCheckedOrg={setCheckedOrg}
                            locations={locations}
                            organizations={organizations}
                            setOrganizations={setOrganizations}
                            applicant={applicant}
                            setApplicant={setApplicant}
                            _countries={_countries}
                            _cities={_cities}
                        />
                    </div>
                    <div className="w-full sm:w-2/3 space-y-7">
                        {/* Search Component */}
                        <Search filter={filter} query={query} setMissions={setMissions} setQuery={setQuery} />
                        {/* Filter Component Mobile */}
                        <div className="sm:hidden block">
                            <Filter
                                filter={filter}
                                setMissions={setMissions}
                                enableLocation={enableLocation}
                                setEnableLocation={setEnableLocation}
                                setSelectedCountry={setSelectedCountry}
                                setSelectedCity={setSelectedCity}
                                selectedCountry={selectedCountry}
                                selectedCity={selectedCity}
                                checkedLoc={checkedLoc}
                                setCheckedLoc={setCheckedLoc}
                                checkedOrg={checkedOrg}
                                setCheckedOrg={setCheckedOrg}
                                locations={locations}
                                organizations={organizations}
                                setOrganizations={setOrganizations}
                                applicant={applicant}
                                setApplicant={setApplicant}
                                _countries={_countries}
                                _cities={_cities}
                            />
                        </div>
                        {/* Missions */}
                        <div className="shadow shadow-slate-50 p-5 border border-gray-200 space-y-5 bg-white rounded-2xl">
                            {missions && JSON.parse(missions)?.map((mission, i) => (
                                <MissionHomeCard
                                    key={i}
                                    action={() => openCard(i)}
                                    image={mission.organization.image}
                                    description={mission.description}
                                    deadline={mission.deadline}
                                    est_time={mission.estTime}
                                    location={mission.location}
                                    post_human_date={mission.created_at}
                                    title={mission.name}
                                    volunteer_amount={mission.max_people}
                                    volunteering_hours={mission.volunteeringHours} />
                            ))}
                            {missions && JSON.parse(missions)?.length === 0 && <h4 className="text-center uppercase tracking-[0.3rem] font-semibold">Nothing Here!</h4>}
                            {/* I'm not going to do pagination because i don't have time. */}
                            {/* <div className="cursor-pointer lg:text-lg text-base text-center">Load More</div> */}
                        </div>
                    </div>
                </main>
            </AuthLayout>
        </>
    );
}

export default Home;