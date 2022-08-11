import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import { Button, Flex, Heading} from "@chakra-ui/react";
import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import Spacer from "../Spacer";

export default function ArkAlarmMapSection({control,register,getValues,defValues={},resetField,clusterName}){
    const {fields,append,remove} = useFieldArray({name:`${clusterName}.maps`, control});
    useEffect(()=>{
        for(let [mapName,port] of Object.entries(defValues)){
            append({mapName,port})
        }
         return ()=>{remove()}
    },[append, defValues,remove])

    function handleClick(){
        let mapName = getValues(`${clusterName}.mapName`);
        let port = getValues(`${clusterName}.port`);
        let valueToAppend = {mapName,port}
        append(valueToAppend);
        resetField(`${clusterName}.mapName`,{defaultValue:"The Island"});
        resetField(`${clusterName}.port`,{defaultValue:"27015"});
    }

    return(
        <>
            <Heading
                size={"md"}
                textTransform={"uppercase"}
                textAlign={"left"}
                letterSpacing={"1px"}
                mb={"3%"}
            >Add new maps</Heading>
            <Flex justify={"space-around"} align={"flex-end"}>
                <ArkAlarmInput register={register} name={`${clusterName}.mapName`} defValue={"The Island"}/>
                <ArkAlarmInput register={register} name={`${clusterName}.port`} defValue={"27015"}/>
                <Button colorScheme={"green"} onClick={handleClick}> Add </Button>
            </Flex>
            <Spacer size={"1px"}/>
            {fields.map((field,index)=>{
                return(
                    <Flex justify={"space-around"} m={"2% 0"} key={field.id}>
                        <ArkAlarmInput
                            noLabel
                            register={register}
                            name={`${clusterName}.maps.${index}.mapName`}
                            defValue={field[`${clusterName}.mapName`]}/>
                        <ArkAlarmInput
                            noLabel
                            register={register}
                            name={`${clusterName}.maps.${index}.port`}
                            defValue={field[`${clusterName}.port`]}/>
                        <Button colorScheme={"red"} onClick={()=>remove(index)}>remove</Button>
                    </Flex>
                )
            })}
        </>
    )
}
