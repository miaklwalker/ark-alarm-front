import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import { Button, Flex, Heading} from "@chakra-ui/react";
import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import Spacer from "../Spacer";

export default function ArkAlarmMapSection({control,register,getValues,defValues={},resetField}){
    const {fields,append,remove} = useFieldArray({name:'maps', control});
    useEffect(()=>{
        for(let [mapName,port] of Object.entries(defValues)){
            append({mapName,port})
        }
         return ()=>{remove()}
    },[append, defValues,remove])

    function handleClick(){
        let mapName = getValues("mapName");
        let port = getValues("port");
        let valueToAppend = {mapName,port}
        append(valueToAppend);
        resetField("mapName",{defaultValue:"The Island"});
        resetField("port",{defaultValue:"27015"});
    }

    return(
        <>
            <Heading size={"md"}>Add new maps</Heading>
            <Flex justify={"space-around"} align={"flex-end"}>
                <ArkAlarmInput register={register} name={"mapName"} defValue={"The Island"}/>
                <ArkAlarmInput register={register} name={"port"} defValue={"27015"}/>
                <Button colorScheme={"green"} onClick={handleClick}> Add </Button>
            </Flex>
            <Spacer/>
            {fields.map((field,index)=>{
                return(
                    <Flex justify={"space-around"} m={"2% 0"} key={field.id}>
                        <ArkAlarmInput noLabel register={register} name={`maps.${index}.mapName`} defValue={field['mapName']}/>
                        <ArkAlarmInput noLabel register={register} name={`maps.${index}.port`} defValue={field['port']}/>
                        <Button colorScheme={"red"} onClick={()=>remove(index)}>remove</Button>
                    </Flex>
                )
            })}
        </>
    )
}
