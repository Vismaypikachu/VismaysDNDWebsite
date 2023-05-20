import {
    Box,
    Center,
    Flex,
    Heading,
    Spinner,
    Text,
    Icon,
} from "@chakra-ui/react";
import ExternalNavbar from "@components/ExternalNavbar";
import AuthLayout from "@layouts/AuthLayout";
import MessagesLayout from "@layouts/MessagesLayout";
import { useUser } from "@lib/context";
import { firestore } from "@lib/firebase";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { MdMessage } from "react-icons/md";

export default function Messages() {
    const { userDoc } = useUser();

    const router = useRouter();

    const [mostRecentDocId, setMostRecentDocId] = useState();

    const [done, setDone] = useState(false);

    useEffect(() => {
        const getMostRecent = async () => {
            const querySnapshot = await getDocs(
                query(
                    collection(firestore, "messages"),
                    where("members", "array-contains", userDoc.username),
                    orderBy("lastMessageAt", "desc"),
                    limit(1)
                )
            );
            setMostRecentDocId(querySnapshot.docs[0]?.id);
            setDone(true);
        };

        getMostRecent();
    }, [userDoc]);

    useEffect(() => {
        if (mostRecentDocId) {
            router.push(`/user/messages/${mostRecentDocId}`);
        }
    }, [mostRecentDocId]);

    return (
        <Center flex={1} mb={24}>
            {done ? (
                <Flex direction="column" align="center">
                    <Box
                        bg="brand.50"
                        rounded="full"
                        p={16}
                        fontSize={0}
                        mb={16}
                    >
                        <Icon
                            as={MdMessage}
                            w={16}
                            h={16}
                            color="brand.500"
                            fontSize={0}
                        />
                    </Box>
                    <Heading size="xl" fontWeight="normal" mb={6}>
                        Welcome to the Messaging Center.
                    </Heading>
                    <Text color="gray.500" fontSize="lg">
                        Create a new chat to get started.
                    </Text>
                </Flex>
            ) : (
                <Spinner color="brand.500" />
            )}
        </Center>
    );
}

Messages.getLayout = (page) => (
    <AuthLayout>
        <ExternalNavbar />
        <MessagesLayout>{page}</MessagesLayout>
    </AuthLayout>
);
