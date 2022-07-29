import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";

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
            <Text>maps</Text>
            <Flex align={"flex-end"}>
                <ArkAlarmInput register={register} name={"mapName"} defValue={"The Island"}/>
                <ArkAlarmInput register={register} name={"port"} defValue={"27015"}/>
                <Button onClick={handleClick}> Add </Button>
            </Flex>

            {fields.map((field,index)=>{
                return(
                    <Box key={field.id}>
                        <ArkAlarmInput noLabel register={register} name={`maps.${index}.mapName`} defValue={field['mapName']}/>
                        <ArkAlarmInput noLabel register={register} name={`maps.${index}.port`} defValue={field['port']}/>
                        <Button onClick={()=>remove(index)}>remove</Button>
                    </Box>
                )
            })}
        </>
    )
}
