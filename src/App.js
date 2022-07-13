import './App.css';
import ArkAlarmForm from "./components/ArkAlarmForm/arkAlarmForm";
import transformData from "./modules/transformData";
import WithSaveHelper from "./components/withSaveHelper/withSaveHelper";
import {keyCrud, userCrud} from "./index";
import {
    Box,
    Button,
    ChakraProvider,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Flex,
    Code,
    Text, Link
} from '@chakra-ui/react'
import {Component} from "react";



class AppForm extends WithSaveHelper {
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
    makeNickName(name){
        let splitName = name.split(" ");
        if(splitName.length === 1){
            return name.toLowerCase();
        }else if(splitName.length > 1){
            return splitName.map(word=>word[0].toLowerCase()).join("")
        }
    }
    handleServerNickName = (key,field,value)=>{
        let temp = this.state.clientData;
        temp.data[key][field] = value;
        let nickname = this.makeNickName(temp.data[key].server);
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
    }
    render(){
        let cluster = this.state.loaded && this.state.clientData && Object.keys(this.state.clientData.data);
        return(
            <Box className="container" >
                {    this.state.loaded    &&  !this.state.submitted &&
                <Box className="App" bgGradient='linear(to-l, #7928CA, #FF0080)' pb={"5%"} >
                    <Heading p={"1%"} pb={"2%"} color={"gray.100"} >Ark Alarm</Heading>
                    <Box w={"100%"} align={"center"} >
                        <Box w="55%" p={"2.5%"} borderRadius={"7px"} background={"white"}>
                        <Heading mb={"2%"}>{this.state.clientData?.name}'s {<br/>} Config Page</Heading>
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
                        </Box>
                    </Box>
                </Box>
                }
                {this.state.submitted && <Flex
                direction={"column"}
                h={"50vh"}
                align={"center"}
                justify={"center"}
                fontSize={"48px"}
                className='submitted'>
                    Thank you for submitting your config
                    {<br/>}
                    <Box fontSize={"24px"}>please continue back to discord and run the {<Code> !A setup </Code>} command </Box>

                    </Flex>}
            </Box>
        )
    }
}
class Landing extends Component {
    render(){
        return(
            <Flex align={"center"} height={"100vh"} justify={"center"} direction={"column"}>
                <Heading  as={"h1"} size='3xl'>Ark Alarm</Heading>
                <Heading  as={"h2"}>Discord bot</Heading>
                <Text m={"5%"}>
                    Tired of going to battlemetrics to see your server's status?
                    <br/>
                    Want to know who is on your map right from discord?
                </Text>
                <Button colorScheme='blue'>
                    <Link
                        href={"https://discord.com/api/oauth2/authorize?client_id=800086112990658561&permissions=8&scope=bot"}>
                        Add it to your server today</Link>
                </Button>
            </Flex>
        )
    }
}
class App extends Component{
    render(){
        // if there is a search paramter in the url or in session storage, load the config
        let search = window.location.search;
        let key = sessionStorage.getItem("key");
        let state;
        if(search.length > 0 || key){
            state = "Form";
        }else{
            state = "landing"
        }
        return(
            <div className="App">
                <ChakraProvider>
                    {state === "landing" && <Landing/>}
                    {state === "Form" && <AppForm key={key}/>}
                </ChakraProvider>
            </div>
        )
    }
}
export default App;
