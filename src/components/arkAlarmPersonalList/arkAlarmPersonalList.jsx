import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {Box, Button, Flex, Heading} from "@chakra-ui/react";
import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";
import Spacer from "../Spacer";

export default function ArkAlarmPersonalList({register,groupName,itemName,clusterName,defValues,control,getValues,resetField}){
    const {fields,append,remove} = useFieldArray({name:`${clusterName}.${groupName}`, control});
    useEffect(()=>{
        if(defValues){
            for(let item of defValues){
                append(item);
            }
        }
        return ()=>{remove()}
    },[append, defValues, remove]);

    const handleClick = () => {
        append(getValues(`${clusterName}.${itemName}`));
        resetField(`${clusterName}.${itemName}`,{defaultValue:"Steam Nickname"});
    }
    return (
        <>
            <Heading
                size={"md"}
                textTransform={"uppercase"}
                textAlign={"left"}
                letterSpacing={"1px"}
                mb={"3%"}
            >{groupName}</Heading>
            <Flex justify={"flex-start"} align={"flex-end"}>
                <ArkAlarmInput noLabel register={register} name={`${clusterName}.${itemName}`} defValue={"Steam NickName"}/>
                <Button colorScheme={"green"} onClick={handleClick}> Add </Button>
            </Flex>
            <br/>
            {fields.map((field,index)=>(
                <Flex mt={`${index === 0 ? 0 : "2%"}`} key={field.id}>
                    <ArkAlarmInput noLabel register={register} name={`${clusterName}.${groupName}.${index}`} defValue={field[`${clusterName}.${itemName}`]}/>
                    <Button colorScheme={"red"} onClick={()=>remove(index)}>remove</Button>
                </Flex>
            ))}
            <Spacer size={"2px"}/>
            <Box mb={"3%"}></Box>
        </>
    )
}
