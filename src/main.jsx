import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {HeroUIProvider} from "@heroui/react";
import {registerSW} from 'virtual:pwa-register';

import {routers} from "@/routers/index";

import '@/common/styles/global.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeroUIProvider>
            <RouterProvider router={routers}/>
        </HeroUIProvider>
    </StrictMode>,
)

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('新版本可用，是否立即更新？')) {
            updateSW();
        }
    },
});