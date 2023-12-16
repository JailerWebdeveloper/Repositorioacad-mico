import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import DashboardSearch from './pages/DashboardSearch.jsx'
import Projectview from './components/Projectview.jsx'
import SucefullRegister from './shared/SuccefullRegister.jsx'
import { FiltroProvider } from "./Filtrocontext.jsx";
const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    errorElement: <h1>error</h1>,
  },
  {
    path:'/Project',
    element: <Projectview/>,
    errorElement: <h1>error</h1>,
  },
  {
    path:'/Register',
    element: <Register/>,
    errorElement: <h1>error</h1>,
  },

  {
    path:'/login',
    element: <Login/>,
    errorElement: <h1>error</h1>,
  },
  
    {
      path:'/Search',
      element: <DashboardSearch/>,
      errorElement: <h1>error</h1>,
    },
    {
      path: '/Registroexitoso',
      element: <SucefullRegister />,
      errorElement: <h1>error</h1>,
    },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FiltroProvider>
     <RouterProvider router={router}/>
     </FiltroProvider>
  </React.StrictMode>,
)
