import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './styles/App.css'

//Loaders
import { FactsLoader } from './loaders/FactsLoader.jsx';

//Pages
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import Facts from './pages/Facts.jsx'

//layout
import RootLayout from './layouts/RootLayout.jsx'
import FactsLayout from './layouts/FactsLayout.jsx'

//Context Providers
import { HistoryProvider } from './context/HistoryProvider.jsx'
import NotFoundError from './pages/NotFoundError.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<HistoryProvider><RootLayout /></HistoryProvider>}>
        <Route index element={<Home />} />
        <Route path=":id"
        element={<FactsLayout/> }
        loader={FactsLoader} 
        errorElement={<NotFoundError/> }> 
          <Route index element={<Facts />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
