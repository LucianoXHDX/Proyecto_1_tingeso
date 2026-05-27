import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from "./services/keycloak.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{
                onLoad: 'check-sso',
                checkLoginIframe: false,
                pkceMethod: false,
                useNonce: false,
                enableLogging: true,
            }}
            onEvent={(event, error) => {
                console.log('KC event:', event, error);
            }}
            onTokens={(tokens) => {
                console.log('KC tokens:', tokens);
            }}
        >
            <App />
        </ReactKeycloakProvider>
    </React.StrictMode>
);