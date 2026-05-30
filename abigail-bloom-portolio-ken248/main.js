import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import "./style.css";
import App from "./src/App.jsx";
import Experience from "./Experience/Experience.js";

const root = createRoot(document.getElementById("root"));

flushSync(() => {
    root.render(React.createElement(App));
});

const canvas = document.querySelector(".experience-canvas");

if (canvas) {
    new Experience(canvas);
}
