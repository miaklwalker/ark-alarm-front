import formToFirebaseAdapter from "./firebaseAdapter";
import {keyCrud, userCrud} from "../index";
import transformData from "./transformData";

export default function submitHandlerFactory (setState,state){
    return {
        handleSubmitHappyPath: async (data)=>{
            let temp = state.clientData;
            temp.data = formToFirebaseAdapter(data);
            await userCrud.UpdateDatabase(transformData(temp));
            await keyCrud.DeleteFromDatabase(sessionStorage.getItem("key"));
            sessionStorage.clear();
            setState({loaded: true, clientData: null, submitted: true})

        },
        handleSubmitSadPath: async (data)=>{
            Object.keys(data)
                .forEach(key=>{
                    let cluster = data[key];
                    Object.keys(cluster)
                        .forEach(err=>{
                           // console.error(`Page: ${key} has an error with the following ${err}`)
                           // console.error(cluster[err].message)
                        })
                })
            console.error(data)
        }
    }
}
