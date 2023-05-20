import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import ExternalLayout from "@layouts/ExternalLayout";
import { useUser } from "@lib/context";
import { getUserWithUsername } from "@lib/firebase";
import { DateTime } from "luxon";

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    const data = userDoc.data();

    return {
        props: {
            user: {
                ...data,
                createdAt: data.createdAt.toMillis(),
            },
        },
    };
}
export default function UserProfile({ user }) {
    const { userDoc } = useUser();
    return (
        <Container
            maxW="7xl"
            mt={24}
            px={{ base: 8, md: 12 }}
            py={10}
            minH="100vh"
        >
            <Stack direction="row" spacing={8} align="center">
                <Box w={48} h={48} minW={48}>
                    <Avatar
                        src={user?.photoURL}
                        size="full"
                        name={user?.displayName}
                    />
                </Box>
                <Box>
                    <Heading as="h1" size="2xl">
                        {user?.displayName}
                        {(user?.role === "admin" ||
                            user?.role === "teacher" ||
                            user?.role === "staff") && (
                            <Badge
                                fontSize="lg"
                                ml={3}
                                colorScheme={
                                    {
                                        admin: "red",
                                        teacher: "blue",
                                        staff: "orange",
                                    }[user?.role]
                                }
                                borderRadius="full"
                                px={2}
                                py={1}
                            >
                                {user?.role}
                            </Badge>
                        )}
                    </Heading>
                    <Text fontSize="xl" color="gray.500" mt={0}>
                        @{user.username}
                    </Text>
                    <Text color="gray.500" mt={2}>
                        Joined:{" "}
                        {DateTime.fromJSDate(
                            new Date(user.createdAt)
                        ).toLocaleString()}
                    </Text>
                    {/* @raymon-zhang make this so that it creates a DM chat with them, OR if there already is one, redirects them to that. All DMs must have the chat name the Display name of the opposite person (like Teams), but if its a group chat, it can be renamed */}
                    <Stack direction="row" spacing={4} mt={4}>
                        {userDoc?.username !== user.username && (
                            <Button>Direct Message</Button>
                        )}
                        {user?.bio ? (
                            <Text color="gray.500" mt={4}>
                                {user.bio}
                            </Text>
                        ) : (
                            userDoc?.username === user.username && (
                                <Button variant="link" colorScheme="brand">
                                    Add a bio
                                </Button>
                            )
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
}

UserProfile.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
