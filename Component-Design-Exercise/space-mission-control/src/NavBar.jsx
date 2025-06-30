import "./NavBar.css";

function NavBar({title, filterTypes, setFilterView}) {
    return (
        <div className="NavBar-Container">
            <h1>🚀 {title} 🚀</h1>
            <div className="NavBar-Buttons-Container">
                {filterTypes.map((filter) => {
                return (
                <button key={filter} className="NavBar-Button" onClick={() => setFilterView(filter)}>{filter}</button>
                )
                })}
            </div>
        </div>
    )
}

export default NavBar;