import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'; // ✅ Redux Provider
import store from './redux/store'; // ✅ Path to your Redux store

const clientId = "533096667012-29sb9vo0mhcamnf7000tp9qvs69727np.apps.googleusercontent.com"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Redux store provider */}
      <GoogleOAuthProvider clientId={clientId}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
