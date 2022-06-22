import {Button, HStack, Input} from "@chakra-ui/react";

const MapContainer = (({data:[mapName,portNumber],handleClick,name,handleChange})=>{
    // todo Make these changes update state.
    function helper () {
        return (e)=>handleChange(name,mapName,e.target.value)
    }
    return (<div className={"map-container"}>
        <HStack>
            <Input width={"auto"} htmlSize={"15"} type={"text"} readOnly value={mapName}/>
            <Input width={"auto"} htmlSize={"6"} type={"text"} onChange={helper()} value={portNumber} />
            <Button colorScheme={"red"}
                    onClick={e=>{
                        e.preventDefault();
                        handleClick(name,mapName)
                    }}
            >X</Button>
        </HStack>

    </div>)
});
export default MapContainer
