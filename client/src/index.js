import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client in React 18
import './styles/global.css'; // Import global styles
import App from './App'; // Import the main App component
import { AuthContextProvider } from './context/AuthContext'; // Import AuthContextProvider for authentication context

// Create the root element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped with StrictMode and AuthContextProvider
root.render(
  <React.StrictMode>
    <AuthContextProvider> {/* Providing authentication context for the whole app */}
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
