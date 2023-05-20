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
    SimpleGrid,
    LinkBox,
    LinkOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";

import ExternalLayout from "@layouts/ExternalLayout";

import { getSortedPostsData } from "@lib/staticMDBlog";
import { DateTime } from "luxon";
import Link from "next/link";
import ChakraNextLink from "@components/ChakraNextLink";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}
export default function Blog({ allPostsData }) {
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
                    Our Blog
                </Heading>
                <LinkBox
                    cursor="pointer"
                    as={SimpleGrid}
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 16, md: 24 }}
                    alignItems="center"
                    mb={24}
                >
                    <Stack spacing={6}>
                        <Stack spacing={2}>
                            <Text fontSize="xl" color="gray.500">
                                Featured Article:
                            </Text>
                            <Heading
                                as="h1"
                                style={{
                                    fontSize: useBreakpointValue({
                                        base: "2.5rem",
                                        md: "3rem",
                                        lg: "4rem",
                                    }),
                                }}
                                fontWeight="normal"
                                mb={2}
                                letterSpacing={-1}
                            >
                                <Link
                                    href={`/blog/${allPostsData[0].id}`}
                                    passHref
                                >
                                    <LinkOverlay>
                                        {allPostsData[0].title}
                                    </LinkOverlay>
                                </Link>
                            </Heading>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Text fontSize="xl">
                                By {allPostsData[0].author}
                            </Text>
                            <Text fontSize="xl" color="gray.500">
                                {DateTime.fromISO(
                                    allPostsData[0].date
                                ).toLocaleString()}
                            </Text>
                        </Stack>
                        <ChakraNextLink
                            href={`/blog/${allPostsData[0].id}`}
                            fontSize="lg"
                            color="brand.500"
                        >
                            Read more
                        </ChakraNextLink>
                    </Stack>
                    <Box
                        bgColor={useColorModeValue("white", "gray.700")}
                        rounded="2xl"
                        overflow="hidden"
                        boxShadow="0px 5px 10px #00000011"
                    >
                        <Image
                            src={`/assets/blog/${allPostsData[0].image}`}
                            objectFit="cover"
                            width="100%"
                        />
                    </Box>
                </LinkBox>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={{ base: 12, md: 24 }}
                    alignItems="center"
                    mb={24}
                >
                    {allPostsData
                        .slice(1)
                        .map(({ id, date, title, author, image }) => (
                            <Link key={id} href={`/blog/${id}`}>
                                <Box
                                    cursor="pointer"
                                    _hover={{
                                        transform: "translateY(-10px)",
                                    }}
                                    transition="all 0.5s ease"
                                >
                                    <Stack w="100%" spacing={4}>
                                        <Box
                                            bgColor={useColorModeValue(
                                                "white",
                                                "gray.700"
                                            )}
                                            rounded="xl"
                                            overflow="hidden"
                                        >
                                            <Image
                                                src={`/assets/blog/${image}`}
                                                objectFit="cover"
                                                width="100%"
                                            />
                                        </Box>
                                        <Stack spacing={6}>
                                            <Heading
                                                as="h2"
                                                size="lg"
                                                fontWeight="normal"
                                            >
                                                {title}
                                            </Heading>
                                            <Stack direction="row" spacing={4}>
                                                <Text fontSize="lg">
                                                    By {author}
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
                                </Box>
                            </Link>
                        ))}
                </SimpleGrid>
            </section>
        </Container>
    );
}

Blog.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
