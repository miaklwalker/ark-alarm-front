import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {Button, Flex, Heading} from "@chakra-ui/react";
import ArkAlarmInput from "../arkAlarmInput/arkAlarmInput";

export default function ArkAlarmPersonalList({register,groupName,itemName,defValues,control,getValues,resetField}){
    const {fields,append,remove} = useFieldArray({name:groupName, control});
    useEffect(()=>{
        if(defValues){
            for(let item of defValues){
                append(item);
            }
        }
        return ()=>{remove()}
    },[append, defValues, remove, itemName]);

    const handleClick = () => {
        append(getValues(itemName));
        resetField(itemName,{defaultValue:"Steam Nickname"});
    }
    return (
        <>
            <Heading size={"md"}>{groupName}</Heading>
            <Flex justify={"flex-start"} align={"flex-end"}>
                <ArkAlarmInput noLabel register={register} name={itemName} defValue={"Steam NickName"}/>
                <Button colorScheme={"green"} onClick={handleClick}> Add </Button>
            </Flex>
            <br/>
            <br/>
            {fields.map((field,index)=>(
                <Flex key={field.id}>
                    <ArkAlarmInput noLabel register={register} name={`${groupName}.${index}`} defValue={field[itemName]}/>
                    <Button colorScheme={"red"} onClick={()=>remove(index)}>remove</Button>
                </Flex>
            ))}
            <br/>
            <br/>
            <hr/>
        </>
    )
}
