import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import ExternalFooter from "@components/ExternalFooter";
import ExternalNavbar from "@components/ExternalNavbar";
import { useState } from "react";

export default function ExternalLayout({ children }) {
    const [closed, setClosed] = useState(false);
    return (
        <>
            {!closed && (
                <Box
                    position="fixed"
                    bottom={0}
                    bgColor="brand.500"
                    w="full"
                    zIndex="banner"
                    px={6}
                    py={2}
                    textAlign="center"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <div />
                    <Text color="white" fontWeight="bold">
                        This site is still under development by our amazing
                        team. Certain features have not been added, and some
                        content is missing from the website. Please be patient
                        as we roll out changes over the next couple of months.
                        {/*The website will be down until tomorrow (2/10/2023). Please use the Discord server for all 
                    messaging. The link for the Discord can be found in the FAQ page. */}
                    </Text>
                    <CloseButton
                        onClick={() => setClosed(true)}
                        color="white"
                    />
                </Box>
            )}
            <ExternalNavbar />
            {children}
            <ExternalFooter />
        </>
    );
}

export function InformationAlert() {
    const toast = useToast();
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true });
    return (
        <Alert status="error" w={"full"}>
            <AlertIcon />
            <Box alignItems="center">
                <AlertTitle>Vismay has Struck!</AlertTitle>
                <AlertDescription>
                    Vismay has broken something on the website. The website will
                    be down until <b>February 10th 2023 at 12:00 AM</b>
                    {". "}
                    Sorry for the inconvenience.
                </AlertDescription>
            </Box>
        </Alert>
    );
}
