const MapContainer = (({data:[mapName,portNumber],handleClick,name,handleChange})=>{
    // todo Make these changes update state.
    function helper () {
        return (e)=>handleChange(name,mapName,e.target.value)
    }
    return (<div className={"map-container"}>
        <input type={"text"} onChange={()=>console.log("todo")} value={mapName}/>
        <input type={"text"} onChange={helper()} value={portNumber} />
        <span
            style={{
                background:"red",
                border:"1px solid black",
                width:"25px",
                height:"25px",
                display:"inline-flex",
                placeContent:"center center",
                placeItems:"center center"

            }}
            onClick={e=>{
                e.preventDefault();
                handleClick(name,mapName)
            }}
        >X</span>
    </div>)
});
export default MapContainer
