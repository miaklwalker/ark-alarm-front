import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseCrud, KeyCrud} from "./modules/firebaseCrud";
import {ThemeProvider} from "./components/darkModeProvider/darkModeProvider";

export const userCrud = new FirebaseCrud("Users");
export const keyCrud = new KeyCrud("Keys");
// is production or development
export const isDevelopment = process.env.NODE_ENV === 'development';
export function isDevelopmentWrapper(feature){
    return (...args)=> {
        if (isDevelopment) {
            feature(...args)
        } else {
            alert("This feature is not yet available, Or is for premium users");
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
           <ThemeProvider>
            <App/>
           </ThemeProvider>
        </React.StrictMode>
);

