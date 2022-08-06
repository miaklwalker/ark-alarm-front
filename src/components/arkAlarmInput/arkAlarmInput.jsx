import {FormLabel, Input} from "@chakra-ui/react";

export default function ArkAlarmInput({name,defValue,register,noLabel,...rest}){

    return(
        <div {...rest} >
            {!noLabel && <FormLabel htmlFor={name}>{name.split(".")[1]}</FormLabel>}
            <Input
                type={"text"}
                defaultValue={defValue}
                {...register(name)}

            />
        </div>
    )

}
