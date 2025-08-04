import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import styles from "./App.module.css";

//layouts
import RootLayout from './layouts/RootLayout.jsx'

//pages
import Home from './pages/Home.jsx'
import Spacecrafts from './pages/Spacecrafts.jsx';
import Planets from './features/planets/Planets.jsx';
import NotFound from './pages/NotFound.jsx'
import NotFoundError from './pages/NotFoundError.jsx';

//feature
import SpacecraftForm from './features/spacecraft/SpacecraftForm.jsx'
import Spacecraft from './features/spacecraft/Spacecraft.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} > 
      <Route index element={<Home />} />
      <Route path='Spacecrafts' element={<Spacecrafts />}/>
      <Route path='Planets' element={<Planets />} />
      <Route path="/form" element={<SpacecraftForm />} />
      <Route path="/spacecrafts/:id" 
      element={<Spacecraft />}
      errorElement={<NotFoundError />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App ()
{
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
