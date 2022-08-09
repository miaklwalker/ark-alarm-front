import {Box, Code, Flex} from "@chakra-ui/react";

export default function SubmitScreen(){
    return (
        <Flex
            direction={"column"}
            h={"50vh"}
            align={"center"}
            justify={"center"}
            fontSize={"48px"}
            className='submitted'>
            Thank you for submitting your config
            {<br/>}
            <Box fontSize={"24px"}>
                please continue back to discord and run the {<Code> !A setup </Code>} command
            </Box>
        </Flex>)
}
