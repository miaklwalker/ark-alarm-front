import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseCrud, KeyCrud} from "./modules/firebaseCrud";

export const userCrud = new FirebaseCrud("Users");
export const keyCrud = new KeyCrud("Keys");
// is production or development
export const isProduction = process.env.NODE_ENV === 'production';
// url parameters

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
);

