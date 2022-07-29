import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import ArkAlarmMapSection from "../arkAlarmMapSection/arkAlarmMapSection";
import ArkAlarmPersonalList from "../arkAlarmPersonalList/arkAlarmPersonalList";
import {Button, Flex} from "@chakra-ui/react";
import Spacer from "../Spacer";


export default function ArkAlarmForm({userData, formHook, handleSubmitToFirebase}) {
    const {register} = formHook;
    return (
        userData &&
        <form onSubmit={handleSubmitToFirebase}>
            <ArkAlarmInput register={register} name={"server"} defValue={userData.server}/>
            <Spacer/>
            <Flex justify={"center"}>
                <ArkAlarmInput style={{marginRight:"5%"}} register={register} name={"ip"} defValue={userData.ip}/>
                <ArkAlarmInput register={register} name={"game"} defValue={userData.game}/>
            </Flex>
            <Spacer/>
            <ArkAlarmMapSection defValues={userData.maps} {...formHook}/>
            <Spacer/>
            <ArkAlarmPersonalList defValues={userData.tribemates} itemName={"tribemate"}
                                  groupName={"tribemates"}{...formHook}/>
            <ArkAlarmPersonalList defValues={userData.enemies} itemName={"enemy"} groupName={"enemies"}{...formHook}/>
            <Button as={"button"} colorScheme={"orange"} mt={"4%"} type="submit">Save To Server</Button>
        </form>
    )
}
