import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/signup';
import Login from './pages/login';
import OnBoarding from './pages/on_boarding';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./error-page";
import Home from './pages/homepage';
import NotFound from './pages/404';
import Mission from './pages/missions';
import Applications from './pages/applications';
import Applicants from './pages/applicants';
import Profile from './pages/profile';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/on-boarding",
    element: <OnBoarding />,
  },
  {
    path: "/missions",
    element: <Mission />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/applicants",
    element: <Applicants />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
