/**
 * App entry point — this is where React starts.
 * We wrap the app with Redux (state), React Router (pages), and load global styles.
 */
// Import StrictMode to help catch common bugs during development
import { StrictMode } from "react";
// Import createRoot to mount our React app into the HTML page
import { createRoot } from "react-dom/client";
// Import BrowserRouter so we can use URLs to switch between pages
import { BrowserRouter } from "react-router-dom";
// Import Provider to share the Redux store with all components
import { Provider } from "react-redux";
// Import our Redux store where app-wide state is kept
import { store } from "./redux/store";
// Import global CSS styles used across the whole site
import "./styles/index.css";
// Import the main App component that holds our page routes
import App from "./App";

// Find the div with id "root" in index.html and render our React app inside it
// StrictMode runs extra checks in development to help find problems
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap the app in Redux so all components can read and update shared state */}
    <Provider store={store}>
      {/* Wrap the app in a router so the URL controls which page shows */}
      <BrowserRouter>
        {/* Our root component that displays the current page */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
