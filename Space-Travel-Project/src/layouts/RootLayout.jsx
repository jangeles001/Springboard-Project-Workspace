import { NavLink, Outlet } from 'react-router-dom'
import '../styles/RootLayout.css'


const RootLayout = () => {
  return (
    <div className='root-layout'>
      <header>
        <nav>
          <NavLink to='/'>🌍 Home</NavLink>
          <NavLink to='Spacecrafts'>🚀 Spacecrafts</NavLink>
          <NavLink to='Planets'>🪐 Planets</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout;
