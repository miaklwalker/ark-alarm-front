import {makeNickName} from "./nicknameState";

export default function tabControllerFactory(state){
    return {
        handleAdd: ()=>{
            let prompt = window.prompt("Enter a name for this server");
            if (prompt) {
                let temp = state.clientData;
                temp.data[makeNickName(prompt)] = {
                    server: "Server Name",
                    ip: "000.000.000.000",
                    game: "arkse",
                    maps: [],
                    tribemates: [],
                    enemies: [],
                    mapName: "",
                    port: "",
                    tribemate: "",
                    enemy: ""
                };
                sessionStorage.setItem("userData", JSON.stringify(temp));
                // reload the page
                window.location.reload();
            }
        },
        handleDelete: (key)=>{
            let temp = state.clientData;
            delete temp.data[key];
            sessionStorage.setItem("userData", JSON.stringify(temp));
            window.location.reload();
        }
    }
}
