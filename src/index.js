import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseCrud, KeyCrud} from "./modules/firebaseCrud";

export const userCrud = new FirebaseCrud("Users");
export const keyCrud = new KeyCrud("Keys");
// is production or development
export const isDevelopment = false //process.env.NODE_ENV === 'development';
console.log(isDevelopment);
// url parameters
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
            <App/>
        </React.StrictMode>
);

