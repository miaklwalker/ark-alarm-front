import {useEffect, useState} from "@types/react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {keyCrud, userCrud} from "../../index";
import transformData from "../../modules/transformData";
import {Box, Code, Flex, Heading} from "@chakra-ui/react";
import ArkAlarmForm from "../ArkAlarmForm/arkAlarmForm";
import Joi from "joi";
import formToFirebaseAdapter from "../../modules/firebaseAdapter";
import nicknameState from "../../modules/nicknameState";
import ErrorPopup from "../ErrorPopup/errorPopup";


const formDataSchema = Joi.object({
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
    const { formState:{errors},handleSubmit} = formHook;
    let cluster = state.loaded && state.clientData && Object.keys(state.clientData.data)[0];
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
        temp.data = nicknameState(formToFirebaseAdapter(data))
        let transformedData = transformData(temp);
        await userCrud.UpdateDatabase(transformedData);
        await keyCrud.DeleteFromDatabase(sessionStorage.getItem("key"));
        sessionStorage.clear();
        setState({loaded: true, clientData: null, submitted: true})
    }
    async function handleSubmitSadPath(data){
        console.error(data.ip.message);
    }
    return (
        state.loaded &&
        <Box className="container">
            {state.loaded && !state.submitted &&
                <Box className="App" bgGradient='linear(to-l, #7928CA, #FF0080)' pb={"5%"}>
                    <Heading p={"1%"} pb={"2%"} color={"gray.100"}>Ark Alarm</Heading>
                    <Box w={"100%"} align={"center"}>
                        <Box w="55%" p={"2.5%"} borderRadius={"7px"} background={"white"}>
                            <Heading mb={"2%"}>{state.clientData?.name}'s {<br/>} Config Page</Heading>
                            <ErrorPopup messages={errors} />
                            <ArkAlarmForm
                                formHook={formHook}
                                handleSubmitToFirebase={handleSubmit(handleSubmitHappyPath,handleSubmitSadPath)}
                                userData={state.clientData.data[cluster]}
                            />
                        </Box>
                    </Box>
                </Box>
            }
            {state.submitted && <Flex
                direction={"column"}
                h={"50vh"}
                align={"center"}
                justify={"center"}
                fontSize={"48px"}
                className='submitted'>
                Thank you for submitting your config
                {<br/>}
                <Box fontSize={"24px"}>please continue back to discord and run the {<Code> !A
                    setup </Code>} command </Box>

            </Flex>}
        </Box>
    )

}
