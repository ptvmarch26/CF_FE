import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { PopupProvider } from "./context/PopupContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { MenuProvider } from "./context/MenuContext.jsx";
import { InvoiceProvider } from "./context/InvoiceContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <PopupProvider>
          <AuthProvider>
            <UserProvider>
              <MenuProvider>
                <InvoiceProvider>
                  <App />
                </InvoiceProvider>
              </MenuProvider>
            </UserProvider>
          </AuthProvider>
        </PopupProvider>
      </LoadingProvider>
    </ThemeProvider>
  </StrictMode>
);
