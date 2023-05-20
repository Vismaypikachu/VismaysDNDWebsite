import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import AuthLayout from "@layouts/AuthLayout";
import ExternalLayout from "@layouts/ExternalLayout";
import { postApi } from "@lib/api";
import { useUser } from "@lib/context";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { FiChevronRight } from "react-icons/fi";

export default function Class() {
    const router = useRouter();
    const { cid } = router.query;

    const { user } = useUser();

    const [classValue, setClassValue] = useState();
    const [registered, setRegistered] = useState();
    const [registeredPending, setRegisteredPending] = useState();

    // const [value] = useDocument(doc(firestore, "classes", cid ?? "no"));

    const register = async () => {
        const { response, error, status } = await postApi("register", {
            classId: cid,
        });
        if (error) {
            return;
        }
    };

    const unregister = async () => {
        const { response, error, status } = await postApi("register", {
            classId: cid,
            unregister: true,
        });
        if (error) {
            return;
        }
        router.reload();
    };

    useEffect(() => {
        if (!cid) return;

        const fetchClass = async () => {
            const classDoc = await getDoc(doc(firestore, "classes", cid));
            if (!classDoc.exists()) {
                router.push("/classes");
            } else {
                setClassValue(classDoc);
            }

            if (user) {
                const registrationDoc = await getDoc(
                    doc(firestore, "registrations", `${user.uid}_${cid}`)
                );
                const registrationPendingDoc = await getDoc(
                    doc(
                        firestore,
                        "registrations_pending",
                        `${user.uid}_${cid}`
                    )
                );
                setRegistered(registrationDoc.exists());
                setRegisteredPending(registrationPendingDoc.exists());
            }
        };

        fetchClass();
    }, [cid, user]);

    const classData = classValue?.data();

    const {
        isOpen: isOpenRegister,
        onOpen: onOpenRegister,
        onClose: onCloseRegister,
    } = useDisclosure();
    const {
        isOpen: isOpenUnregister,
        onOpen: onOpenUnregister,
        onClose: onCloseUnregister,
    } = useDisclosure();

    return (
        <Container
            mt={16}
            px={{ base: 8, md: 12 }}
            py={10}
            maxW="7xl"
            minH="100vh"
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                flex={1}
                justify="space-between"
                align={{ base: "start", md: "center" }}
            >
                <Stack spacing={5}>
                    <Heading fontSize="5xl">{classData?.title}</Heading>
                    <Stack spacing={3}>
                        <Text fontSize="xl">Instructor: </Text>
                        <Stack direction="row" align="center" spacing={4}>
                            <Box
                                borderRadius="full"
                                fontSize={0}
                                overflow="hidden"
                            >
                                <Image
                                    src={`/assets/images/team/${classData?.instructor?.replace(
                                        /\s+/g,
                                        ""
                                    )}.jpg`}
                                    width={50}
                                    height={50}
                                    layout="fixed"
                                    objectFit="cover"
                                />
                            </Box>
                            <Text fontSize="lg">{classData?.instructor}</Text>
                        </Stack>
                    </Stack>
                </Stack>

                {registered === false && registeredPending === false && (
                    <Button
                        colorScheme="brand"
                        rounded="full"
                        size="lg"
                        boxShadow="0px 8px 25px -5px #0D4AF2"
                        mt={{ base: 6, md: 0 }}
                        rightIcon={<FiChevronRight />}
                        onClick={onOpenRegister}
                        // isLoading={registered === undefined}
                        // disabled={
                        //     registered !== false || registeredPending !== false
                        // }
                    >
                        Register
                    </Button>
                )}

                {registered === false && registeredPending === true && (
                    <Stack
                        mt={{ base: 6, md: 0 }}
                        direction={{ base: "row", md: "column" }}
                        spacing={4}
                    >
                        <Button
                            colorScheme="brand"
                            rounded="full"
                            size="lg"
                            boxShadow="0px 8px 25px -5px #0D4AF2"
                            mt={{ base: 6, md: 0 }}
                            disabled
                        >
                            Pending Approval
                        </Button>
                        <Button
                            colorScheme="brand"
                            size="md"
                            rounded="full"
                            variant="link"
                            onClick={onOpenUnregister}
                        >
                            Unregister
                        </Button>
                    </Stack>
                )}

                {registered && (
                    <Stack
                        mt={{ base: 6, md: 0 }}
                        direction={{ base: "row", md: "column" }}
                        spacing={4}
                    >
                        <Link href={`/classes/${cid}/home`} passHref>
                            <Button
                                as="a"
                                colorScheme="brand"
                                size="lg"
                                rounded="full"
                                rightIcon={<FiChevronRight />}
                            >
                                Class Home
                            </Button>
                        </Link>
                        <Button
                            colorScheme="brand"
                            size="md"
                            rounded="full"
                            variant="link"
                            onClick={onOpenUnregister}
                        >
                            Unregister
                        </Button>
                    </Stack>
                )}
            </Flex>

            <Flex mt={5}>
                <Stack flex={3} mt={5}>
                    <Text color="gray.500">{classData?.description}</Text>
                </Stack>
                <Spacer flex={1} />
            </Flex>

            {/* Register Confirm Modal */}
            <Modal isOpen={isOpenRegister} onClose={onCloseRegister}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Registration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You are registering for the {classData?.title} Class.
                        Your registration will be pending approval. Depending on
                        Admin availibility, this may take up to 24 hours. If the
                        registration is not approved within 24 hours, please
                        contact Support.
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="brand"
                            mr={3}
                            onClick={() => {
                                register();
                                router.reload();
                            }}
                        >
                            Confirm
                        </Button>
                        <Button onClick={onCloseRegister}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Unregister Modal */}
            <Modal isOpen={isOpenUnregister} onClose={onCloseUnregister}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Unregister?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you would like to unregister from{" "}
                        {classData?.title}?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="brand" mr={3} onClick={unregister}>
                            Confirm
                        </Button>
                        <Button onClick={onCloseUnregister}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

Class.getLayout = (page) => (
    <AuthLayout>
        <ExternalLayout>{page}</ExternalLayout>
    </AuthLayout>
);
