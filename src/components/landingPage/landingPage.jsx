import {Component} from "react";
import {Box, Button, Heading, Link, Text} from "@chakra-ui/react";
import ThemeContext from "../darkModeProvider/darkModeProvider";
import screenshot from "../../images/Screen Shot 2022-08-10 at 2.58.24 PM.png";
import "./landing-page.css";
export default class Landing extends Component {

    render(){
        let themeNames = {
            "DARK_MODE":Symbol("DARK_MODE"),
            "LIGHT_MODE":Symbol("LIGHT_MODE")
        }
        let themeColors = {
            [themeNames.LIGHT_MODE]:{
                color:"black",
                backgroundColor:"whiteAlpha.700"
            },
            [themeNames.DARK_MODE] : {
                color:"white",
                backgroundColor:"blackAlpha.600"
            }
        }
        let themeString = (isDark) => isDark ? "DARK_MODE" : "LIGHT_MODE";
        return(
            <ThemeContext.Consumer>
                {({dark})=>{
                    let themeStyle = themeColors[themeNames[themeString(dark)]]
                    return (
                     <Box className={"container"} height={"100vh"} {...themeStyle} >
                         <Box className={"text-container"} width={"35vw"} >
                             <Heading  as={"h1"} size='3xl'>Ark Alarm</Heading>
                             <Heading  as={"h2"}>Discord bot</Heading>
                             <Text m={"5% 0"} fontWeight={500} fontSize={"lg"}>
                                 Tired of going to battlemetrics to see your server's status?
                                 <br/>
                                 Want to know who is on your map right from discord?
                             </Text>
                             <Button colorScheme='blue' size={"lg"}>
                                 <Link
                                     target={"_blank"}
                                     href={"https://discord.com/api/oauth2/authorize?client_id=800086112990658561&permissions=8&scope=bot"}>
                                     Get Started
                                 </Link>
                             </Button>
                         </Box>
                         <Box className={"img-container"} w={"35vw"} h={"35vh"}>
                             <img src={screenshot} alt=""/>
                         </Box>

                     </Box>
                )}}
            </ThemeContext.Consumer>

        )
    }
}
