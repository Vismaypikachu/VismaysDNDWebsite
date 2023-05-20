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

import { getAllPostIds, getBeforeAfter, getPostData } from "@lib/staticMDBlog";
import Head from "next/head";
import { DateTime } from "luxon";
import ChakraNextLink from "@components/ChakraNextLink";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
    ArrowBackIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
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
                        href="/blog"
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
                {next ? <NextArticle post={next} /> : <div />}
                {previous ? <PreviousArticle post={previous} /> : <div />}
            </HStack>
        </Container>
    );
}

export function PreviousArticle({ post }) {
    return (
        <ChakraNextLink
            href={`/blog/${post.id}`}
            display="flex"
            alignItems="center"
            color="brand.400"
            maxW="35%"
        >
            <Box>
                <Text>Previous</Text>
                <Text fontSize="lg">{post.title}</Text>
            </Box>
            <ChevronRightIcon ml={3} w={5} h={5} />
        </ChakraNextLink>
    );
}

export function NextArticle({ post }) {
    return (
        <ChakraNextLink
            href={`/blog/${post.id}`}
            display="flex"
            alignItems="center"
            color="brand.400"
            maxW="35%"
        >
            <ChevronLeftIcon mr={3} w={5} h={5} />
            <Box textAlign="right">
                <Text>Next</Text>
                <Text fontSize="lg">{post.title}</Text>
            </Box>
        </ChakraNextLink>
    );
}

Post.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
