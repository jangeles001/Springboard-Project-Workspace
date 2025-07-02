import "./Circle.css"

function Circle({color, coords, idx}){
    return (
    <div className="Circle" style={{
            backgroundColor: color,
            position: "absolute",
            top: `${coords[1]}%`,
            left: `${coords[0]}%`,
        }}>
        {idx + 1}
    </div>
    )
}

export default Circle;