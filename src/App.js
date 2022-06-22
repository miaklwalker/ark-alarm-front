import './App.css';
import ArkAlarmForm from "./components/ArkAlarmForm/arkAlarmForm";
import transformData from "./modules/transformData";
import WithSaveHelper from "./components/withSaveHelper/withSaveHelper";
import {keyCrud, userCrud} from "./index";
import {ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'




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
    handleServerNickName = (key,field,value)=>{
        let temp = this.state.clientData;
        temp.data[key][field] = value;
        let nickname = temp.data[key].server.split(" ").map(word=>word[0]).join("");
        temp.data[nickname] = temp.data[key];
        if(key !== nickname) {
            delete temp.data[key];
        }
        this.setState(temp);
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
    handleSubmit= async (e)=>{
        e.preventDefault();
        await userCrud.UpdateDatabase(transformData(this.state.clientData));
        await keyCrud.DeleteFromDatabase(this.key);
        sessionStorage.clear();
        this.setState({submitted:true});
        console.log("saved")
    }
    render(){
        let cluster = this.state.loaded && this.state.clientData && Object.keys(this.state.clientData.data);
        return(
            <ChakraProvider>
            <div className="container">
                {this.state.loaded && !this.state.submitted &&
                <div className="App">
                    <h1>Ark Alarm</h1>
                    <h2>{this.state.clientData?.name}'s config page</h2>
                    <Tabs>
                        <TabList>
                            {cluster && cluster.map((name,i) => <Tab key={i}>{name}</Tab>)}
                            <Tab> + </Tab>
                        </TabList>
                        <TabPanels>
                            {cluster && cluster.map((name,i) =>
                                <TabPanel key={i}>
                                    <ArkAlarmForm
                                        name={name}
                                        handleNickname={this.handleServerNickName}
                                        handleRemove={this.removeMapFromList}
                                        handleChange={this.handleChange}
                                        handleListChange={this.handleListChange}
                                        handleMapChanges={this.handleMapChanges}
                                        handleAddToList={this.handleAddToList}
                                        handleSubmit={this.handleSubmit}
                                        data={this.state.clientData.data[name]}/>
                                </TabPanel>)}
                        </TabPanels>
                    </Tabs>
                </div>
                }
                {this.state.submitted && <div className='submitted'>Thank you for submitting your config</div>}
            </div>
            </ChakraProvider>

        )
    }
}


export default App;
