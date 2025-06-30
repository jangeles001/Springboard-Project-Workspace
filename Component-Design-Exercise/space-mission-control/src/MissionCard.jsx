import "./MissionCard.css";

function MissionCard({id, missionName, status, crew, updateMissionStatus}){
        const crewNames = crew.join(", "); //Join crew array into comma-delimited string to display to the screen.

    return (
        <div className="MissionCard">
            <div className="MissionCard-Information">
                <h1>{missionName}</h1>
                <p>Status: {status}</p>
                <p>Crew: {crewNames}</p>
            </div>
            <div className="MissionCard-Buttons">
                <button className="MissionCard-Button" disabled={status === "Active" || status === "Completed" ? true : false} onClick={() => updateMissionStatus(id, "Active")}>Launch</button>
                <button className="MissionCard-Button" disabled={status === "Completed" ? true : false} onClick={() => updateMissionStatus(id, "Completed")}>Complete</button>
            </div>
        </div>
    )
}

export default MissionCard;