import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import ArkAlarmMapSection from "../arkAlarmMapSection/arkAlarmMapSection";
import ArkAlarmPersonalList from "../arkAlarmPersonalList/arkAlarmPersonalList";
import {Button, Flex} from "@chakra-ui/react";
import Spacer from "../Spacer";


export default function ArkAlarmForm({userData, formHook, handleSubmitToFirebase,clusterName,handleDelete}) {
    const {register} = formHook;
    return (
        userData &&
        <form onSubmit={handleSubmitToFirebase}>
            <ArkAlarmInput register={register} name={`${clusterName}.server`} defValue={userData.server}/>
            <Spacer size={"1px"}/>
            <Flex justify={"center"}>
                <ArkAlarmInput style={{marginRight:"5%"}} register={register} name={`${clusterName}.ip`} defValue={userData.ip}/>
                <ArkAlarmInput register={register} name={`${clusterName}.game`} defValue={userData.game}/>
            </Flex>
            <Spacer size={"2px"}/>
            <ArkAlarmMapSection defValues={userData.maps} clusterName={clusterName} {...formHook}/>
            <Spacer size={"2px"}/>
            <ArkAlarmPersonalList defValues={userData.tribemates}
                                  itemName={"tribemate"}
                                  groupName={"tribemates"}
                                  clusterName={clusterName}
                                  {...formHook}/>
            <ArkAlarmPersonalList defValues={userData.enemies}
                                  itemName={"enemy"}
                                  groupName={"enemies"}
                                  clusterName={clusterName}
                                  {...formHook}/>
            <Button as={"button"} colorScheme={"orange"} mt={"4%"} type="submit">Save To Server</Button>
            <Button as={"button"} colorScheme={"red"} mt={"4%"} ml={"3%"} onClick={()=>handleDelete(clusterName)}>Remove Cluster</Button>
        </form>
    )
}
