import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import AuthLayout from "@layouts/AuthLayout";
import ExternalLayout from "@layouts/ExternalLayout";
import { postApi } from "@lib/api";
import { useUser } from "@lib/context";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    limit,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { firestore } from "lib/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { FiChevronRight, FiMoreVertical, FiTrash } from "react-icons/fi";

import { DateTime } from "luxon";
import ExternalNavbar from "@components/ExternalNavbar";
import ClassHomeLayout from "@layouts/ClassHomeLayout";
import ChakraNextLink from "@components/ChakraNextLink";

export default function Announcements({ classValue, isInstructor }) {
    // const router = useRouter();
    // const { cid } = router.query;

    const { user, userDoc } = useUser();

    // const [classValue, setClassValue] = useState();

    // useEffect(() => {
    //     if (!cid) return;

    //     const fetchClass = async () => {
    //         if (user) {
    //             const registrationDoc = await getDoc(
    //                 doc(firestore, "registrations", `${user.uid}_${cid}`)
    //             );
    //             if (!registrationDoc.exists()) {
    //                 router.push("/classes");
    //             }
    //         }

    //         const classDoc = await getDoc(doc(firestore, "classes", cid));
    //         if (!classDoc.exists()) {
    //             router.push("/classes");
    //         } else {
    //             setClassValue(classDoc);
    //         }
    //     };

    //     fetchClass();
    // }, [cid, user]);

    const messagesQuery =
        classValue?.ref &&
        query(
            collection(classValue.ref, "announcements"),
            orderBy("createdAt", "desc"),
            limit(20)
        );
    const [messages, loading, error] = useCollection(messagesQuery);
    const classData = classValue?.data();

    // useEffect(() => {
    //     messagesBottom.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    const messagesBottom = useRef();

    return (
        <Flex direction="column" flex={1} pb={10}>
            <Flex position="relative" flex="1 1 0">
                <Stack
                    spacing={4}
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    overflowY="scroll"
                    py={30}
                    direction="column-reverse"
                >
                    <div ref={messagesBottom} />
                    {messages?.docs?.map((message) => (
                        <MessageDisplay
                            key={message.id}
                            message={message.data()}
                            messageRef={message.ref}
                        />
                    ))}
                </Stack>
            </Flex>
            <Box px={6}>
                {isInstructor && (
                    <RichTextEditor
                        onSubmit={(value) => {
                            // postApi(`/classes/${cid}/messages`, { content: message })
                            addDoc(
                                collection(classValue?.ref, "announcements"),
                                {
                                    content: value,
                                    createdAt: serverTimestamp(),
                                    user: {
                                        // uid: user.uid,
                                        username: userDoc.username,
                                        photoURL: userDoc.photoURL,
                                    },
                                }
                            );
                            messagesBottom.current?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                    />
                )}
            </Box>
        </Flex>
    );
}

const RichTextEditor = ({ onSubmit }) => {
    const [message, setMessage] = useState("");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(message);
                setMessage("");
            }}
        >
            <Input
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </form>
    );
};

const MessageDisplay = ({ message, messageRef }) => {
    const { userDoc } = useUser();
    return (
        <Flex
            direction="row"
            gap={4}
            padding={2}
            pl={6}
            pr={12}
            role="group"
            _hover={{
                bg: useColorModeValue(
                    "rgba(0, 0, 0, 0.03)",
                    "rgba(0, 0, 0, 0.06)"
                ),
            }}
            // _hover={{ bg: "blackAlpha.50" }}
            transition="background-color 0.2s ease"
        >
            <ChakraNextLink
                href={`/u/${message.user.username}`}
                textDecoration="none"
            >
                <Avatar
                    src={message.user.photoURL}
                    alt="User profile picture"
                />
            </ChakraNextLink>
            <Box minW="10%">
                <Flex align="center" gap={3}>
                    <ChakraNextLink
                        href={`/u/${message.user.username}`}
                        _hover={{ textDecoration: "none" }}
                    >
                        <Text fontWeight="semibold">
                            {message.user.username}
                        </Text>
                    </ChakraNextLink>
                    <Text fontSize="xs" color="gray.500">
                        {DateTime.fromJSDate(
                            message.createdAt?.toDate()
                        ).toRelative()}
                    </Text>
                </Flex>
                <Text
                    overflowWrap="break-word"
                    whiteSpace="break-spaces"
                    maxW="full"
                    overflow="hidden"
                    minWidth="40%"
                >
                    {message.content}
                </Text>
            </Box>
            {message.user.username === userDoc.username && (
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                size="sm"
                                display={isOpen ? "flex" : "none"}
                                _groupHover={{ display: "flex" }}
                                position="absolute"
                                right={4}
                                boxShadow="base"
                                zIndex="dropdown"
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<FiTrash />}
                                    onClick={() => deleteDoc(messageRef)}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            )}

            {/* </Box> */}
        </Flex>
    );
};

Announcements.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <ClassHomeLayout>{page}</ClassHomeLayout>
        {/* <ExternalLayout>{page}</ExternalLayout> */}
    </AuthLayout>
);
