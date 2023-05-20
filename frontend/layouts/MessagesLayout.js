import { AddIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    WrapItem,
} from "@chakra-ui/react";
import ChakraNextLink from "@components/ChakraNextLink";
import ExternalNavbar from "@components/ExternalNavbar";
import AuthLayout from "@layouts/AuthLayout";

import ExternalLayout from "@layouts/ExternalLayout";
import { useUser } from "@lib/context";
import { firestore, getUserWithUsername } from "@lib/firebase";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiPlus, FiUserPlus, FiHelpCircle } from "react-icons/fi";
import { InfoOutlineIcon } from "@chakra-ui/icons";


import * as Yup from "yup";

export default function MessagesLayout({ children }) {
    const router = useRouter();
    const { chatId } = router.query;

    const { user, userDoc } = useUser();

    const [chatValue, setChatValue] = useState();

    useEffect(() => {
        if (!chatId) return;

        // const fetchChat = async () => {
        //     const chatDoc = await getDoc(doc(firestore, "messages", chatId));

        //     if (!chatDoc.exists()) {
        //         router.push("/user/messages");
        //         return;
        //     }
        //     if (!chatDoc.data().members.includes(userDoc.username)) {
        //         router.push("/user/messages");
        //         return;
        //     }
        //     setChatValue(chatDoc);
        // };
        // fetchChat();

        const chatDocQuery = doc(firestore, "messages", chatId);

        const unsubscribe = onSnapshot(chatDocQuery, (snapshot) => {
            if (!snapshot.exists()) {
                setChatValue(null);
                router.push("/user/messages");
                return;
            }
            if (!snapshot.data().members.includes(userDoc.username)) {
                setChatValue(null);
                router.push("/user/messages");
                return;
            }
            setChatValue(snapshot);
        });

        return unsubscribe;
    }, [chatId, user]);

    return (
        <Flex minH="100vh" h="100vh" pt="60px" align="stretch">
            <MessagesSidebar />

            <Flex flex={7}>
                {React.cloneElement(children, {
                    chatValue,
                })}
            </Flex>

            {chatValue && <MembersSidebar chatValue={chatValue} />}
        </Flex>
    );
}

const MembersSidebar = ({ chatValue }) => {
    const chatData = chatValue.data();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const addUser = async (values, actions) => {
        if (!(await getUserWithUsername(values.username))) {
            actions.setFieldError("username", "User does not exist");
            actions.setSubmitting(false);
            return;
        }
        await updateDoc(chatValue.ref, {
            members: arrayUnion(values.username),
        });
        onClose();
    };

    return (
        <Box
            flex={2}
            borderLeft="1px"
            borderLeftColor={useColorModeValue("gray.200", "gray.700")}
            py={4}
            px={2}
            display={{ base: "none", md: "block" }}
            overflowY="auto"
        >
            <Flex m={4} align="center" justify="space-between">
                <Heading
                    size="sm"
                    fontWeight="normal"
                    display={{ base: "none", md: "block" }}
                >
                    Members - {chatData.members.length}
                </Heading>
                <IconButton
                    aria-label="Add user to chat"
                    icon={<FiUserPlus />}
                    variant="ghost"
                    size="sm"
                    onClick={onOpen}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <Formik
                            initialValues={{ username: "" }}
                            validationSchema={Yup.object({
                                username: Yup.string().required("Required"),
                            })}
                            onSubmit={addUser}
                        >
                            {(props) => (
                                <Form>
                                    <ModalHeader>
                                        Add members to chat
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Field name="username">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors
                                                                .username &&
                                                            form.touched
                                                                .username
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Select members
                                                        </FormLabel>
                                                        <Input
                                                            type="text"
                                                            placeholder="username"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .username
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            isLoading={props.isSubmitting}
                                            mr={3}
                                        >
                                            Add user
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalContent>
                </Modal>
            </Flex>
            {chatData.members.map((member) => (
                <MemberDisplay member={member} key={member} />
            ))}
        </Box>
    );
};

const MemberDisplay = ({ member }) => {
    const [memberData, setMemberData] = useState();

    useEffect(() => {
        if (member) {
            const fetchMember = async () => {
                const memberDoc = await getUserWithUsername(member);
                setMemberData(memberDoc.data());
            };
            fetchMember();
        }
    }, [member]);

    return (
        <ChakraNextLink
            href={`/u/${memberData?.username}`}
            _hover={{ textDecoration: "none" }}
        >
            <Flex
                px={4}
                py={2}
                align="center"
                gap={3}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                borderRadius="md"
                // cursor="pointer"
            >
                <Avatar src={memberData?.photoURL} size="sm" />
                <Text>{memberData?.username}</Text>
            </Flex>
        </ChakraNextLink>
    );
};

const MessagesSidebar = () => {
    const router = useRouter();
    const { user, userDoc } = useUser();

    const [value, loading, error] = useCollection(
        query(
            collection(firestore, "messages"),
            where("members", "array-contains", userDoc.username),
            orderBy("lastMessageAt", "desc")
        )
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const createChat = async (values, actions) => {
        const docRef = await addDoc(collection(firestore, "messages"), {
            name: values.name,
            members: [userDoc.username],
            createdAt: serverTimestamp(),
            lastMessageAt: serverTimestamp(),
            lastMessage: {
                username: userDoc.username,
                content: "Chat Created",
            },
        });

        router.push(`/user/messages/${docRef.id}`);
        onClose();
    };

    return (
        <Box
            flex={2}
            py={4}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            minWidth={0}
            overflowY="auto"
        >
            <Flex m={6} align="center" justify="space-between">
                <Heading
                    size="md"
                    fontWeight="normal"
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                >
                    Messaging Center
                    <Tooltip hasArrow placement='bottom' label="If you need to message an administrator, create a chat with vismaypikachu (his username)">
                        <InfoOutlineIcon fontSize="sm" color="gray.500" ml={2} />
                    </Tooltip>
                </Heading>
                <IconButton
                    aria-label="New Chat"
                    icon={<AddIcon />}
                    size="sm"
                    onClick={onOpen}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <Formik
                            initialValues={{ name: "" }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .min(2, "Must be 2 characters or more")
                                    .max(50, "Must be 50 characters or less")
                                    .required("Required"),
                            })}
                            onSubmit={createChat}
                        >
                            {(props) => (
                                <Form>
                                    <ModalHeader>Create a new chat</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack spacing={4}>
                                            <Field name="name">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.name &&
                                                            form.touched.name
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Give your chat a
                                                            name:
                                                        </FormLabel>
                                                        <Input
                                                            type="text"
                                                            placeholder="Name"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.name}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            isLoading={props.isSubmitting}
                                            mr={3}
                                        >
                                            Create chat
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalContent>
                </Modal>
            </Flex>
            {loading ? (
                <Center>
                    <Spinner color="brand.500" />
                </Center>
            ) : (
                value?.docs?.map((doc) => <ChatItem doc={doc} key={doc.id} />)
            )}
        </Box>
    );
};

const ChatItem = ({ doc }) => {
    const router = useRouter();

    const data = doc.data();

    const active = router.query.chatId === doc.id;

    return (
        <ChakraNextLink
            href={`/user/messages/${doc.id}`}
            _hover={{ textDecoration: "none" }}
            minWidth={0}
        >
            <Flex
                minWidth={0}
                alignItems="center"
                justifyContent="flex-start"
                py={4}
                px={{ base: 4, md: 6 }}
                transition="all 0.2s"
                _hover={{
                    bg: "brand.50",
                    color: "brand.500",
                }}
                _dark={{
                    color: active ? "brand.300" : "gray.500",
                    borderLeftColor: active ? "brand.300" : "transparent",
                    _hover: {
                        bg: "gray.700",
                        color: "brand.300",
                    },
                }}
                color={active ? "brand.500" : "gray.700"}
                gap={4}
                borderLeftWidth="3px"
                borderLeftColor={active ? "brand.500" : "transparent"}
            >
                <Stack spacing={0} minWidth={0}>
                    {/* <Stack spacing={0}> */}
                    <Text>{data?.name}</Text>
                    <Text
                        fontSize="sm"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflowX="hidden"
                        width="100%"
                    >
                        {data?.lastMessage?.username}:{" "}
                        {data?.lastMessage?.content}
                    </Text>
                </Stack>
            </Flex>
        </ChakraNextLink>
    );
};
