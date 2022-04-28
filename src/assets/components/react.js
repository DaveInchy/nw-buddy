// React imports
import React from "react";
import { createRoot } from "react-dom/client";

// Component imports
import reportWebVitals from "./vitals";
import DesktopContent from "./desktop";

// TailwindCSS
import '../tailwind.css';

// Create the root element
const element = document.getElementById("root");
export default createRoot(element).render(
    <DesktopContent />
);

reportWebVitals();