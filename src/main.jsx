import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {HeroUIProvider} from "@heroui/react";

import {routers} from "@/routers/index";

import '@/common/styles/global.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeroUIProvider>
            <RouterProvider router={routers}/>
        </HeroUIProvider>
    </StrictMode>,
)
