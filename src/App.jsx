/**
 * Root app component — simply renders all page routes.
 * Think of this as the shell; the real pages live in AppRoutes.
 */
// Import the component that defines all our page URLs and which page to show
import AppRoutes from "./routes/AppRoutes";

// Define the main App component as a simple function
const App = () => {
  // Return the routing component that handles page navigation
  return <AppRoutes />;
};

// Export App so main.jsx can use it as the root component
export default App;
