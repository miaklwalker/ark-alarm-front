import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {Box, Button, Text} from "@chakra-ui/react";
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
            <Text>{groupName}</Text>
            <ArkAlarmInput noLabel register={register} name={itemName} defValue={"Steam NickName"}/>
            <Button onClick={handleClick}> Add </Button>
            {fields.map((field,index)=>(
                <Box key={field.id}>
                    <ArkAlarmInput noLabel register={register} name={`${groupName}.${index}`} defValue={field[itemName]}/>
                    <Button onClick={()=>remove(index)}>remove</Button>
                </Box>
            ))}
        </>
    )
}
