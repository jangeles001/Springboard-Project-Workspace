import NavBar from "./NavBar.jsx";
import MissionCard from "./MissionCard.jsx";
import "./MissionControl.css";

function MissionControl({title, missions, filters, setFilterView, updateMissionStatus}){

    return (
    <>
    <NavBar title={title} filterTypes={filters} setFilterView={setFilterView}/>
    <div className="MissionControl-Container">
    {missions.map((mission) => {
        return (
            <MissionCard key={mission.id} id={mission.id} missionName={mission.name} status={mission.status} crew={mission.crew} updateMissionStatus={updateMissionStatus}/>
        )
    })}
    </div>
    </>
    )
}

export default MissionControl;