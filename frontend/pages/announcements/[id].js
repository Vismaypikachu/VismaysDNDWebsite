import ExternalLayout from "@layouts/ExternalLayout";
import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { getAllPostIds, getBeforeAfter, getPostData } from "@lib/staticMD";
import Head from "next/head";
import { DateTime } from "luxon";
import ChakraNextLink from "@components/ChakraNextLink";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
    ArrowBackIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from "@chakra-ui/icons";

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    const { previous, next } = await getBeforeAfter(params.id);
    return {
        props: {
            postData,
            previous,
            next,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData, previous, next }) {
    return (
        <Container
            maxW="7xl"
            mt={24}
            px={{ base: 8, md: 12 }}
            py={10}
            minH="100vh"
        >
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <Stack spacing={4} mb={6}>
                    <ChakraNextLink
                        href="/announcements"
                        color="brand.400"
                        display="flex"
                        alignItems="center"
                    >
                        <ArrowBackIcon mx={2} /> Back
                    </ChakraNextLink>
                    <Heading as="h1" size="2xl">
                        {postData.title}
                    </Heading>
                    <Stack spacing={2}>
                        <Text fontSize="xl">{postData.author}</Text>
                        <Text color="gray.500" fontSize="md">
                            {DateTime.fromISO(postData.date).toLocaleString()}
                        </Text>
                    </Stack>
                </Stack>

                <div
                    className="chakra-reset"
                    dangerouslySetInnerHTML={{
                        __html: postData.contentHtml,
                    }}
                />
            </article>

            <HStack justify="space-between" mt={16}>
                {next ? <NextAnnouncement post={next} /> : <div />}
                {previous ? <PreviousAnnouncement post={previous} /> : <div />}
            </HStack>
        </Container>
    );
}

export function PreviousAnnouncement({ post }) {
    return (
        <ChakraNextLink
            href={`/announcements/${post.id}`}
            display="flex"
            alignItems="center"
            color="brand.400"
            maxW="35%"
        >
            <ChevronRightIcon ml={3} w={5} h={5} />
            <Box>
                <Text>Previous</Text>
                <Text fontSize="lg">{post.title}</Text>
            </Box>
        </ChakraNextLink>
    );
}

export function NextAnnouncement({ post }) {
    return (
        <ChakraNextLink
            href={`/announcements/${post.id}`}
            display="flex"
            alignItems="center"
            color="brand.400"
            maxW="35%"
        >
            <Box textAlign="right">
                <Text>Next</Text>
                <Text fontSize="lg">{post.title}</Text>
            </Box>
            <ChevronLeftIcon mr={3} w={5} h={5} />
        </ChakraNextLink>
    );
}

Post.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
