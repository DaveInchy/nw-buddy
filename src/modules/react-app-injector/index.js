import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./vitals.js";
const setAppHandle = (Component) => createRoot(document.querySelector(`main#container`)).render(<Component />);
reportWebVitals();
export default setAppHandle;