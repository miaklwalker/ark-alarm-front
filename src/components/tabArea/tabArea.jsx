import {Button, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ArkAlarmForm from "../ArkAlarmForm/arkAlarmForm";

export default function TabArea ({clusters,handleDelete,handleAdd,formHook,handleSubmit,state}){
    return (
        <Tabs isFitted>
            <TabList>
                {clusters.map((cluster,index) => <Tab key={index}>{cluster}</Tab>)}
                <Tab> + </Tab>
            </TabList>
            <TabPanels>
                {clusters.map((cluster,index) => <TabPanel key={index}>
                    <ArkAlarmForm
                        handleDelete={handleDelete}
                        clusterName={cluster}
                        formHook={formHook}
                        handleSubmitToFirebase={handleSubmit}
                        userData={state.clientData.data[cluster]}
                    />
                </TabPanel>)}
                <TabPanel h={"68vh"}>
                    <Button size={"lg"} mt={"45%"} colorScheme={"blue"} onClick={handleAdd}>Create new cluster</Button>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
