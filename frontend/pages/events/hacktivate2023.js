import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    Link as ChakraLink,
    UnorderedList,
    ListItem,
    OrderedList,
    Link,
    Button,
    Highlight,
} from "@chakra-ui/react";

import Image from "next/image";
import ExternalLayout from "@layouts/ExternalLayout";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import Reveal from "@components/Reveal";

import aboutImage from "@public/assets/images/PC.jpg";
import aboutImage2 from "@public/assets/images/pythonZoomClass.png";
import aboutImage3 from "@public/assets/images/PC Parts.jpg";
import { FaPaypal } from "react-icons/fa";

import "@fontsource/ibm-plex-mono";

export default function ComingSoon() {
    return (
        <Box
            backgroundColor="black"
            minH="100vh"
            fontFamily="IBM Plex Mono"
            color="white"
        >
            <Container
                maxW="7xl"
                px={{ base: 8, md: 12 }}
                py={10}
                backgroundColor="black"
                alignItems="center"
                minH="100vh"
                display="flex"
            >
                <Stack spacing={12}>
                    <Stack spacing={4}>
                        <Heading
                            as="h1"
                            size="4xl"
                            // style={{ fontSize: "5rem" }}
                            color="white"
                            fontFamily="IBM Plex Mono"
                            fontWeight="normal"
                        >
                            {/* <Highlight
                                query="2023"
                                styles={{ color: "brand.400" }}
                            > */}
                            Hacktivate 2023
                            {/* </Highlight> */}
                        </Heading>
                        <Text fontSize="2xl">
                            Organized by Tech Savvy Youth
                        </Text>
                    </Stack>
                    <Heading
                        as="h2"
                        size="2xl"
                        color="white"
                        fontFamily="IBM Plex Mono"
                        fontWeight="normal"
                    >
                        COMING SOON!
                    </Heading>
                </Stack>
            </Container>
        </Box>
    );
}
