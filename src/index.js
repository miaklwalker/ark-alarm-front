import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createServer} from "miragejs";

let database = {
    keys: {
        423334: {name: "Ark Alarm Test Server"}
    },
    serverData: {
        "Ark": {
            "BeardedGamers": {
                "server": "Bearded Gamer",
                "ip": "24.128.67.254",
                "game": "arkse",
                "maps": {
                    "The Island": "27019",
                    "Aberation": "27023",
                    "The Center": "27017",
                    "Ragnorak": "27015",
                    "Valguero": "27021",
                    "Crystal Isle": "27033",
                    "Extinction": "27025",
                    "Genesis": "27029",
                    "Gen2": "27031",
                    "lostisland": "27047"
                },
                "enemies": [],
                "tribemates": []
            }
        },
        "Ark Unknown-BG": {
            "bg": {
                "server": "Bearded Gamer",
                "ip": "24.128.67.254",
                "game": "arkse",
                "maps": {
                    "The Island": "27019",
                    "Aberation": "27023",
                    "The Center": "27017",
                    "Ragnorak": "27015",
                    "Valguero": "27021",
                    "Crystal Isle": "27033",
                    "Extinction": "27025",
                    "Genesis": "27029",
                    "Gen2": "27031"
                },
                "enemies": [],
                "tribemates": [
                    "Miso",
                    "TooMufasa",
                    "UltraInstinctAzn",
                    "E10"
                ]
            }
        },
        "Red Cup Mafia": {
            "beardedgamers": {
                "server": "Bearded Gamer",
                "ip": "24.128.67.254",
                "game": "arkse",
                "maps": {
                    "The Island": "27015",
                    "Aberation": "27017",
                    "The Center": "27019",
                    "Ragnorak": "27021",
                    "Valguero": "27023",
                    "Crystal Isle": "27025",
                    "Extinction": "27027",
                    "Genesis": "27029",
                    "Gen2": "27033",
                    "lostisle": "27031",
                    "anotherOne": "27047"
                },
                "enemies": [],
                "tribemates": []
            }
        },
        "Ark Alarm Test Server": {
            "BeardedGamers": {
                "server": "Bearded Gamer",
                "ip": "24.128.67.254",
                "game": "arkse",
                "maps": {
                    "The Island": "27019",
                    "Aberation": "27023",
                    "The Center": "27017",
                    "Ragnorak": "27015",
                    "Valguero": "27021",
                    "Crystal Isle": "27033",
                    "Extinction": "27025",
                    "Genesis": "27029",
                    "Gen2": "27031",
                    "lostisland": "27047"
                },
                "enemies": ["miakl"],
                "tribemates": ["123"]
            }
        }
    },
}

export let server = createServer({
    routes() {
        this.get("/:id", (schema, req) => {
            let params = req.params;
            let id = params.id;
            let name = database.keys[id].name;
            let data = database.serverData[name]
            //delete database.keys[id];
            //console.log(database)
            return {data,name}
        })
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
