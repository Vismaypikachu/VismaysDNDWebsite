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
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Thead,
    Td,
    Th,
    Tr,
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
    getDocs,
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

export default function Students({ classValue, isInstructor }) {
    // const router = useRouter();
    // const { cid } = router.query;

    const { user, userDoc } = useUser();

    const classData = classValue?.data();

    const [registrationSnapshot, setRegistrationSnapshot] = useState();

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

            const registeredStudents = await Promise.all(
                registrationDocs.docs.map((studentDoc) => {
                    const studentId = studentDoc.data().studentId;
                    return getDoc(doc(firestore, `users/${studentId}`)).then(
                        (res) => ({
                            ...res.data(),
                            registrationCreatedAt: studentDoc.data().createdAt,
                        })
                    );
                })
            );
            setRegistrationSnapshot(registeredStudents);
        };

        fetchRegistrationSnapshot();
    }, [classValue]);

    return (
        <Container mt={16} px={{ base: 8, md: 12 }} py={10} maxW="7xl">
            <Heading>{classData?.title} Students</Heading>

            <TableContainer mt={12}>
                <Table variant="striped">
                    <TableCaption>
                        Contact admin@techsavvyyouth.org for any questions
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Student Name</Th>
                            {(userDoc?.role === "admin" ||
                                userDoc?.role === "staff") && (
                                <>
                                    <Th>Student Email</Th>
                                    <Th>Registration Time</Th>
                                    <Th>Student Age</Th>
                                    <Th>Student Grade</Th>
                                </>
                            )}
                        </Tr>
                    </Thead>

                    <Tbody>
                        {registrationSnapshot?.map((document) => (
                            <Tr key={document.id}>
                                <Td>{document?.displayName}</Td>
                                {(userDoc?.role === "admin" ||
                                    userDoc?.role === "staff") && (
                                    <>
                                        <Td>{document?.email}</Td>
                                        <Td>
                                            {document?.registrationCreatedAt
                                                ? DateTime.fromISO(
                                                      document?.registrationCreatedAt
                                                  ).toLocaleString(
                                                      DateTime.DATETIME_SHORT
                                                  )
                                                : "-"}
                                        </Td>
                                        <Td>{document?.age || "-"}</Td>
                                        <Td>{document?.grade || "-"}</Td>
                                    </>
                                )}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

Students.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <ClassHomeLayout>{page}</ClassHomeLayout>
    </AuthLayout>
);
