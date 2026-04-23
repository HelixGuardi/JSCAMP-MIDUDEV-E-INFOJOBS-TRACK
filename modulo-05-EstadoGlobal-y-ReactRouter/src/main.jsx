import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FavoritesProvider } from "./context/FavContext.jsx";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/404framework.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </AuthProvider>
  </BrowserRouter>,
);
