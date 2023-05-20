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

const MessageDisplayData = ({ messageData }) => {
    if (SlateText.isText(messageData)) {
        let string = messageData.text;

        if (messageData.bold) string = <strong>{string}</strong>;
        if (messageData.italic) string = <em>{string}</em>;
        if (messageData.underline) string = <u>{string}</u>;
        if (messageData.code) string = <code>{string}</code>;

        return string;
    }

    const style = { textAlign: messageData.align };
    const subdata = messageData.children.map((child, index) => (
        <MessageDisplayData key={index} messageData={child} />
    ));
    switch (messageData.type) {
        case "image":
            return <RenderImage messageData={messageData} style={style} />;
        case "block-quote":
            return (
                <chakra.blockquote
                    style={style}
                    borderLeftWidth={5}
                    borderLeftColor="gray.200"
                    paddingLeft={2}
                >
                    {subdata}
                </chakra.blockquote>
            );
        case "bulleted-list":
            return <UnorderedList style={style}>{subdata}</UnorderedList>;
        case "heading-one":
            return (
                <Heading as="h1" size="xl" style={style}>
                    {subdata}
                </Heading>
            );
        case "heading-two":
            return (
                <Heading as="h2" size="md" style={style}>
                    {subdata}
                </Heading>
            );
        case "list-item":
            return <ListItem style={style}>{subdata}</ListItem>;
        case "numbered-list":
            return <OrderedList style={style}>{subdata}</OrderedList>;
        default:
            return <p style={style}>{subdata}</p>;
    }
};

const RenderImage = ({ messageData, style }) => {
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        const getURL = async () => {
            const imageRef = ref(storage, `attatchments/${messageData.id}`);
            const url = await getDownloadURL(imageRef);

            setImageURL(url);
        };

        getURL();
    }, [messageData]);

    return (
        <Box style={style}>
            <Box position="relative" display="inline-block">
                <Image
                    src={imageURL}
                    display="inline-block"
                    maxWidth="100%"
                    maxHeight="25em"
                    borderRadius="lg"
                    cursor="pointer"
                />
            </Box>
        </Box>
    );
};

const MessageDisplay = ({ message, messageRef }) => {
    const { userDoc } = useUser();
    const messageData = JSON.parse(message.content);
    return (
        <Flex
            direction="row"
            gap={4}
            padding={2}
            pl={6}
            pr={12}
            role="group"
            _hover={{
                bg: useColorModeValue(
                    "rgba(0, 0, 0, 0.03)",
                    "rgba(0, 0, 0, 0.06)"
                ),
            }}
            // _hover={{ bg: "blackAlpha.50" }}
            transition="background-color 0.2s ease"
        >
            <ChakraNextLink
                href={`/u/${message.user.username}`}
                textDecoration="none"
            >
                <Avatar
                    src={message.user.photoURL}
                    alt="User profile picture"
                />
            </ChakraNextLink>
            <Box minW="10%" flex={1}>
                <Flex align="center" gap={3}>
                    <ChakraNextLink
                        href={`/u/${message.user.username}`}
                        _hover={{ textDecoration: "none" }}
                    >
                        <Text fontWeight="semibold">
                            {message.user.username}
                        </Text>
                    </ChakraNextLink>
                    <Text fontSize="xs" color="gray.500">
                        {DateTime.fromJSDate(
                            message.createdAt?.toDate()
                        ).toRelative()}
                    </Text>
                </Flex>
                <Text
                    overflowWrap="break-word"
                    whiteSpace="break-spaces"
                    maxW="full"
                    overflow="hidden"
                    minWidth="40%"
                    as="span"
                >
                    {messageData.map((piece, index) => (
                        <MessageDisplayData key={index} messageData={piece} />
                    ))}
                </Text>
            </Box>
            {message.user.username === userDoc.username && (
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={IconButton}
                                icon={<FiMoreVertical />}
                                size="sm"
                                display={isOpen ? "flex" : "none"}
                                _groupHover={{ display: "flex" }}
                                position="absolute"
                                right={4}
                                boxShadow="base"
                                zIndex="dropdown"
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<FiTrash />}
                                    onClick={() => deleteDoc(messageRef)}
                                >
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            )}
        </Flex>
    );
};

export default MessageDisplay;
