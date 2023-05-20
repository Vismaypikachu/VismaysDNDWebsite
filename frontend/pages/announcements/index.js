import {
    Box,
    Container,
    Image,
    Heading,
    ListItem,
    List,
    Text,
    UnorderedList,
    useColorModeValue,
    Stack,
    StackDivider,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

import ExternalLayout from "@layouts/ExternalLayout";

import { getSortedPostsData } from "@lib/staticMD";
import { DateTime } from "luxon";
import Link from "next/link";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
export default function Announcements({ allPostsData }) {
    return (
        <Container
            maxW="7xl"
            mt={24}
            px={{ base: 8, md: 12 }}
            py={10}
            minH="100vh"
        >
            <section>
                <Heading as="h1" size="2xl" mb={8}>
                    Announcements
                </Heading>
                <Wrap
                    spacing={10}
                    overflow="visible"
                    justify={{ sm: "center", lg: "start" }}
                >
                    {allPostsData.map(({ id, date, title, author, image }) => (
                        <Link key={id} href={`/announcements/${id}`}>
                            <WrapItem
                                cursor="pointer"
                                p={6}
                                borderRadius={16}
                                width={{
                                    base: "100%",
                                    sm: "100%",
                                    md: "45%",
                                    lg: "30%",
                                }}
                                boxShadow="0px 10px 30px #00000015"
                                _hover={{
                                    transform: "translateY(-10px)",
                                    boxShadow: "0px 20px 30px #00000020",
                                }}
                                transition="all 0.5s ease"
                            >
                                <Stack w="100%" spacing={6}>
                                    <Box
                                        bgColor={useColorModeValue(
                                            "white",
                                            "gray.700"
                                        )}
                                        borderRadius={16}
                                        overflow="hidden"
                                        boxShadow="0px 5px 10px #00000011"
                                    >
                                        <Image
                                            src={`/assets/announcements/${image}`}
                                            objectFit="contain"
                                            width="100%"
                                            height={250}
                                        />
                                    </Box>
                                    <Stack>
                                        <Heading
                                            as="h2"
                                            size="lg"
                                            fontWeight="normal"
                                            mb={2}
                                        >
                                            {title}
                                        </Heading>
                                        <Stack direction="row" spacing={4}>
                                            <Text fontSize="lg">
                                                Written by {author}
                                            </Text>
                                            <Text
                                                fontSize="lg"
                                                color="gray.500"
                                            >
                                                {DateTime.fromISO(
                                                    date
                                                ).toLocaleString()}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </WrapItem>
                        </Link>
                    ))}
                </Wrap>
            </section>
        </Container>
    );
}

Announcements.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
