import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { ClerkSetupNotice } from "./components/ClerkSetupNotice";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// If no key is provided, show setup instructions
if (!PUBLISHABLE_KEY) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ClerkSetupNotice />
    </StrictMode>
  );
} else {
  // Normal app with Clerk
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
      >
        <App />
      </ClerkProvider>
    </StrictMode>
  );
}