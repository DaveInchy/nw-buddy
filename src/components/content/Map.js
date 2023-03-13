import React, { Component, useEffect, useState } from "react";
import Vector2 from "../../vector2";
import World3 from "../elements/map/worldmap.l3";
import World4 from "../elements/map/worldmap.l4";
import World5 from "../elements/map/worldmap.l5";
import World6 from "../elements/map/worldmap.l6";
import World7 from "../elements/map/worldmap.l7";
import { logError, logMessage } from "../../debug";

function WorldComponent() {

  const tilemap = useRef(undefined);
  const canvas = useRef(undefined);
  const container = useRef(undefined);
  const wrapper = useRef(undefined);
  const map = useRef(undefined);

  const [Elements, setElements] = useState([]);

  const Selection = 1;
  const ScaleFactors = [1, 1, 1, 1, 2];
  const FromToLayer = [3, 4, 5, 6, 7];
  const CurrentLayer = () => FromToLayer[FromToLayer.length - Selection];
  const CurrentScale = () => ScaleFactors[ScaleFactors.length - Selection];

  useEffect(() => {

    var worldLayers = new Array(World3, World4, World5, World6, World7);
    var layerActive = new Array(false,  false,  false,  true,   false);

    const getWorldLayers = () =>
      worldLayers.map((Layer, index, array) => {
        var a = layerActive[index];
        if (a === false) return <div className="hidden"></div>;
        return <Layer props={{ scale: ScaleFactors[index] }} />;
      });

    setElements(getWorldLayers());
  }, []);

  return (
      <div ref={container} id="minimap" className="w-full h-full overflow-hidden" style={{"margin-left": "-50px"}}>

          <div ref={wrapper} id="minimap-context" className="rounded-full shadow-transparent border-0 border-stone-900 overflow-hidden" style={{width: "320px", height: "320px", position: "absolute", bottom: "400px", right: "50px", zIndex: "0", scrollBehavior: "smooth"}}>
              <canvas ref={canvas} id="minimap-canvas" className="transform-gpu duration-500" style={{ position: "absolute", padding: "0", top: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "4", }} width="14336" height="14336">

              </canvas>

              <div ref={tilemap} id="minimap-tilemap" className="transform-gpu duration-500" style={{ backgroundColor: "#0aF", position: "absolute", padding: "0", bottom: "calc(0px + 50%)", left: "calc(0px + 50%)", width: "14336px", height: "14336px", zIndex: "3", }}>
                  {Elements}
              </div>

              <img id="compassNeedle" src="../../img/compass-needle-pink.svg" className="transform-gpu transition-transform" style={{ maxWidth: "200px", maxHeight: "250px", position: "absolute", top: "50%", left: "50%", zIndex: "5", marginLeft: "-100px", marginTop: "-100px" }} />
          </div>

      </div>
  );
}
export default WorldComponent;
