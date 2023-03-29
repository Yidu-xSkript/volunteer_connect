import { useState } from "react"

function useMission() {
    function getMissions () {
        const missions = localStorage.getItem('missions');
        return missions && missions
    }

    const [missions, setMissions] = useState(getMissions());

    function saveMissions(missions) {
        localStorage.setItem('missions', missions);
        setMissions(missions);
    };

    function removeMissions() {
        localStorage.removeItem("missions");
        setMissions(null);
    }

    return {
        setMissions: saveMissions,
        missions,
        removeMissions
    }
}

export default useMission;