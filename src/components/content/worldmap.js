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

                <canvas width="9000" height="10200" id="worldmap-canvas" class="transform-gpu duration-500" style="position:relative; padding: 0; top: calc(0px + 50%); left: calc(0px + 50%); width: 9000px; height: 10200px; background-image: url('../../assets/img/map/worldmap-transparent.webp'); background-size: cover; opacity: 100%;">
                </canvas>

                <img src="../../img/compass-needle-pink.svg" id="worldmapNeedle" class="transform-none" style="max-width: 200px; max-height: 250px; position: absolute; top: 50%; left: 50%; z-index: 0; margin-left: -100px; margin-top: -100px;" />

                <div class="relative top-0 left-0 w-[9000px] h-[10200px]" id="other-players">
                    <img id="PropaBot" src="../../img/compass-needle-yellow.svg" class="transform-none" style="max-width: 200px; max-height: 250px; position: absolute; top: 50%; left: 50%; z-index: 0; margin-left: -100px; margin-top: -100px;" />
                </div>

            </div>
        </section>
    </>);
}