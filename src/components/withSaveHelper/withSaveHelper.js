import {Component} from "react";
import {keyCrud, userCrud} from "../../index";

export default class WithSaveHelper extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            clientData:{},
            submitted:false,
        }
        this.key=null;
        this.keys ={}
    }
    saveHelper(state){
        sessionStorage.setItem(this.key,JSON.stringify(state))
        this.setState({loaded:true,clientData:state});
    }
    componentDidMount(){
        this.key = window.location.search.substring(1);
        let hasSessionStorage = sessionStorage.getItem(this.key);
        if(hasSessionStorage){
            this.saveHelper(JSON.parse(hasSessionStorage))
        }else{
            keyCrud.getFromDatabase(this.key)
            .then(data => {
                if(data){
                    userCrud
                    .getFromDatabase(data.name)
                    .then(res=>this.saveHelper(res))
                }else{
                    this.setState({loaded:true,clientData:null,submitted:true})
                }
            })
        }
    }
    render(){
        return <div> This component does not have a render method setup</div>
    }
}
