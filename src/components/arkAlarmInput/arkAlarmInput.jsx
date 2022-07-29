import {FormLabel, Input} from "@chakra-ui/react";

export default function ArkAlarmInput({name,defValue,register,noLabel}){
    return(
        <span>
            {!noLabel && <FormLabel htmlFor={name}>{name}</FormLabel>}
            <Input
                type={"text"}
                defaultValue={defValue}
                {...register(name)}
            />
        </span>
    )

}
