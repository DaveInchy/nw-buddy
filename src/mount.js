// React imports
import React from "react";
import { createRoot } from "react-dom/client";

// Component imports
import reportWebVitals from "./modules/app-injector/vitals";

// Create the root element
const element = document.querySelector("main#container");
const app = (_Component) => createRoot(element).render(<_Component/>);

reportWebVitals();

export default app