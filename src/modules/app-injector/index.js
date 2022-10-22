import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./vitals.js";
export default setAppHandle = (Component) => createRoot(document.querySelector(`main#container`)).render(<Component />);
reportWebVitals();