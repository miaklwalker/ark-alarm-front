import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {isDevelopmentWrapper, keyCrud, userCrud} from "../../index";
import {Box, Heading} from "@chakra-ui/react";
import ErrorPopup from "../ErrorPopup/errorPopup";
import {app, signIn} from "../../modules/firebaseCrud";
import SubmitScreen from "../submitScreen/submitScreen";
import formDataSchema from "../../schema/FormData.Schema";
import submitHandlerFactory from "../../modules/submitHandlerFactory";
import TabArea from "../tabArea/tabArea";
import tabControllerFactory from "../../modules/tabcontrollerFactory";





function sessionStorageHandlerFactory (key) {
    return {
        get: () => sessionStorage.getItem(key),
        set: (value) => sessionStorage.setItem(key, value)
    }
}



export default function FormController() {
    let [state, setState] = useState({
        loaded: false,
        clientData: {},
        submitted: false,
    });
    const formHook = useForm({
        resolver: joiResolver(formDataSchema),
    });
    const { formState:{errors},handleSubmit} = formHook;
    const {handleSubmitHappyPath, handleSubmitSadPath} = submitHandlerFactory(setState,state);
    const {handleAdd,handleDelete} = tabControllerFactory(state);
    let clusters = state.loaded && state.clientData && Object.keys(state.clientData.data);

    let wrappedAdd = isDevelopmentWrapper(handleAdd)
    let wrappedDelete = isDevelopmentWrapper((key)=>handleDelete(key))

    useEffect( () => {
        (async () => {
            // Creating session storage handlers for ease-of-use.
            let keyStorage = sessionStorageHandlerFactory("key");
            let userStorage = sessionStorageHandlerFactory("userData");
            // we try to get userData from session storage.
            let previousSession = userStorage.get();
            let key = window.location.search.substring(1)
            keyStorage.set(key);
            // if the user has a previous session
            if (previousSession) {
                let {token} = await keyCrud.getFromDatabase(key);
                await signIn(app, token);
                setState({loaded: true, clientData: JSON.parse(previousSession), submitted: false});
            } else {
                if(key) {
                    let {name, token} = await keyCrud.getFromDatabase(key);
                    await signIn(app, token);
                    let userData = await userCrud.getFromDatabase(name);
                    userStorage.set(JSON.stringify(userData));
                    setState({loaded: true, clientData: userData, submitted: false});
                }else {
                    setState({loaded: true, submitted: false,clientData: null});
                }
            }
        })();
    }, []);



    return ( state.loaded &&
        <Box className="container">
            {!state.submitted && clusters &&
                <Box className="App" bgGradient='linear(to-l, #7928CA, #FF0080)' pb={"5%"}>
                    <Heading p={"1%"} pb={"2%"} color={"gray.100"}>Ark Alarm</Heading>
                    <Box w={"100%"} align={"center"}>
                        <Box w="55%" minW={"310px"} maxW={"648px"} p={"2.5%"} borderRadius={"7px"} background={"white"}>
                            <Heading noOfLines={1} mb={"2%"}>{state.clientData?.name}'s {<br/>} Config Page</Heading>
                            <ErrorPopup messages={errors} />
                            <TabArea
                            clusters={clusters}
                            handleDelete={wrappedDelete}
                            handleAdd={wrappedAdd}
                            formHook={formHook}
                            handleSubmit={handleSubmit(handleSubmitHappyPath,handleSubmitSadPath)}
                            state={state}
                            />
                        </Box>
                    </Box>
                </Box>
            }
            {state.submitted && <SubmitScreen/>}
        </Box>
    )

}
