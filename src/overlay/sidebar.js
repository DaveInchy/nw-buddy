// React imports
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component imports
import reportWebVitals from "./vitals.js";

import Navigation from "../components/sections/navigation.js";

class Routing extends React.Component {
    render() {
        return <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/overlay.html" element={<Navigation />} />
                </Routes>
            </Router>
        </React.StrictMode>;
    }
}

// Create the root element
const element = document.getElementById("sidebar");
export default createRoot(element).render(<Routing />);

reportWebVitals();