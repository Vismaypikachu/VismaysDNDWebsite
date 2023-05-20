import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Input,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    OrderedList,
    Spacer,
    Stack,
    Text,
    UnorderedList,
    useColorModeValue,
    chakra,
    Image,
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
import { firestore, storage } from "lib/firebase";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { FiChevronRight, FiMoreVertical, FiTrash } from "react-icons/fi";

import { DateTime } from "luxon";
import ExternalNavbar from "@components/ExternalNavbar";
import ClassHomeLayout from "@layouts/ClassHomeLayout";

import RichTextEditor from "@components/RichTextEditor";

import { Text as SlateText } from "slate";
import escapeHTML from "escape-html";
import { getDownloadURL, ref } from "firebase/storage";
import ChakraNextLink from "@components/ChakraNextLink";
import MessageDisplay from "@components/MessageDisplay";

export default function General({ classValue }) {
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
            collection(classValue.ref, "general"),
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
                <RichTextEditor
                    onSubmit={(value) => {
                        // postApi(`/classes/${cid}/messages`, { content: message })
                        addDoc(collection(classValue?.ref, "general"), {
                            content: value,
                            createdAt: serverTimestamp(),
                            user: {
                                // uid: user.uid,
                                username: userDoc.username,
                                photoURL: userDoc.photoURL,
                            },
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
}

General.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <ClassHomeLayout>{page}</ClassHomeLayout>
        {/* <ExternalLayout>{page}</ExternalLayout> */}
    </AuthLayout>
);
