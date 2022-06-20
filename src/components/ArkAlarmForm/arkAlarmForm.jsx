import MapContainer from "../mapContainer/mapContainer";
import {useState} from "react";

export default function ArkAlarmForm({name,handleSubmit, data, handleRemove,handleAddToList, handleChange, handleListChange, handleMapChanges}) {
   let [{port,mapName},setPortState] = useState({port:null,mapName:null});
   let [enemy,setEnemy] = useState("");
   let [tribemate,setTribemate] = useState("");


   function saveHelper(state,setter){
       return (key) => {
           return (e=undefined) => {
               e.preventDefault();
               if(key) {
                   setter({...state, ...{[key]: e.target.value}})
               }else if (key === undefined){
                   setter(e.target.value)
               }
           }
       }
   }
   let mapHelper = saveHelper({port,mapName},setPortState);
   let enemyHelper = saveHelper(enemy,setEnemy);
   let tribemateHelper = saveHelper(tribemate,setTribemate);
    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="">
                server
                <input
                    type="text"
                    onChange={(e) => handleChange(name, "server", e.target.value)}
                    defaultValue={data.server}/>
            </label>
            <label htmlFor="">
                ip
                <input
                    type="text"
                    onChange={(e) => handleChange(name, "ip", e.target.value)}
                    defaultValue={data.ip}
                />
            </label>
            <label htmlFor="">
                game
                <input
                    type="text"
                    onChange={(e) => handleChange(name, "game", e.target.value)}
                    defaultValue={data.game}
                />
            </label>
            <label htmlFor="">
                <div className="input-container">
                    name
                    <input type="text" onChange={mapHelper("mapName")} placeholder={"The Island"}/>
                    port
                    <input type="text" onChange={mapHelper("port")}  placeholder={"27019"}/>

                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleMapChanges(name,mapName,port,true)
                    }} className={"go btn"}>add</button>
                </div>
                <div className="map-container">
                    maps
                    {Object.entries(data.maps).map((el, i) => <MapContainer
                        handleChange={handleMapChanges}
                        key={i}
                        name={name}
                        handleClick={handleRemove}
                        data={el}
                    />)}
                </div>
            </label>
            <label htmlFor="">
                enemies
                <div className={"container-group"}>
                    <input type="text" onChange={enemyHelper()}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleAddToList(name,"enemies",enemy)
                    }}> Add Enemy</button>
                </div>
                <div className="container-list">
                    {data.enemies.map((enemy, i) =><span key={i}>
                        <input
                            type="text"
                            key={i}
                            onChange={(e) => handleListChange(name, "enemies", i, e.target.value)}
                            defaultValue={enemy}/>
                        <span className="remove" onClick={()=>{
                            handleListChange(name,"enemies",i,undefined,true)
                        }}>X</span>
                    </span>
                    )}
                </div>
            </label>
            <label htmlFor="">
                tribe-mates
                <div className={"container-group"}>
                    <input type="text" onChange={tribemateHelper()}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        handleAddToList(name,"tribemates",tribemate)}}> Add tribemates</button>
                </div>
                <div className="container-list">
                    {data.tribemates.map((tribemate, i) =><span key={i}>
                        <input
                            type="text"
                            onChange={(e) => handleListChange(name, "tribemates", i, e.target.value)}
                            defaultValue={tribemate}/>
                        <span className="remove"
                              onClick={()=>{
                                  handleListChange(name,"tribemates",i,undefined,true)
                              }}
                        >
                            X
                        </span>
                    </span> )}
                </div>
            </label>
            <input
                type={"submit"}
                value={"submit"}
            />
        </form>
    )
}
