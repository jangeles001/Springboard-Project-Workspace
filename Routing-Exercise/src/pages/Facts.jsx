import { useOutletContext } from "react-router-dom"
import '../styles/Facts.css'

export default function Facts() {

    const { resource } = useOutletContext();

    return (
        <div className="facts">
            <ul>
                {resource?.Facts?.map((fact, index) => (
                    <li key={index}>{fact}</li>
                ))}
            </ul>
        </div>
    )
}

