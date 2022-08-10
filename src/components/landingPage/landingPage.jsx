import {Component} from "react";
import {Button, Flex, Heading, Link, Text} from "@chakra-ui/react";
import ThemeContext from "../darkModeProvider/darkModeProvider";

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
                {({dark,toggleDark})=>{return (
                    <Flex align={"center"} height={"100vh"} justify={"center"} direction={"column"}{...themeColors[themeNames[themeString(dark)]]} >
                        <Heading  as={"h1"} size='3xl'>Ark Alarm</Heading>
                        <Heading  as={"h2"}>Discord bot</Heading>
                        <Text m={"5%"} fontWeight={500} fontSize={"lg"}>
                            Tired of going to battlemetrics to see your server's status?
                            <br/>
                            Want to know who is on your map right from discord?
                        </Text>
                        <Button colorScheme='blue'>
                            <Link
                                target={"_blank"}
                                href={"https://discord.com/api/oauth2/authorize?client_id=800086112990658561&permissions=8&scope=bot"}>
                                Add it to your server today</Link>
                        </Button>
                    </Flex>
                )}}
            </ThemeContext.Consumer>

        )
    }
}
