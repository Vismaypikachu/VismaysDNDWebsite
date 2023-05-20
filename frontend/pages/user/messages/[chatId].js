import {
    Avatar,
    Box,
    Center,
    Flex,
    Heading,
    IconButton,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    OrderedList,
    Spinner,
    Stack,
    Text,
    UnorderedList,
    useColorModeValue,
    chakra,
    Image,
} from "@chakra-ui/react";
import ChakraNextLink from "@components/ChakraNextLink";
import ExternalNavbar from "@components/ExternalNavbar";
import MessageDisplay from "@components/MessageDisplay";
import RichTextEditor from "@components/RichTextEditor";
import AuthLayout from "@layouts/AuthLayout";
import MessagesLayout from "@layouts/MessagesLayout";
import { useUser } from "@lib/context";
import { storage } from "@lib/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    limit,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiMoreVertical, FiTrash } from "react-icons/fi";
import { Text as SlateText } from "slate";

export default function Chat({ chatValue }) {
    return (
        <>
            {chatValue ? (
                <ChatPanel chatValue={chatValue} />
            ) : (
                <Center flex={1}>
                    <Spinner color="brand.500" />
                </Center>
            )}
        </>
    );
}

const ChatPanel = ({ chatValue }) => {
    const { user, userDoc } = useUser();
    const messagesQuery =
        chatValue?.ref &&
        query(
            collection(chatValue.ref, "messages"),
            orderBy("createdAt", "desc"),
            limit(20)
        );
    const [messages, loading, error] = useCollection(messagesQuery);

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
                <RichTextEditor
                    onSubmit={(value, rawText) => {
                        // postApi(`/classes/${cid}/messages`, { content: message })
                        addDoc(collection(chatValue?.ref, "messages"), {
                            content: value,
                            createdAt: serverTimestamp(),
                            user: {
                                // uid: user.uid,
                                username: userDoc.username,
                                photoURL: userDoc.photoURL,
                            },
                        });
                        updateDoc(chatValue?.ref, {
                            lastMessage: {
                                content: rawText,
                                username: userDoc.username,
                            },
                            lastMessageAt: serverTimestamp(),
                        });
                        messagesBottom.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "start",
                        });
                    }}
                />
            </Box>
        </Flex>
    );
};

Chat.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <MessagesLayout>{page}</MessagesLayout>
    </AuthLayout>
);
