import {
    Box,
    Button,
    chakra,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    Link as ChakraLink,
    Link,
    UnorderedList,
    ListItem,
    OrderedList,
} from "@chakra-ui/react";

import { FiChevronDown, FiChevronRight, FiMail, FiUser } from "react-icons/fi";

import { isValidMotionProp, motion } from "framer-motion";

import Image from "next/image";
import ExternalLayout from "@layouts/ExternalLayout";
import NextLink from "next/link";

import aboutImage from "@public/assets/images/PC.jpg";
import aboutImage2 from "@public/assets/images/pythonZoomClass.png";
import aboutImage3 from "@public/assets/images/PC Parts.jpg";

import { Field, Form, Formik } from "formik";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Reveal from "@components/Reveal";

const AnimateUnderline = chakra(motion.span, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function AboutUs() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Heading as="h1" size="2xl">
                About Us
            </Heading>

            <Box as="section" mt={12}>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={12}
                    alignItems="center"
                >
                    <Reveal
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <Flex justify="center" align="center">
                            <Box rounded="2xl" overflow="hidden" fontSize={0}>
                                <Image
                                    src={aboutImage}
                                    alt="Tech Savvy Youth"
                                    placeholder="blur"
                                />
                            </Box>
                        </Flex>
                    </Reveal>

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
                                Who we are
                            </Text>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Heading>
                                Empowering youth through new technologies and
                                coding
                            </Heading>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Text color="gray.500">
                                Tech Savvy Youth is a 501(C)3 non-profit
                                organization (EIN: 85-4090345). We pride
                                ourselves on creating fun, hands-on, and
                                knowledgeable classes that will empower youth
                                with the skills like the ability to code, build
                                their own computers, prepare for the SAT, solve
                                advanced math problems, and more. In our
                                classes, students will be able to sit at home
                                and virtually learn STEM skills whenever they
                                want. We empower, teach, and support students to
                                learn the skills that will be necessary in the
                                growing IT industry and into the future.
                            </Text>
                        </Reveal>
                    </Stack>
                </SimpleGrid>
            </Box>

            <Box as="section" pt={24}>
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
                                Our Story
                            </Text>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Heading>Our Founding</Heading>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Text color="gray.500">
                                In the thick of the pandemic,{" "}
                                <Link
                                    href="https://vismaypatel.com"
                                    color="brand.500"
                                >
                                    Vismay Patel <ExternalLinkIcon />
                                </Link>{" "}
                                was approached by a group of people to teach
                                coding to a small group of kids. While teaching,
                                he noticed how many students did not have access
                                to the necessary resources. This experience is
                                what led to the idea of founding Tech Savvy
                                Youth: to provide access to learning for
                                everyone across the world regardless of their
                                background. So, in August 2020, before his
                                freshman year at Interlake High School in
                                Bellevue, Washington, Vismay started Tech Savvy
                                Youth, a registered 501(C)3 non-profit
                                organization with the purpose of creating fun,
                                hands-on, and knowledgeable workshops that
                                empower students to learn the skills that will
                                be necessary in the growing IT industry.
                            </Text>
                        </Reveal>
                    </Stack>

                    <Reveal
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <Flex justify="center" align="center">
                            <Box rounded="2xl" overflow="hidden" fontSize={0}>
                                <Image
                                    src={aboutImage2}
                                    alt="Tech Savvy Youth"
                                    placeholder="blur"
                                />
                            </Box>
                        </Flex>
                    </Reveal>
                </SimpleGrid>
            </Box>

            <Box as="section" pt={24}>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={12}
                    alignItems="center"
                >
                    <Reveal
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
                    </Reveal>

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
                                Support Us
                            </Text>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Heading>How to Help</Heading>
                        </Reveal>
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Text color="gray.500">
                                Tech Savvy Youth is funded entirely from
                                donations, either directly by supporters,
                                parents or through matching programs by
                                companies like Microsoft and Amazon.
                                <br />
                                <br />
                                Here are some other ways you could help us
                                continue teaching our students effectively:
                            </Text>

                            <UnorderedList color="gray.500" spacing={2} my={2}>
                                <ListItem>
                                    Amazon! Whenever you shop on Amazon, please
                                    go to{" "}
                                    <Link
                                        href="https://smile.amazon.com"
                                        color="brand.500"
                                    >
                                        smile.amazon.com <ExternalLinkIcon />
                                    </Link>{" "}
                                    and shop from there, 0.5% of your purchase
                                    will be donated to us by Amazon, and you
                                    retain the SAME prices as the standard site!
                                    Please see Amazon's website for more
                                    details.
                                </ListItem>
                                <ListItem>
                                    Fred Meyer Community Rewards! We are pleased
                                    to announce that we are now in the Fred
                                    Meyer Rewards Program! Fred Meyer will
                                    donate a portion of your purchase to our
                                    organization at NO COST to you. To help us,
                                    please complete the steps here:
                                    <OrderedList my={2}>
                                        <ListItem>
                                            Download the Fred Meyer App
                                        </ListItem>
                                        <ListItem>
                                            Sign In or Sign Up for a Reward Card
                                            (FREE)
                                        </ListItem>
                                        <ListItem>
                                            Click the 3 lines at the top right
                                            corner
                                        </ListItem>
                                        <ListItem>
                                            Click the 3rd option (Rewards)
                                        </ListItem>
                                        <ListItem>
                                            Click Community Rewards
                                        </ListItem>
                                        <ListItem>
                                            Select Tech Savvy Youth from the
                                            Organization List!
                                        </ListItem>
                                    </OrderedList>
                                </ListItem>
                            </UnorderedList>
                            <Text color="gray.500">
                                You can also{" "}
                                <ChakraLink href="/donate" color="brand.500">
                                    Donate
                                </ChakraLink>{" "}
                                through our website.
                            </Text>
                        </Reveal>
                    </Stack>
                </SimpleGrid>
            </Box>
        </Container>
    );
}

AboutUs.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
