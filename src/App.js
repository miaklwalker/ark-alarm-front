import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Landing from "./components/landingPage/landingPage";
import FormController from "./components/formController/formController";

//** ** ** ** ** //
//     TODOS     //
//** ** ** ** ** //
// done = ** ___ **
// ** 1. ADD THE ABILITY FOR A SECOND CLUSTER **
//    1.A - ONE POSSIBLE APPROACH IS ONE "FORM HOOK" PER CLUSTER
//  **  1.B - A SECOND POSSIBLE APPROACH IS ONE MASTER "FORM HOOK" USING THE CLUSTER NICKNAME AS A KEY **

//TODO 2. ADD SERVER LEVEL AUTHENTICATION
//    2.A - WE CAN EASILY CREATE THE TOKEN ON THE SERVER AND APPEND IT TO THE FORM LINK,
//          WE WOULD THEN JUST PASS THAT TOKEN ON TO FIREBASE



function App() {
    let isEditingForm = sessionStorage.getItem("key") || window.location.search.substring(1).length > 0;
    return (
        <div className="App">
            <ChakraProvider>
                {!isEditingForm && <Landing/>}
                { isEditingForm && <FormController/>}
            </ChakraProvider>
        </div>
    )
}


export default App;
