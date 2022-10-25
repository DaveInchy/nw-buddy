// React imports
import React, { useRef, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";

import Navigation from "../sections/sidebar";

export default function WorldMap({props, children})
{

    const elemSidebar = useRef(null);

    useLayoutEffect(() => {
        // Mount the Navigation to the sidebar element.
        createRoot(elemSidebar || document.getElementById('sidebar')).render(<Navigation />);
    }, [])

    return (<>
        <section ref={elemSidebar} id="sidebar" class="shadow-slate-700 shadow-2xl absolute top-0 right-0 w-[35vw] h-screen z-20 border-l-2 bg-slate-700 border-slate-600" style="display:none"></section>

        <section id="worldmap" class="shadow-slate-700 shadow-2xl absolute top-0 left-0 w-[65vw] h-screen z-10 border-l-2 bg-slate-800 border-slate-600" style="display:none">
            <div id="worldmap-context" class="shadow-slate-700 border-2 border-slate-700 bg-slate-800" style="width: 100%; height: 100vh; position: absolute; left: 0px; top: 0px; z-index: 5; scroll-behavior: smooth;">



            </div>
        </section>
    </>);
}