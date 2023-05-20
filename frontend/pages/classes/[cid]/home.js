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

export default function Class({ classValue }) {
    // const router = useRouter();
    // const { cid } = router.query;

    const { user, userDoc } = useUser();

    const classData = classValue?.data();

    console.log(classData);

    return (
        <Container mt={16} px={{ base: 8, md: 12 }} py={10} maxW="7xl">
            <Heading mb={2}>{classData?.title}</Heading>
            <Text display={{ base: "none", md: "block" }}>
                {classData?.time}
            </Text>

            <Button
                href={`${classData?.zoomLink}`}
                mt={6}
                colorScheme="brand"
                as="a"
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                mb={20}
            >
                Join Class
            </Button>
            <Text>
                If you are a first time student, please join the Discord Server
                and let your instructor know that you are available to take your
                class. Some students register but never show up. If your class
                is new, this is imperative. When we switch over to the website
                chat, you should be able to message there.
                <br />
                <u>Please use your full legal name as your username.</u>
            </Text>
            <Button
                href="https://discord.com/invite/JBEwzpznrq"
                mt={6}
                colorScheme="brand"
                as="a"
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
            >
                Join Discord Server
            </Button>
        </Container>
    );
}

Class.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <ClassHomeLayout>{page}</ClassHomeLayout>
        {/* <ExternalLayout>{page}</ExternalLayout> */}
    </AuthLayout>
);
