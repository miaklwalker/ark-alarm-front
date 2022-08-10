import './App.css';
import {Box, ChakraProvider} from '@chakra-ui/react'
import Landing from "./components/landingPage/landingPage";
import FormController from "./components/formController/formController";
import bgImage from "./images/bg.png"




function App() {
    let isEditingForm = sessionStorage.getItem("key") || window.location.search.substring(1).length > 0;
    return (
        <Box
            className="App"
            backgroundImage={`url('${bgImage}')`}
            backgroundSize={"cover"}
        >
            <ChakraProvider>
                {!isEditingForm && <Landing/>}
                { isEditingForm && <FormController/>}
            </ChakraProvider>
        </Box>
    )
}


export default App;
