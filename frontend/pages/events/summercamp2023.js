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
} from "@chakra-ui/react";

import Image from "next/image";
import ExternalLayout from "@layouts/ExternalLayout";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import Reveal from "@components/Reveal";

import aboutImage from "@public/assets/images/PC.jpg";
import aboutImage2 from "@public/assets/images/pythonZoomClass.png";
import aboutImage3 from "@public/assets/images/PC Parts.jpg";
import { FaPaypal } from "react-icons/fa";

export default function Register() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Stack spacing={5} align="center">
                <Heading as="h1" size="2xl">
                    Tech Savvy Youth Summer Camp 2.0
                </Heading>
                <Text color="gray.500" textAlign={"center"}>
                    Upon payment (non-refundable), you will be redirected to a form to complete registration
                    <br/>
                    IF YOU ARE FREE OR REDUCED LUNCH, PLEASE EMAIL admin@techsavvyyouth.org FOR FREE/REDUCED CAMP FEE!!! Do NOT press the button.
                </Text>

                <Button
                    as="a"
                    colorScheme="brand"
                    size="lg"
                    rounded="full"
                    cursor="pointer"
                    href="https://www.paypal.com/donate/?hosted_button_id=L7E59JEPSNSNJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaPaypal />}
                >
                    Register
                </Button>
            </Stack>
            <Box as="section" mt={24}>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={12}
                    alignItems="center"
                >
                    <Stack spacing={4} justify="between">
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Text
                                textTransform="uppercase"
                                fontSize="sm"
                                letterSpacing="widest"
                                color="gray.500"
                            >
                                Tech Savvy Youth Summer Camp 2.0
                            </Text>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Heading>Details</Heading>
                        </Reveal>
                        
                        <Text color="gray.500">
                            3rd - 12th Grade Students<br/>August 28th - September 1st
                            <br/>Ivanhoe Playing Field (Bellevue, WA) / (Sep 1st at 60 Acres Park)<br/>10AM - 2PM (Lunch 12:00-12:30)
                            <br/><br/><u><b>$25/Student (FREE/REDUCED for Free/Reduced Lunch Students)</b></u>
                        </Text>
                    </Stack>

                    {/* <Reveal
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <Flex justify="center" align="center">
                            <Box rounded="2xl" overflow="hidden" fontSize={0}>
                                <Image
                                    src={aboutImage3}
                                    alt="Tech Savvy Youth"
                                    placeholder="blur"
                                />
                            </Box>
                        </Flex>
                    </Reveal> */}
                </SimpleGrid>
                        
                <Divider py={4} orientation='horizontal' />

                <Stack spacing={4} justify="between">
                    <Reveal
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Text color="gray.500" my={2}>
                            Tech Savvy Youth will be holding our second STEM Summer Camp in the last week of August before 
                            school starts. End summer off with a <b><u>BANG</u></b> as you learn STEM skills eventually ending with 
                            a huge {" "}<b><u>ROCKET LAUNCH</u></b>. Students will be divided into multiple Flight Groups throughout the week to go to 
                            different stations and learn/play with different activities like bridge building, rocket design, 
                            etc. We would like to stress that this Camp is not a daycare, please do not send a student if they 
                            are not comfortable being without a parent for a couple hours or is not potty-trained. Food will 
                            not be provided, and water is limited at the park, please bring your own. Parents are welcome to stay around
                            and take pictures if they ask the staff first (depending on the crowd or activities, we may be unable to facilitate spectators).
                        </Text>

                        <Text color="gray.500" my={2}>
                            Additionally, the final day will be held at the 60-Acres Park in Redmond. 
                            Transportation will not be provided to or from. Students do NOT have to attend the final 
                            day, however they will miss out on potential rewards and the opportunity to launch their rocket.

                            <br/><br/>
                            The flight with the most amount of points at the end of the Summer Camp will <b><u>win prizes</u></b>, as well as 
                            individuals who will be recognized by certain camp staff for exemplary behavior.
                            <br/><br/>
                            To register, please scroll to the top of the page and click the "Register" button.
                            <br/><br/>
                            Please email{" "}
                            <ChakraLink href="mailto:admin@techsavvyyouth.org" color="brand.500">
                                admin@techsavvyyouth.org
                            </ChakraLink>{" "} for any questions
                        </Text>

                        <Text color="gray.500">
                            You can also{" "}
                            <ChakraLink href="/donate" color="brand.500">
                                Donate
                            </ChakraLink>{" "}
                            through our website to support the camp!
                        </Text>
                    </Reveal>
                </Stack>
            </Box>

        </Container>
    );
}

Register.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
