import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./context/User.Context.jsx";
import { Toaster } from "react-hot-toast"; 
const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <App />
        <Toaster />
      </Suspense>
    </UserProvider>
  </StrictMode>
);
