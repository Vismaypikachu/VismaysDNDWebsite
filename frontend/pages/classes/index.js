import { useCollection } from "react-firebase-hooks/firestore";
import ExternalLayout from "@layouts/ExternalLayout";
import { collection, orderBy, query, where } from "firebase/firestore";
import { firestore } from "lib/firebase";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    FiHome,
    Flex,
    Heading,
    HStack,
    LinkBox,
    LinkOverlay,
    Spacer,
    Spinner,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Classes() {
    const [value] = useCollection(
        query(
            collection(firestore, "classes"),
            where("dates", "==", "2023Q1"),
            orderBy("index")
        )
    );
    return (
        <Container
            mt={16}
            px={{ base: 8, md: 12 }}
            py={10}
            maxW="7xl"
            minH="100vh"
            display="flex"
            alignItems="center"
        >
            {!value ? (
                <Center flex={1}>
                    <Spinner color="brand.500" />
                </Center>
            ) : (
                <HStack alignItems="center">
                    {/* <Flex spacing={10} w="20%">
                        <ClassFilter/> @raymon-zhang PLEASE MAKE FILTER WORK 
                    </Flex> */}
                    <Stack spacing={8}>
                        <Stack
                            direction="row"
                            align="center"
                            justify="stretch"
                            spacing={8}
                        >
                            <LinkBox
                                as={Box}
                                flex={1}
                                bgGradient="linear(to-bl, cyan.500, blue.500)"
                                p={8}
                                rounded="lg"
                                color="white"
                                shadow="xl"
                            >
                                <Stack spacing={4}>
                                    <Heading fontWeight="normal" size="lg">
                                        <Link
                                            href="/events/summercamp2023"
                                            passHref
                                        >
                                            <LinkOverlay>
                                                TSY Summer Camp 2.0
                                            </LinkOverlay>
                                        </Link>
                                    </Heading>
                                    <Text fontSize="lg">
                                        Register for our 2023 STEM Summer Camp
                                    </Text>
                                </Stack>
                            </LinkBox>
                            <LinkBox
                                as={Box}
                                flex={1}
                                bgGradient="linear(to-bl, brand.500, purple.500)"
                                p={8}
                                rounded="lg"
                                color="white"
                                shadow="xl"
                            >
                                <Stack spacing={4}>
                                    <Heading fontWeight="normal" size="lg">
                                        <Link
                                            href="/events/workshops2023"
                                            passHref
                                        >
                                            <LinkOverlay>
                                                2023 Summer Workshops
                                            </LinkOverlay>
                                        </Link>
                                    </Heading>
                                    <Text fontSize="lg">
                                        Our NEW 2023 Summer Workshops
                                    </Text>
                                </Stack>
                            </LinkBox>
                        </Stack>
                        {value.docs.map((doc) => (
                            <ClassDisplay
                                classData={doc.data()}
                                key={doc.id}
                                id={doc.id}
                            />
                        ))}
                    </Stack>
                </HStack>
            )}
        </Container>
    );
}

const ClassFilter = ({ classData, id }) => {
    return (
        <Box
            flex={{ base: 0, md: 2 }}
            py={4}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
        >
            <Heading
                size="md"
                mb={3}
                fontWeight="normal"
                display={{ base: "none", md: "block" }}
            >
                Classes Filter
            </Heading>
            <Stack>
                <Checkbox checked name="All">
                    All
                </Checkbox>{" "}
                {/* @raymon-zhang this should come auto prechecked, then when filter checks are checked, it should auto come off. Page loads off of what is currently checked */}
                <Checkbox name="Math">Math</Checkbox>
                <Checkbox name="SAT Prep">SAT Prep</Checkbox>
                <Checkbox name="Science">Science</Checkbox>
                <Checkbox name="Computer Hardware">Computer Hardware</Checkbox>
                <Checkbox name="Computer Programming">
                    Computer Programming
                </Checkbox>
                <Checkbox name="Production Software">
                    Production Software
                </Checkbox>
            </Stack>
        </Box>
    );
};

Classes.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;

const ClassDisplay = ({ classData, id }) => {
    return (
        <Box boxShadow="xl" rounded="xl" overflow="hidden">
            <Flex direction={{ base: "column", md: "row" }}>
                <Box bgColor="brand.500" color="white" p={8} flex={2}>
                    <Flex direction="column" h="full">
                        <Text
                            textTransform="uppercase"
                            // fontSize="md"
                            // letterSpacing="widest"
                            color="brand.100"
                        >
                            {classData.ages}
                        </Text>
                        <Heading size="lg" fontWeight="normal">
                            {classData.title}
                        </Heading>
                        <Spacer />
                        <Text color="brand.100">{classData.time}</Text>
                    </Flex>
                </Box>
                <Stack
                    bgColor={useColorModeValue("white", "gray.700")}
                    p={8}
                    flex={5}
                    spacing={6}
                >
                    {/* @raymon-zhang add a check if they have registered for this class and a green banner*/}
                    {/* <CheckCircleIcon w={5} h={5} color='green'/> */}

                    <Text>{classData.description}</Text>
                    <Flex justify="space-between" align="end">
                        {classData.instructor ? (
                            <Stack>
                                <Text>Instructor: </Text>
                                <Stack
                                    direction="row"
                                    align="center"
                                    spacing={3}
                                >
                                    <Box
                                        borderRadius="full"
                                        fontSize={0}
                                        overflow="hidden"
                                    >
                                        <Image
                                            src={`/assets/images/team/${classData.instructor?.replace(
                                                /\s+/g,
                                                ""
                                            )}.jpg`}
                                            width={50}
                                            height={50}
                                            layout="fixed"
                                            objectFit="cover"
                                        />
                                    </Box>
                                    <Text>{classData.instructor}</Text>
                                </Stack>
                            </Stack>
                        ) : (
                            <Spacer />
                        )}
                        {/* <Link href={`/classes/${id}/home`} passHref>
                            <Button
                                as="a"
                                colorScheme="brand"
                                rounded="full"
                                fontWeight="normal"
                                px={6}
                                boxShadow="0px 10px 25px -10px rgba(0, 0, 255, 0.5)"
                            >
                                Class Home
                            </Button>
                        </Link> */}
                        <Link href={`/classes/${id}`} passHref>
                            <Button
                                as="a"
                                colorScheme="brand"
                                rounded="full"
                                fontWeight="normal"
                                px={6}
                                // boxShadow="0px 10px 25px -10px rgba(0, 0, 255, 0.5)"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    );
};
