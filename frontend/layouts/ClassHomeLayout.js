import {
    background,
    Box,
    Collapse,
    Flex,
    Heading,
    Icon,
    Spacer,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "@lib/context";
import { firestore } from "@lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiConversation, BiMessageDetail } from "react-icons/bi";
import {
    FiChevronDown,
    FiChevronRight,
    FiHash,
    FiHome,
    FiMessageSquare,
    FiUser,
    FiUsers,
} from "react-icons/fi";
import { TbMessages } from "react-icons/tb";
import { VscMegaphone } from "react-icons/vsc";
import { BsChatLeftText } from "react-icons/bs";
import ChakraNextLink from "../components/ChakraNextLink";

export default function ClassHomeLayout({ children }) {
    const router = useRouter();
    const { cid } = router.query;

    const { user, userDoc } = useUser();

    const [classValue, setClassValue] = useState();

    useEffect(() => {
        if (!cid) return;

        const fetchClass = async () => {
            if (user) {
                const registrationDoc = await getDoc(
                    doc(firestore, "registrations", `${user.uid}_${cid}`)
                );
                if (!registrationDoc.exists()) {
                    router.push("/classes");
                    return;
                }
            }

            const classDoc = await getDoc(doc(firestore, "classes", cid));
            if (!classDoc.exists()) {
                router.push("/classes");
            } else {
                setClassValue(classDoc);
            }
        };

        fetchClass();
    }, [cid, user]);

    return (
        <Flex minH="100vh" h="100vh" pt="60px" align="stretch">
            <ClassSidebar classDoc={classValue} />
            <Flex flex={9}>
                {React.cloneElement(children, {
                    classValue,
                    isInstructor:
                        classValue?.data()?.instructorUsername ===
                            userDoc.username ||
                        classValue
                            ?.data()
                            ?.instructorUsername?.includes(userDoc.username),
                })}
            </Flex>
        </Flex>
    );
}

const ClassSidebar = ({ classDoc }) => {
    const classData = classDoc?.data();
    return (
        <Box
            flex={{ base: 0, md: 2 }}
            py={4}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
        >
            <Heading
                size="md"
                m={6}
                fontWeight="normal"
                display={{ base: "none", md: "block" }}
            >
                {classData?.title ?? "Loading..."}
            </Heading>
            <NavItem
                href={`/classes/${classDoc?.id}/home`}
                name="Home"
                icon={FiHome}
            />
            <CollapseNavItem name="Conversation" icon={FiMessageSquare}>
                <NavSubitem
                    href={`/classes/${classDoc?.id}/chat/instructor`}
                    name="Instructor"
                    icon={BiMessageDetail}
                />
                <NavSubitem
                    href={`/classes/${classDoc?.id}/chat/announcements`}
                    name="Announcements"
                    icon={VscMegaphone}
                />
                <NavSubitem
                    href={`/classes/${classDoc?.id}/chat/general`}
                    name="General"
                    icon={BiConversation}
                />
            </CollapseNavItem>
            <NavItem
                href={`/classes/${classDoc?.id}/students`}
                name="Students"
                icon={FiUsers}
            />
        </Box>
    );
};

const CollapseNavItem = ({ name, icon, children }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <Box as="button" onClick={onToggle} w="full" display="block">
                <Flex
                    w="full"
                    alignItems="center"
                    justifyContent="flex-start"
                    py={4}
                    px={{ base: 4, md: 6 }}
                    transition="all 0.2s"
                    _hover={{
                        bg: "brand.50",
                        color: "brand.500",
                    }}
                    _dark={{
                        color: "gray.500",
                        borderLeftColor: "transparent",
                        _hover: {
                            bg: "gray.700",
                            color: "brand.300",
                        },
                    }}
                    color="gray.600"
                    gap={4}
                    borderLeftWidth="3px"
                    borderLeftColor="transparent"
                >
                    <Icon as={icon} />
                    <Text display={{ base: "none", md: "block" }}>{name}</Text>
                    <Icon
                        display={{ base: "none", md: "block" }}
                        as={FiChevronDown}
                        transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                        transition="transform 0.2s"
                        ml="auto"
                    />
                </Flex>
            </Box>
            <Collapse in={isOpen} animateOpacity>
                {children}
            </Collapse>
        </>
    );
};

const NavSubitem = ({ href, name, icon }) => {
    const router = useRouter();

    const active = router.asPath === href;

    return (
        <ChakraNextLink href={href} _hover={{ textDecoration: "none" }}>
            <Flex
                alignItems="center"
                justifyContent="flex-start"
                py={4}
                px={{ base: 4, md: 6 }}
                transition="all 0.2s"
                _hover={{
                    bg: "brand.50",
                    color: "brand.500",
                }}
                _dark={{
                    color: active ? "brand.300" : "gray.500",
                    borderLeftColor: active ? "brand.300" : "transparent",
                    _hover: {
                        bg: "gray.700",
                        color: "brand.300",
                    },
                }}
                bg={useColorModeValue("gray.50", "gray.900")}
                color={active ? "brand.500" : "gray.700"}
                gap={4}
                borderLeftWidth="3px"
                borderLeftColor={active ? "brand.500" : "transparent"}
            >
                <Icon as={icon} />
                <Text display={{ base: "none", md: "block" }}>{name}</Text>
            </Flex>
        </ChakraNextLink>
    );
};

const NavItem = ({ href, name, icon }) => {
    const router = useRouter();

    const active = router.asPath === href;

    return (
        <ChakraNextLink href={href} _hover={{ textDecoration: "none" }}>
            <Flex
                alignItems="center"
                justifyContent="flex-start"
                py={4}
                px={{ base: 4, md: 6 }}
                transition="all 0.2s"
                _hover={{
                    bg: "brand.50",
                    color: "brand.500",
                }}
                _dark={{
                    color: active ? "brand.300" : "gray.500",
                    borderLeftColor: active ? "brand.300" : "transparent",
                    _hover: {
                        bg: "gray.700",
                        color: "brand.300",
                    },
                }}
                color={active ? "brand.500" : "gray.700"}
                gap={4}
                borderLeftWidth="3px"
                borderLeftColor={active ? "brand.500" : "transparent"}
            >
                <Icon as={icon} />
                <Text display={{ base: "none", md: "block" }}>{name}</Text>
            </Flex>
        </ChakraNextLink>
    );
};
