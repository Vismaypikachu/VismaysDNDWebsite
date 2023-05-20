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

export default function Hackathon() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Stack spacing={5} align="center">
                <Heading as="h1" size="2xl">
                    Tech Savvy Youth Hack2023
                </Heading>
                <Text color="gray.500" textAlign={"center"}>
                    Upon payment (non-refundable), you will be redirected to a form to complete registration
                    <br/>
                    IF YOU ARE FREE OR REDUCED LUNCH, PLEASE EMAIL admin@techsavvyyouth.org FOR FREE REGISTRATION!!!
                </Text>

                <Button
                    as="a"
                    colorScheme="brand"
                    size="lg"
                    rounded="full"
                    cursor="pointer"
                    href=""
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
                            <br/>Ivanhoe Playing Field (Sep 1st at 60 Acres Park)<br/>10AM - 2PM (Lunch 12:00-12:30)
                            <br/><br/><u><b>$15/Student (FREE for Free/Reduced Lunch Students)</b></u>
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
                            Tech Savvy Youth will be hosting our inaugural TSY Hackathon, (NAME HERE). This year will be divided into
                            two different CATEGORIES, Testing and Innovation (see below for differences). Participants in each category 
                            will be divided into two different divisions, Elementary and Middle/High School for fair competition.
                        </Text>

                        <Text color="gray.500" my={2}>
                            <br/><br/>
                            Testing - Participants will attempt to answer 25 programming questions in the time limit (90 minutes). 
                            Participants may complete this test at any time, but they must upload a video recording of themselves 
                            and their screen, as well as a screen recording of the entire testing session. Recordings may be uploaded 
                            to a location on our website (further details upon registration) or emailed to {" "}
                            <ChakraLink href="mailto:admin@techsavvyyouth.org" color="brand.500">
                                admin@techsavvyyouth.org
                            </ChakraLink>.

                            <br/><br/>
                            Innovation - Participants will create/program an original innovation to be judged. 
                            Solutions to world problems will earn more points over ideas like games, but anything can qualify!
                            <UnorderedList>
                                <ListItem>
                                    Examples of Innovation Submissions: Video Games, Robots, Machine Learning 
                                    Algorithms, Business Ideas, Devices, World Solutions
                                </ListItem>
                            </UnorderedList>
                            <br/><br/>

                            <b>Testing Prizes (Each Division)</b>
                            <UnorderedList>
                                <ListItem>1st Place: $100 Gift Card</ListItem>
                                <ListItem>2nd Place: $50 Gift Card</ListItem>
                                <ListItem>3rd Place: $25 Gift Card</ListItem>
                            </UnorderedList>
                            <br/><br/>

                            <b>Innovation Prizes (Each Division)</b>
                            <UnorderedList>
                                <ListItem>1st Place: $100 Gift Card</ListItem>
                                <ListItem>2nd Place: $50 Gift Card</ListItem>
                                <ListItem>3rd Place: $25 Gift Card</ListItem>
                            </UnorderedList>


                            <br/>
                            Registration will open June 1st
                            <br/><br/>
                            Please email {" "}
                            <ChakraLink href="mailto:admin@techsavvyyouth.org" color="brand.500">
                                admin@techsavvyyouth.org
                            </ChakraLink>{" "}
                            for any questions.
                        </Text>

                        

                        <Text color="gray.500">
                            You can also{" "}
                            <ChakraLink href="/donate" color="brand.500">
                                Donate
                            </ChakraLink>{" "}
                            through our website.
                        </Text>
                    </Reveal>
                </Stack>
            </Box>

        </Container>
    );
}

Hackathon.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
