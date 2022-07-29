import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import Landing from "./components/landingPage/landingPage";
import FormController from "./components/formController/formController";


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
