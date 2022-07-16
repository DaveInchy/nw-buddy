// React imports
import React from "react";
import { createRoot } from "react-dom/client";

// Component imports
import reportWebVitals from "./vitals.js";

import Navigation from "../components/sections/navigation.js";

class Routing extends React.Component {
    render = () => {
        return <Navigation />;
    }
}

// Create the root element
const element = document.getElementById("sidebar");
export default createRoot(element).render(<Routing />);

reportWebVitals();