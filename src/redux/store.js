// Import Redux Toolkit helper that creates the global store
import { configureStore } from "@reduxjs/toolkit";

// Create and export the Redux store used by the app
export const store = configureStore({
  // Reducers will be added here as the app grows; empty for now
  reducer: {},
});
