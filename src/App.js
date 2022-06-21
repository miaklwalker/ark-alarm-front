import './App.css';
import {Component} from "react";
import ArkAlarmForm from "./components/ArkAlarmForm/arkAlarmForm";
import {FirebaseCrud, KeyCrud} from "./modules/firebaseCrud";




function transformData(data){
    let newData = {};
    newData["Discord Server"] = data.name;
    newData["Configs"] = data.data;
    return newData;
}

const userCrud = new FirebaseCrud("Users");
const keyCrud = new KeyCrud("Keys");

class WithSaveHelper extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            clientData:{},
            submitted:false,
        }
        this.key=null;
    }
    saveHelper(state){
        sessionStorage.setItem(this.key,JSON.stringify(state))
        this.setState({loaded:true,clientData:state});
    }
    componentDidMount(){
        this.key = window.location.search.substring(1);
        let hasSessionStorage = sessionStorage.getItem(this.key);
        if(hasSessionStorage){
            this.setState({loaded:true,clientData:JSON.parse(hasSessionStorage)})
        }else{
            keyCrud
            .getFromDatabase(this.key)
            .then(data => {
                if(data){
                    userCrud
                    .getFromDatabase(data.name)
                    .then(res=>this.saveHelper(res))
                }else{
                    this.setState({loaded:true,clientData:null,submitted:true})
                }
                
            })
            .catch(err=>console.log(err));
            
        }
    }
    render(){
        return <div> This component does not have a render method setup</div>
    }
}

class App extends WithSaveHelper {
    removeMapFromList = (key,value) => {
        let temp = this.state.clientData;
        delete temp.data[key].maps[value];
        this.saveHelper(temp)
    }
    handleChange = (key,field,value) => {
        let temp = this.state.clientData;
        temp.data[key][field] = value;
        this.saveHelper(temp)
    }
    handleMapChanges=(key,name,value,unique = false)=>{
        let temp = this.state.clientData;
        let hasName = Object.keys(temp.data[key].maps).includes(name);
        if(unique && hasName)return;
        temp.data[key]["maps"][name] = value;
        this.saveHelper(temp)
    }
    handleListChange=(key,field,index,value,remove=false)=>{
        let temp = this.state.clientData;
        if(remove){
            temp.data[key][field].splice(index,1);
        }else{
            temp.data[key][field][index] = value;
        }
        this.saveHelper(temp)
    }
    handleAddToList=(key,name,value)=>{
        let temp = this.state.clientData;
        temp.data[key][name].push(value);
        this.saveHelper(temp);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        userCrud.UpdateDatabase(transformData(this.state.clientData));
        keyCrud.DeleteFromDatabase(this.key);
        sessionStorage.clear();
        this.submitted = true;
    }
    render(){
        let cluster = this.state.loaded && this.state.clientData && Object.keys(this.state.clientData.data);
        return(
            <div className="container">
                {this.state.loaded && !this.state.submitted && 
                <div className="App">
                    <h1>Ark Alarm</h1>
                    <h2>{this.state.clientData?.name}'s config page</h2>
                    {cluster && cluster.map((name,i) => <div key={i}>{name}</div>)}
                    {cluster && cluster.map((name,i) => <ArkAlarmForm
                        name={name}
                        handleRemove={this.removeMapFromList}
                        handleChange={this.handleChange}
                        handleListChange={this.handleListChange}
                        handleMapChanges={this.handleMapChanges}
                        handleAddToList={this.handleAddToList}
                        handleSubmit={this.handleSubmit}
                        key={i}
                        data={this.state.clientData.data[name]}/> )}
                </div>
                }
                {this.state.submitted && <div className='submitted'>Thank you for submitting your config</div>}
            </div>

        )
    }
}


export default App;
