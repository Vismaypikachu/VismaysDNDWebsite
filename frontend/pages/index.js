import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    chakra,
    CloseButton,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
    useToast,
    Link as ChakraLink,
} from "@chakra-ui/react";

import { FiChevronDown, FiChevronRight, FiMail, FiUser } from "react-icons/fi";

import { isValidMotionProp, motion } from "framer-motion";

import Image from "next/image";
import ExternalLayout from "@layouts/ExternalLayout";
import Link from "next/link";

import headerImage from "@public/assets/images/Landing1.jpg";
import aboutImage from "@public/assets/images/Landing2.jpg";
import vismayImage from "@public/assets/images/Vismay.png";
import sejalImage from "@public/assets/images/Sejal.png";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Reveal from "@components/Reveal";
import ContactForm from "@components/ContactForm";

const AnimateUnderline = chakra(motion.span, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const FramerDiv = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Container
                mt={{ base: 12, sm: 3, md: 6, lg: 0 }}
                px={{ base: 8, md: 12 }}
                py={10}
                maxW="7xl"
                minH="100vh"
                display="flex"
                alignItems="center"
            >
                <Stack
                    align="center"
                    spacing={{ base: 8, lg: 12 }}
                    direction={{ base: "column", lg: "row" }}
                >
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Reveal
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <Heading
                                fontSize={{ base: "3xl", md: "5xl" }}
                                fontWeight={600}
                            >
                                An amazing Nonprofit dedicated to supplying
                                students with new{" "}
                                <AnimateUnderline
                                    bgGradient="linear(to-r, brand.500, cyan.500)"
                                    initial={{
                                        backgroundSize: "0% 0.1em",
                                        backgroundPosition: "0% 100%",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    animate={{
                                        backgroundSize: "100% 0.1em",
                                        backgroundPosition: "0% 100%",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                    transition={{ delay: 0.5, duration: 0.25 }}
                                >
                                    STEM skills and opportunities
                                </AnimateUnderline>
                            </Heading>
                        </Reveal>

                        <Reveal
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            delay={0.3}
                        >
                            <Text color={"gray.500"}>
                                We were founded with the goal of community and
                                personal improvement in mind. We not only help
                                our students, but our volunteers as well! They
                                learn valuable skills for the future.{" "}
                                <ChakraLink href="/" color="brand.500">
                                    Our Story <ExternalLinkIcon />
                                </ChakraLink>
                            </Text>
                        </Reveal>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={{ base: "column", sm: "row" }}
                        >
                            <Reveal
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                delay={1}
                                duration={0.5}
                            >
                                <Link href="/classes" passHref>
                                    <Button
                                        rounded="full"
                                        size="lg"
                                        fontWeight="normal"
                                        px={6}
                                        colorScheme="brand"
                                        as="a"
                                    >
                                        Register Now
                                    </Button>
                                </Link>
                            </Reveal>
                            <Reveal
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                delay={1.3}
                                duration={0.5}
                            >
                                <Link href="/donate" passHref>
                                    <Button
                                        rounded="full"
                                        size="lg"
                                        fontWeight="normal"
                                        px={6}
                                        as="a"
                                    >
                                        Donate Now
                                    </Button>
                                </Link>
                            </Reveal>
                            {/* <Reveal
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								delay={1.3}
								duration={0.5}
							>
								<Button
									rounded="full"
									size="lg"
									fontWeight="normal"
									px={6}
									onClick={onOpen}
								>
									How It Works
								</Button>

								@Vismaypikachu make the video then post modal
								<Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>How Do I Get Started?</ModalHeader>
										<ModalCloseButton />
										<ModalBody>
											Attend Classes taught by volunteer highschool and college students. 
											Get help in anything offered completely for FREE. Join other students 
											from all across the globe.
											<br/><br/><br/>
											Watch the following video from our CEO and Founder Vismay Patel to learn 
											more about how to get started learning with Tech Savvy Youth.
										</ModalBody>

										<ModalFooter>
											<Button onClick={onClose}>Close</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>

							</Reveal> */}
                        </Stack>
                    </Stack>
                    <Flex
                        flex={1}
                        justify="center"
                        align="center"
                        position="relative"
                        w="full"
                    >
                        <Reveal
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <Box
                                rounded="2xl"
                                boxShadow="2xl"
                                overflow="hidden"
                                fontSize={0}
                            >
                                <Image
                                    src={headerImage}
                                    alt="Tech Savvy Youth"
                                    priority
                                    placeholder="blur"
                                />
                            </Box>
                        </Reveal>
                    </Flex>
                </Stack>
                <FramerDiv
                    position="absolute"
                    left="50%"
                    top="90vh"
                    style={{ translateX: "-50%" }}
                    animate={{ translateY: [-15, 0, -15] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        type: "spring",
                    }}
                >
                    <FiChevronDown
                        size="2.5rem"
                        color={useColorModeValue("black", "white")}
                        opacity={0.5}
                    />
                </FramerDiv>
            </Container>
            <Box
                bg={useColorModeValue("gray.50", "gray.900")}
                color={useColorModeValue("gray.700", "gray.200")}
                as="section"
            >
                <Container maxW="7xl" px={{ base: 8, md: 12 }} py={24}>
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
                                <Box
                                    rounded="2xl"
                                    overflow="hidden"
                                    fontSize={0}
                                >
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
                                delay={0.1}
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
                                delay={0.2}
                            >
                                <Heading>
                                    Empowering youth through new technologies
                                    and coding
                                </Heading>
                            </Reveal>
                            <Reveal
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                delay={0.3}
                            >
                                <Text color="gray.500">
                                    Tech Savvy Youth is a 501(C)3 non-profit
                                    organization (EIN: 85-4090345). We pride
                                    ourselves on creating fun, hands-on, and
                                    knowledgeable classes that will empower
                                    youth with the skills like the ability to
                                    code, build their own computers, prepare for
                                    the SAT, solve advanced math problems, and
                                    more. In our classes, students will be able
                                    to sit at home and virtually learn STEM
                                    skills whenever they want. We empower,
                                    teach, and support students to learn the
                                    skills that will be necessary in the growing
                                    IT industry and into the future.
                                </Text>
                            </Reveal>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
            <Box
                as="section"
                bg={useColorModeValue("gray.50", "gray.900")}
                color={useColorModeValue("gray.700", "gray.200")}
            >
                <Stack
                    spacing={4}
                    as={Container}
                    maxW="7xl"
                    px={{ base: 8, md: 12 }}
                    py={10}
                    pt={24}
                >
                    <Reveal
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <Heading>Our Team Leads</Heading>
                    </Reveal>
                </Stack>
                <Container maxW="7xl" px={{ base: 8, md: 12 }} py={10} pb={24}>
                    <SimpleGrid
                        columns={{ base: 1, md: 2 }}
                        spacing={{ base: 10, md: 16, lg: 24 }}
                    >
                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <Flex justify="center">
                                <Box maxW="md" w="full">
                                    <Stack align="center" spacing={10}>
                                        <Box
                                            w={200}
                                            h={240}
                                            overflow="hidden"
                                            position="relative"
                                            rounded="2xl"
                                            shadow="2xl"
                                            as={motion.div}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Image
                                                src={vismayImage}
                                                alt="Tech Savvy Youth"
                                                placeholder="blur"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </Box>
                                        <Stack spacing={2} textAlign="center">
                                            <Heading
                                                size="lg"
                                                fontWeight="normal"
                                            >
                                                Vismay Patel
                                            </Heading>
                                            <Text
                                                color="gray.500"
                                                fontSize="lg"
                                            >
                                                Founder & CEO of Tech Savvy
                                                Youth
                                                <br></br>
                                                Student Pilot
                                            </Text>
                                            <Button
                                                colorScheme="brand"
                                                as="a"
                                                href="https://vismaypatel.com"
                                            >
                                                View Portfolio
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Flex>
                        </Reveal>

                        <Reveal
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            delay={0.3}
                        >
                            <Flex justify="center">
                                <Box maxW="md" w="full">
                                    <Stack align="center" spacing={10}>
                                        <Box
                                            w={200}
                                            h={240}
                                            overflow="hidden"
                                            position="relative"
                                            rounded="2xl"
                                            shadow="2xl"
                                            as={motion.div}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Image
                                                src={sejalImage}
                                                alt="Tech Savvy Youth"
                                                placeholder="blur"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </Box>
                                        <Stack spacing={2} textAlign="center">
                                            <Heading
                                                size="lg"
                                                fontWeight="normal"
                                            >
                                                Sejal Parsana
                                            </Heading>
                                            <Text
                                                color="gray.500"
                                                fontSize="lg"
                                            >
                                                Teacher Mentor
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Flex>
                        </Reveal>
                    </SimpleGrid>
                </Container>
            </Box>
            <Box as="section">
                <Stack
                    spacing={4}
                    as={Container}
                    maxW="7xl"
                    px={{ base: 8, md: 12 }}
                    py={10}
                    pt={24}
                    textAlign="center"
                >
                    <Reveal
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                    >
                        <Heading>What Students Say</Heading>
                    </Reveal>
                </Stack>
                <Container maxW="7xl" px={{ base: 8, md: 12 }} py={10} pb={24}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
                        {TESTIMONIALS.map((testimonial) => (
                            <Reveal
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                key={testimonial.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "column",
                                }}
                            >
                                <Flex
                                    flex={1}
                                    rounded="2xl"
                                    p={{ base: 6, lg: 10 }}
                                    direction="column"
                                    justify="space-between"
                                    position="relative"
                                    bg={useColorModeValue("white", "gray.800")}
                                    shadow="lg"
                                    _before={{
                                        content: '""',
                                        position: "absolute",
                                        zIndex: "-1",
                                        height: "full",
                                        width: "full",
                                        filter: "blur(40px)",
                                        transform: "scale(0.95)",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        top: 0,
                                        left: 0,
                                        backgroundImage:
                                            backgrounds[testimonial.id % 4],
                                    }}
                                >
                                    <Text pb={4}>“{testimonial.quote}”</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        - {testimonial.name}, {testimonial.age}
                                    </Text>
                                </Flex>
                            </Reveal>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>
            <ContactForm />
        </>
    );
}

Home.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;

const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%239F7AEA\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%230BC5EA\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%234299E1\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%234299E1'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%239F7AEA'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%230BC5EA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2338B2AC'/%3E%3C/svg%3E")`,
];

const TESTIMONIALS = [
    {
        id: 1,
        name: "Jayden Green",
        age: 16,
        quote: "Two things I liked about the class are the knowledge that I gained and using Python.",
    },
    {
        id: 2,
        name: "Dillon Stidwell",
        age: 14,
        quote: "I enjoyed learning about the code combinations and stuff like that.",
    },
    {
        id: 3,
        name: "Kyla Palmer",
        age: 14,
        quote: "Class was great, I learned a lot and had a good time.",
    },
    {
        id: 4,
        name: "Artemiy Debalchuk",
        age: 15,
        quote: "There was lots of room for questions, and the classes were easy to understand and showed lots of different examples.",
    },
];
