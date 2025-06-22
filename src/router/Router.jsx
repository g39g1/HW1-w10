import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';  
import Home from '../compunt/Home';  
import Singup from '../compunt/Singup';
import Singin from '../compunt/Singin';
import Datas from '../compunt/Datas'; 

function Layout() {
  return (
    <div>
      <Outlet />  
    </div>
  );
}

// تكوين الروترات
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },  
      { path: "Singup", element: <Singup /> },  
      { path: "Singin", element: <Singin /> },  
      { path: "datas", element: <Datas /> },  
    ]
  },
]);

function Router() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;
