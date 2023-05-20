import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Card,
    CardHeader,
    CardBody,
    Stack,
    Avatar,
    ButtonGroup,
    CardFooter,
    Button,
} from "@chakra-ui/react";
import ExternalNavbar from "@components/ExternalNavbar";
import AuthLayout from "@layouts/AuthLayout";

import ExternalLayout from "@layouts/ExternalLayout";
import { useUser } from "@lib/context";
import { firestore } from "@lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";

export default function MyClasses() {
    const { user } = useUser();

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (!user) return;
        const fetchClasses = async () => {
            const registrationDocs = await getDocs(
                query(
                    collection(firestore, "registrations"),
                    where("studentId", "==", user.uid)
                )
            );

            const registeredClasses = await Promise.all(
                registrationDocs.docs.map((classDoc) => {
                    const classId = classDoc.data().classId;
                    return getDoc(doc(firestore, `classes/${classId}`)).then(
                        (res) => ({
                            ...res.data(),
                            id: res.id,
                        })
                    );
                })
            );

            registeredClasses.sort((a, b) =>
                a.title > b.title ? 1 : b.title > a.title ? -1 : 0
            );
            setClasses(registeredClasses);
        };

        fetchClasses();
    }, [user]);

    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Heading as="h1" size="2xl">
                My Classes
            </Heading>

            <SimpleGrid
                spacing={8}
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                mt={12}
            >
                {classes.map((classValue) => (
                    <Card
                        key={classValue.id}
                        overflow="hidden"
                        size="lg"
                        boxShadow="lg"
                    >
                        <CardHeader bg="brand.500">
                            <Stack spacing={4}>
                                <Heading
                                    color="white"
                                    fontWeight="normal"
                                    size="lg"
                                >
                                    {classValue.title}
                                </Heading>
                                <Text color="brand.100">{classValue.time}</Text>
                            </Stack>
                        </CardHeader>
                        <CardBody py={4}>
                            <Stack>
                                <Text>Instructor:</Text>
                                <Stack
                                    direction="row"
                                    align="center"
                                    spacing={3}
                                >
                                    <Avatar
                                        src={`/assets/images/team/${classValue.instructor?.replace(
                                            /\s+/g,
                                            ""
                                        )}.jpg`}
                                    />
                                    <Text>{classValue.instructor}</Text>
                                </Stack>
                            </Stack>
                        </CardBody>
                        <CardFooter pt={4}>
                            <ButtonGroup spacing={6}>
                                <Link
                                    href={`/classes/${classValue.id}/home`}
                                    passHref
                                >
                                    <Button
                                        as="a"
                                        colorScheme="brand"
                                        rounded="full"
                                        fontWeight="normal"
                                        rightIcon={<BsChevronRight />}
                                    >
                                        Class Home
                                    </Button>
                                </Link>
                                <Link
                                    href={`/classes/${classValue.id}`}
                                    passHref
                                >
                                    <Button
                                        as="a"
                                        colorScheme="brand"
                                        variant="link"
                                    >
                                        More Info
                                    </Button>
                                </Link>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}

MyClasses.getLayout = (page) => (
    <AuthLayout>
        <ExternalLayout>{page}</ExternalLayout>
    </AuthLayout>
);
