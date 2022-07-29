import {Component} from "react";
import {Button, Flex, Heading, Link, Text} from "@chakra-ui/react";

export default class Landing extends Component {
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
