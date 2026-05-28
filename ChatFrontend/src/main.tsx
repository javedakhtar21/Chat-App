import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./components/toast";
  
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../public/css/styles.css";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PrimeReactProvider>
  </StrictMode>
);
