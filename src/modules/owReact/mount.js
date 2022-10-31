import React from "react";
import { createRoot } from "react-dom/client";
import WebVitals from "./vitals.js";

export const mountApp = (Component) => createRoot(document.querySelector(`main#container`)).render(<Component/>);
export const mountComponent = (Component, QuerySelector) => createRoot(document.querySelector(`${QuerySelector}`)).render(<Component/>);
export const reportWebVitals = () => WebVitals();