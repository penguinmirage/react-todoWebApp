import React from "react";
import App from "./components/app/app";
import { createRoot } from "react-dom/client";
const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
console.log("Hello World, this program is working...");
root.render(<App />);
