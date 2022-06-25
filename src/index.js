import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {FirebaseCrud, KeyCrud} from "./modules/firebaseCrud";

export const userCrud = new FirebaseCrud("Users");
export const keyCrud = new KeyCrud("Keys");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
);

