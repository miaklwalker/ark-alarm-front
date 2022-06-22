import MapContainer from "../mapContainer/mapContainer";
import {useState} from "react";
import {FormControl, Input, FormLabel, FormHelperText, Button, HStack, VStack} from "@chakra-ui/react";

export default function ArkAlarmForm({
                                         name,
                                         handleSubmit,
                                         data,
                                         handleRemove,
                                         handleAddToList,
                                         handleChange,
                                         handleListChange,
                                         handleMapChanges,
                                         handleNickname
                                     }) {
    let [{port, mapName}, setPortState] = useState({port: null, mapName: null});
    let [enemy, setEnemy] = useState("");
    let [tribemate, setTribemate] = useState("");


    function saveHelper(state, setter) {
        return (key) => {
            return (e = undefined) => {
                e.preventDefault();
                if (key) {
                    setter({...state, ...{[key]: e.target.value}})
                } else if (key === undefined) {
                    setter(e.target.value)
                }
            }
        }
    }

    let mapHelper = saveHelper({port, mapName}, setPortState);
    let enemyHelper = saveHelper(enemy, setEnemy);
    let tribemateHelper = saveHelper(tribemate, setTribemate);
    return (
        <form onSubmit={handleSubmit}>
        <FormControl>
            <HStack align={"flex-end"} >
                <span>
            <FormLabel>Server</FormLabel>
            <Input
                type={"text"}
                onChange={(e) => handleNickname(name, "server", e.target.value)}
                defaultValue={data.server}
                htmlSize={8}
                width='auto'
            />
            </span>
                <span>
                <FormLabel>IP</FormLabel>
                <Input
                    type={"text"}
                    onChange={(e) => handleChange(name, "ip", e.target.value)}
                    defaultValue={data.ip}
                />
            </span>
                <span>
                <FormLabel>Game</FormLabel>
            <Input
                type={"text"}
                onChange={(e) => handleChange(name, "game", e.target.value)}
                defaultValue={data.game}
                htmlSize={5}
                width='auto'
            />
            </span>
            </HStack>
            <FormLabel mt={"2%"}> Maps </FormLabel>
            <FormHelperText> Add maps to the profile to scan!</FormHelperText>
            <HStack mt={"1%"} align={"flex-end"}>
                <span>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" onChange={mapHelper("mapName")} placeholder={"The Island"}/>
                </span>
                <span>
                    <FormLabel>Port</FormLabel>
                    <Input type="text" onChange={mapHelper("port")} placeholder={"27019"}/>
                </span>
                <span>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        handleMapChanges(name, mapName, port, true)
                    }} className={"go btn"}>add</Button>
                </span>

            </HStack>
            <div className="map-container">
                <FormLabel mt={"2%"}>maps</FormLabel>
                {Object.entries(data.maps).map((el, i) => <MapContainer
                    handleChange={handleMapChanges}
                    key={i}
                    name={name}
                    handleClick={handleRemove}
                    data={el}
                />)}
            </div>
            <HStack mt={"2%"} align={"flex-end"} >
            <span>
                <FormLabel>Enemies</FormLabel>
                <Input type="text" onChange={enemyHelper()} htmlSize={18} width='auto'/>
            </span>
            <Button onClick={(e) => {
                e.preventDefault();
                handleAddToList(name, "enemies", enemy)
            }}>Add Enemy</Button>
        </HStack>
            <VStack align={"flex-start"}>
            {data.enemies.map((enemy, i) =>
                <HStack  key={i}>
                        <Input
                            type="text"
                            key={i}
                            onChange={(e) => handleListChange(name, "enemies", i, e.target.value)}
                            defaultValue={enemy}/>
                        <Button colorScheme={"red"} className="remove" onClick={() => {
                            handleListChange(name, "enemies", i, undefined, true)
                        }}>X</Button>
                </HStack>
            )}
        </VStack>
            <HStack mt={"2%"} align={"flex-end"} >
            <span>
                <FormLabel>Tribemates</FormLabel>
                <Input type="text" onChange={tribemateHelper()} htmlSize={18} width='auto'/>
            </span>
            <Button onClick={(e) => {
                e.preventDefault();
                handleAddToList(name, "tribemates", tribemate)
            }}>Add Tribemates</Button>
        </HStack>
            <VStack align={"flex-start"}>
            {data.tribemates.map((tribemate, i) =>
                <HStack  key={i}>
                    <Input
                        type="text"
                        key={i}
                        onChange={(e) => handleListChange(name, "tribemates", i, e.target.value)}
                        defaultValue={tribemate}/>
                    <Button colorScheme={"red"} className="remove" onClick={() => {
                        handleListChange(name, "tribemates", i, undefined, true)
                    }}>X</Button>
                </HStack>
            )}
        </VStack>
            <Button mt={"2%"} type={"submit"}>Save To Server</Button>
        </FormControl>
        </form>)
}
