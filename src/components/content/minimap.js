export default function DesktopComponent({ props })
{
    return (<>
        <div id="minimap" style="display: none; ">

            <div id="minimap-title" style="position: absolute; bottom: calc(20px + 35vh + 15vw); right: 50px; width: 15vw; height: auto; text-align: center; z-index: 10;">
                <h1 style="font-size: 52px; line-height: 22px; padding: 0px; font-weight: extrabold;"><span id="minimap-current-time" class="bg-gradient-to-tr from-amber-500 to-amber-700 text-transparent text-6xl bg-clip-text font-extrabold text-center uppercase text-clip text-shadow shadow-amber-400"></span></h1>
            </div>

            <div id="minimap-context" class="shadow-slate-700 shadow-md rounded-xs border-2 border-slate-700 bg-slate-800" style="width: 15vw; height: 15vw; position: absolute; bottom: 35vh; right: 50px; z-index: 5; overflow: hidden; scroll-behavior: smooth;">

                <canvas width="9000" height="10200" id="minimap-canvas" class="transform-gpu duration-500" style="position:relative; padding: 0; top: calc(0px + 50%); left: calc(0px + 50%); width: 9000px; height: 10200px; background-image: url('../../img/map/worldmap-transparent.webp'); background-size: cover; opacity: 100%; z-index: 0;">
                </canvas>

                <img src="../../img/compass-needle-pink.svg" id="compassNeedle" class="transform-none" style="max-width: 200px; max-height: 250px; position: absolute; top: 50%; left: 50%; z-index: 0; margin-left: -100px; margin-top: -100px;" />

                <div class="w-[9000px] h-[10200px]" id="other-players">

                </div>

            </div>

            <div id="minimap-info" style="position: absolute; top: 50px; left: 50px; width: 25vw; height: fit; z-index: 10;" class="shadow-slate-700 shadow-md p-2 clip rounded-xs border-2 bg-slate-800 border-slate-600">

                <p style="display: inline; float: left;" class="font-normal text-slate-400">🔍 OUT  <span class="w-2 inline-block"></span><span id="zoomOut-hotkey" class="font-bold text-rose-600 bg-slate-600">ALT</span> </p>
                <p style="display: inline; float: right;">
                    <span id="minimap-position" class="font-bold text-rose-500">0, 0</span> 🧭
                </p>
                <p style="display: inline; float: left;" class="font-normal text-slate-400">🔎 IN <span class="w-4 inline-block"></span><span id="zoomIn-hotkey" class="font-bold text-rose-600 bg-slate-600">ALT</span></p>
                <p style="display: inline; float: right;" class="font-normal text-slate-400">Zoom <span id="zoom-value" class="font-bold text-rose-500">1</span>x ⚙️</p>

            </div>

        </div>
    </>);
}