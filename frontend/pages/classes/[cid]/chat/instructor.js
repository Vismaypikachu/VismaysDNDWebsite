import {
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Image,
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
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { firestore, storage } from "lib/firebase";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
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

export default function Instructor({ classValue, isInstructor }) {
    const { user, userDoc } = useUser();

    const messagesQuery =
        classValue?.ref &&
        query(
            collection(classValue.ref, "instructorDM"),
            where("studentUsername", "==", userDoc.username),
            orderBy("createdAt", "desc"),
            limit(20)
        );

    const [messages, loading, error] = useCollection(messagesQuery);
    const classData = classValue?.data();

    // const people = useMemo(() => {
    //     const people = [];
    //     messages?.docs?.forEach((message) => {
    //         const { user } = message.data();
    //         if (
    //             user.username != userDoc.username &&
    //             !people.find((p) => p.username === user.username)
    //         ) {
    //             people.push(user);
    //         }
    //     });
    //     return people;
    // }, [messages]);

    const messagesBottom = useRef();

    return (
        <Flex flex={1}>
            {/* {isInstructor && (
                <Stack bg="gray.100" px={4}>
                    {people.map((person) => (
                        <Flex
                            key={person.username}
                            alignItems="center"
                            py={2}
                            px={4}
                            borderRadius="md"
                            _hover={{ bg: "gray.200" }}
                            cursor="pointer"
                        >
                            <Avatar
                                size="sm"
                                name={person.username}
                                src={person.photoURL}
                            />
                            <Text ml={2}>{person.username}</Text>
                        </Flex>
                    ))}
                </Stack>
            )} */}
            {isInstructor ? (
                <InstructorView classValue={classValue} />
            ) : (
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
                                addDoc(
                                    collection(classValue?.ref, "instructorDM"),
                                    {
                                        content: value,
                                        createdAt: serverTimestamp(),
                                        user: {
                                            // uid: user.uid,
                                            username: userDoc.username,
                                            photoURL: userDoc.photoURL,
                                        },
                                        studentUsername: userDoc.username,
                                    }
                                );
                                messagesBottom.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "end",
                                    inline: "start",
                                });
                            }}
                        />
                    </Box>
                </Flex>
            )}
        </Flex>
    );
}

const InstructorView = ({ classValue }) => {
    const { user, userDoc } = useUser();

    const [selectedStudent, setSelectedStudent] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesBottom = useRef();

    const [students, setStudents] = useState();

    useEffect(() => {
        if (!classValue) return;

        const fetchRegistrationSnapshot = async () => {
            const classID = classValue?.id;
            const registrationDocs = await getDocs(
                query(
                    collection(firestore, "registrations"),
                    where("classId", "==", classID)
                )
            );

            const registeredStudents = (
                await Promise.all(
                    registrationDocs.docs.map((studentDoc) => {
                        const studentId = studentDoc.data().studentId;
                        return getDoc(
                            doc(firestore, `users/${studentId}`)
                        ).then((res) => res.data());
                    })
                )
            ).filter((student) => student.username !== userDoc.username);
            setStudents(registeredStudents);
        };

        fetchRegistrationSnapshot();
    }, [classValue]);

    useEffect(() => {
        if (!classValue) return;
        if (!selectedStudent) return;

        const messagesQuery = query(
            collection(classValue.ref, "instructorDM"),
            where("studentUsername", "==", selectedStudent),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            setMessages(snapshot.docs);
        });

        return unsubscribe;
    }, [classValue, selectedStudent]);

    return (
        <Flex flex={1}>
            <Stack
                bg={useColorModeValue("gray.50", "gray.900")}
                px={{ base: 0, md: 4 }}
                py={4}
                flex={{ base: 0, md: 1 }}
                borderRight="1px"
                borderRightColor={useColorModeValue("gray.200", "gray.700")}
            >
                {students?.map((person) => (
                    <Flex
                        key={person.username}
                        alignItems="center"
                        py={3}
                        px={2}
                        borderRadius="md"
                        _hover={{ bg: "gray.100" }}
                        cursor="pointer"
                        onClick={() => setSelectedStudent(person.username)}
                        bg={
                            person.username == selectedStudent
                                ? useColorModeValue("brand.50", "gray.700")
                                : ""
                        }
                        _dark={{
                            _hover: {
                                bg: "gray.800",
                            },
                        }}
                    >
                        <Avatar
                            size={{ base: "xs", md: "sm" }}
                            name={person.username}
                            src={person.photoURL}
                        />
                        <Text ml={3} display={{ base: "none", md: "block" }}>
                            {person.username}
                        </Text>
                    </Flex>
                ))}
            </Stack>
            <Flex direction="column" flex={6} pb={10}>
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
                        {messages?.map((message) => (
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
                            console.log(value);
                            // postApi(`/classes/${cid}/messages`, { content: message })
                            addDoc(
                                collection(classValue?.ref, "instructorDM"),
                                {
                                    content: value,
                                    createdAt: serverTimestamp(),
                                    user: {
                                        // uid: user.uid,
                                        username: userDoc.username,
                                        photoURL: user.photoURL,
                                    },
                                    studentUsername: selectedStudent,
                                }
                            );
                            messagesBottom.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "end",
                                inline: "start",
                            });
                        }}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};

Instructor.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <ClassHomeLayout>{page}</ClassHomeLayout>
    </AuthLayout>
);
