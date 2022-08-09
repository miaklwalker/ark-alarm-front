import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {isDevelopment, isDevelopmentWrapper, keyCrud, userCrud} from "../../index";
import transformData from "../../modules/transformData";
import {Box, Code, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ArkAlarmForm from "../ArkAlarmForm/arkAlarmForm";
import Joi from "joi";
import formToFirebaseAdapter from "../../modules/firebaseAdapter";
import {makeNickName} from "../../modules/nicknameState";
import ErrorPopup from "../ErrorPopup/errorPopup";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {app} from "../../modules/firebaseCrud";

const formClusterData = Joi.object({
    server: Joi.string().min(3).max(55).required(),
    ip: Joi.string().ip({version: ['ipv4', 'ipv6']}).required(),
    game: Joi.string().required(),
    maps: Joi.array(),
    tribemates: Joi.array().items(Joi.string()),
    enemies: Joi.array().items(Joi.string()),
    mapName: Joi.string(),
    port: Joi.number(),
    tribemate: Joi.string(),
    enemy: Joi.string()
})
const formDataSchema = Joi.object().pattern(Joi.string(), formClusterData);

function SubmitScreen(){
    return (
        <Flex
        direction={"column"}
        h={"50vh"}
        align={"center"}
        justify={"center"}
        fontSize={"48px"}
        className='submitted'>
            Thank you for submitting your config
            {<br/>}
            <Box fontSize={"24px"}>
                please continue back to discord and run the {<Code> !A setup </Code>} command
            </Box>
        </Flex>)
}

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

    let clusters = state.loaded && state.clientData && Object.keys(state.clientData.data);

    async function signIn (app,token) {
        let auth = getAuth(app);
        sessionStorage.setItem("token", token);
        return signInWithCustomToken(auth,token)
    }

    async function handleSubmitHappyPath(data){
        let temp = state.clientData;
        temp.data = formToFirebaseAdapter(data)
        let transformedData = transformData(temp);
        await userCrud.UpdateDatabase(transformedData);
        await keyCrud.DeleteFromDatabase(sessionStorage.getItem("key"));
        sessionStorage.clear();
        setState({loaded: true, clientData: null, submitted: true})
    }
    async function handleSubmitSadPath(data){
        console.error(data.ip.message);
    }


    let handleAdd = () =>{
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

    }
    let handleDelete = (key) =>{
            let temp = state.clientData;
            delete temp.data[key];
            sessionStorage.setItem("userData", JSON.stringify(temp));
            window.location.reload();
    }

    let wrappedAdd = isDevelopmentWrapper(handleAdd)
    let wrappedDelete = isDevelopmentWrapper((key)=>handleDelete(key))


    return ( state.loaded &&
        <Box className="container">
            {!state.submitted && clusters &&
                <Box className="App" bgGradient='linear(to-l, #7928CA, #FF0080)' pb={"5%"}>
                    <Heading p={"1%"} pb={"2%"} color={"gray.100"}>Ark Alarm</Heading>
                    <Box w={"100%"} align={"center"}>
                        <Box w="55%" minW={"310px"} maxW={"648px"} p={"2.5%"} borderRadius={"7px"} background={"white"}>
                            <Heading noOfLines={1} mb={"2%"}>{state.clientData?.name}'s {<br/>} Config Page</Heading>
                            <ErrorPopup messages={errors} />
                            <Tabs isFitted>
                                <TabList>
                                    {clusters.map((cluster,index) => <Tab key={index}>{cluster}</Tab>)}
                                    <Tab onClick={wrappedAdd}> + </Tab>
                                </TabList>
                                <TabPanels>
                                    {clusters.map((cluster,index) => <TabPanel key={index}>
                                        <ArkAlarmForm
                                            handleDelete={wrappedDelete}
                                            clusterName={cluster}
                                            formHook={formHook}
                                            handleSubmitToFirebase={handleSubmit(handleSubmitHappyPath,handleSubmitSadPath)}
                                            userData={state.clientData.data[cluster]}
                                        />
                                        <TabPanel>PLACEHOLDER</TabPanel>
                                    </TabPanel>)}
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </Box>
            }
            {state.submitted && <SubmitScreen/>}
        </Box>
    )

}
