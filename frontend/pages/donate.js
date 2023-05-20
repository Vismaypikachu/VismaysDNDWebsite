import {
    Box,
    Container,
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

export default function Donate() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Stack spacing={5} align="center">
                <Heading as="h1" size="2xl">
                    Donate
                </Heading>
                <Text color="gray.500">
                    We are a 501(c)(3) non-profit organization. All donations
                    are tax deductible.
                </Text>

                <Button
                    as="a"
                    colorScheme="brand"
                    size="lg"
                    rounded="full"
                    cursor="pointer"
                    href="https://www.paypal.com/donate?hosted_button_id=WVL326VXH8SKC"
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaPaypal />}
                >
                    Donate
                </Button>
            </Stack>
            <Box as="section" mt={24}>
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

            {/* <Box>
                <form
                    action="https://www.paypal.com/donate"
                    method="post"
                    target="_top"
                >
                    <input
                        type="hidden"
                        name="hosted_button_id"
                        value="WVL326VXH8SKC"
                    />
                    <input
                        type="image"
                        src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                        border="0"
                        name="submit"
                        title="PayPal - The safer, easier way to pay online!"
                        alt="Donate with PayPal button"
                    />
                    <img
                        alt=""
                        border="0"
                        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                        width="1"
                        height="1"
                    />
                </form>
            </Box> */}
        </Container>
    );
}

Donate.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
