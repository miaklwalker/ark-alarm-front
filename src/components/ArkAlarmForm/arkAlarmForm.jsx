import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import ArkAlarmMapSection from "../arkAlarmMapSection/arkAlarmMapSection";
import ArkAlarmPersonalList from "../arkAlarmPersonalList/arkAlarmPersonalList";
import {Button, Flex} from "@chakra-ui/react";
import Spacer from "../Spacer";


export default function ArkAlarmForm({userData, formHook, handleSubmitToFirebase,clusterName}) {
    const {register} = formHook;
    return (
        userData &&
        <form onSubmit={handleSubmitToFirebase}>
            <ArkAlarmInput register={register} name={`${clusterName}.server`} defValue={userData.server}/>
            <Spacer/>
            <Flex justify={"center"}>
                <ArkAlarmInput style={{marginRight:"5%"}} register={register} name={`${clusterName}.ip`} defValue={userData.ip}/>
                <ArkAlarmInput register={register} name={`${clusterName}.game`} defValue={userData.game}/>
            </Flex>
            <Spacer/>
            <ArkAlarmMapSection defValues={userData.maps} clusterName={clusterName} {...formHook}/>
            <Spacer/>
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
        </form>
    )
}
