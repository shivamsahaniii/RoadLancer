
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home  from './components/Home'
import Shipments from './components/Shipments'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ShipmentDescription from './components/ShipmentDescription'
import AdminShipments from './components/admin/AdminShipments'
import ShipmentCreate from './components/admin/ShipmentCreate'
import Bidders from './components/admin/Bidders'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/shipments',
    element: <Shipments />
  },
  {
    path: '/description/:id',
    element: <ShipmentDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  // For Admin Side
  {
    path:"/admin/shipments",
    element:<AdminShipments/>
  },
  {
    path:"/admin/shipments/create",
    element:<ShipmentCreate/>
  },
  {
    path:"/admin/shipments/:id/bidders",
    element:<Bidders/>
  },


])
function App() {


  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
