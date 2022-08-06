import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {isProduction, keyCrud, userCrud} from "../../index";
import transformData from "../../modules/transformData";
import {Box, Code, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ArkAlarmForm from "../ArkAlarmForm/arkAlarmForm";
import Joi from "joi";
import formToFirebaseAdapter from "../../modules/firebaseAdapter";
import {makeNickName} from "../../modules/nicknameState";
import ErrorPopup from "../ErrorPopup/errorPopup";

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

export default function FormController() {
    let [state, setState] = useState({
        loaded: false,
        clientData: {},
        submitted: false,
    });
    sessionStorage.setItem("key", window.location.search.substring(1));
    const formHook = useForm({
        resolver: joiResolver(formDataSchema),
    });
    const { formState:{errors},handleSubmit,watch} = formHook;
    console.log(formToFirebaseAdapter(watch()));

    let clusters = state.loaded && state.clientData && Object.keys(state.clientData.data);
    useEffect(() => {
        let hasSessionStorage = sessionStorage.getItem("userData");
        if (hasSessionStorage) {
            setState({loaded: true, clientData: JSON.parse(hasSessionStorage), submitted: false});
        } else {
            let key = sessionStorage.getItem("key");
            if (key) {
                keyCrud.getFromDatabase(key)
                    .then(data => {
                        if (data) {
                            userCrud
                                .getFromDatabase(data.name)
                                .then(res => {
                                    sessionStorage.setItem("userData", JSON.stringify(res))
                                    setState({loaded: true, clientData: res, submitted: false});
                                })
                        } else {
                            setState({loaded: true, clientData: null, submitted: true})
                        }

                    })
            }
        }
    }, []);

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

    function handleAdd(){
        if(isProduction) {
            let prompt = window.prompt("Enter a nickname for this server");
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
        }else{
            alert("This feature is not yet available, Or is being developed for premium users");
        }
    }

    return (
        state.loaded &&
        <Box className="container">
            {!state.submitted && clusters &&
                <Box className="App" bgGradient='linear(to-l, #7928CA, #FF0080)' pb={"5%"}>
                    <Heading p={"1%"} pb={"2%"} color={"gray.100"}>Ark Alarm</Heading>
                    <Box w={"100%"} align={"center"}>
                        <Box w="55%" minW={"310px"} maxW={"648px"} p={"2.5%"} borderRadius={"7px"} background={"white"}>
                            <Heading noOfLines={1} mb={"2%"}>{state.clientData?.name}'s {<br/>} Config Page</Heading>
                            <ErrorPopup messages={errors} />
                            <Tabs>
                                <TabList>
                                    {clusters.map(cluster => <Tab>{cluster}</Tab>)}
                                    <Tab onClick={handleAdd}> + </Tab>
                                </TabList>
                                <TabPanels>
                                    {clusters.map(cluster => <TabPanel>
                                        <ArkAlarmForm
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
