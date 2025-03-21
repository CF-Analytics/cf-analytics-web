import {createBrowserRouter} from "react-router-dom";
import React from "react";

const HomePage = React.lazy(() => import('@/pages/home'));

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    }
]);