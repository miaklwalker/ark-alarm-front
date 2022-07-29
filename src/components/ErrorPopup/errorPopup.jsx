import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, useDisclosure} from "@chakra-ui/react";

export default function ErrorPopup({messages}) {
    const {
        isOpen: isVisible,
        onClose,
    } = useDisclosure({ defaultIsOpen: true })
    let errors = Object.values(messages).map(({message}) => message)
    return isVisible && errors.length > 0 ? (
        <Alert status='error'>
            <AlertIcon />
            <Box>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {errors.map(error => error)}
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : (
        <span></span>
    )
}
