import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
// Hazır HTML yalnız üretildiği adreste devralınır (404.html başka adreslerde sunulur → sıfırdan çiz)
const ssrPath = root.dataset.ssrPath;
const here = window.location.pathname.replace(/\/$/, "") || "/";
if (root.firstElementChild && ssrPath === here) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
