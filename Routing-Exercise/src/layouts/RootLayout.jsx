import { NavLink, Outlet, useNavigate} from 'react-router-dom'
import { useHistoryContext } from '../context/HistoryContext'
import '../styles/RootLayout.css'

export default function RootLayout() {
 
    const navigate = useNavigate();
    const { goBack, canGoBack } = useHistoryContext();

    const handleBack = () => {
        const previousPath = goBack();

        if(previousPath) {
            navigate(previousPath);
        }
    }
  

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='Mars'>Mars</NavLink>
                    <NavLink to='Venus'>Venus</NavLink>
                    <NavLink to='OrionNebula'>Orion Nebula</NavLink>
                    <NavLink to='AndromedaGalaxy'>Amdromeda Galaxy</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <div className='button-wrapper'>
                <button disabled={!canGoBack} onClick={handleBack}>Go Back</button>
            </div>
        </div>
    )
}