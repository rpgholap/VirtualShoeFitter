import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Polyfill for MediaPipe in browsers that don't support it natively
if (!navigator.mediaDevices) {
  console.warn("MediaDevices API not supported. AR features might not work.");
}

createRoot(document.getElementById("root")!).render(<App />);
