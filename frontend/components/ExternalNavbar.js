import {
    Avatar,
    Box,
    Button,
    Collapse,
    Container,
    Flex,
    Icon,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Spinner,
    Stack,
    Switch,
    Text,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ChatIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CloseIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";

import NextLink from "next/link";
import ChakraNextLink from "./ChakraNextLink";

import Logo from "./Logo";
import { useUser } from "@lib/context";
import {
    FiChevronDown,
    FiMessageSquare,
    FiMoon,
    FiSun,
    FiUser,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";

export default function ExternalNavbar() {
    const { isOpen, onToggle } = useDisclosure();

    const { userDoc, loading } = useUser();

    const router = useRouter();

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box pos="fixed" zIndex="docked" w="full" top={0}>
            <Flex
                bg={useColorModeValue("glassWhite", "glassBlack")}
                color={useColorModeValue("gray.600", "white")}
                minH="60px"
                py={{ base: 2 }}
                px={{ base: 4, lg: 16 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align="center"
                backdropFilter="auto"
                backdropBlur="10px"
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant="ghost"
                        aria-label="Toggle Navigation"
                    />
                </Flex>
                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: "center", md: "start" }}
                    align="center"
                >
                    <ChakraNextLink
                        textAlign={useBreakpointValue({
                            base: "center",
                            md: "left",
                        })}
                        fontFamily="heading"
                        color={useColorModeValue("gray.800", "white")}
                        href="/"
                        display="flex"
                        alignItems="center"
                        _hover={{
                            textDecoration: "none",
                        }}
                        fontSize={{ base: "md", lg: "lg" }}
                    >
                        <Logo
                            svgHeight={useBreakpointValue(
                                { base: 24, lg: 32 },
                                { fallback: "lg" }
                            )}
                            color={useColorModeValue("gray.700", "white")}
                        />
                    </ChakraNextLink>

                    <Flex
                        display={useBreakpointValue(
                            {
                                base: "none",
                                md: "flex",
                            },
                            { fallback: "md" }
                        )}
                        ml={{ base: 3, lg: 10 }}
                    >
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify="flex-end"
                    direction="row"
                    spacing={6}
                >
                    {loading ? (
                        <Spinner color="brand.500" />
                    ) : userDoc ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant="link"
                                rounded="full"
                                minW={0}
                                rightIcon={<FiChevronDown />}
                            >
                                <Avatar size="sm" src={userDoc.photoURL} />
                            </MenuButton>
                            <MenuList>
                                {/* <Center> */}
                                <Text px={4} py={2}>
                                    Welcome, {userDoc.displayName.split(" ")[0]}
                                    !
                                </Text>
                                {/* </Center> */}

                                <MenuDivider />

                                <NextLink href={`/u/${userDoc.username}`}>
                                    <MenuItem
                                        as="a"
                                        icon={<FiUser />}
                                        cursor="pointer"
                                    >
                                        My Profile
                                    </MenuItem>
                                </NextLink>

                                <NextLink href="/user/messages">
                                    <MenuItem
                                        as="a"
                                        icon={<FiMessageSquare />}
                                        cursor="pointer"
                                    >
                                        Messages
                                    </MenuItem>
                                </NextLink>

                                <NextLink href="/user/classes">
                                    <MenuItem
                                        as="a"
                                        icon={<TbSchool />}
                                        cursor="pointer"
                                    >
                                        My Classes
                                    </MenuItem>
                                </NextLink>

                                <MenuItem
                                    closeOnSelect={false}
                                    icon={<FiMoon />}
                                    onClick={toggleColorMode}
                                >
                                    <Stack
                                        direction="horizontal"
                                        align="center"
                                    >
                                        <Text>Dark Mode</Text>
                                        <Switch
                                            isChecked={colorMode === "dark"}
                                            colorScheme="brand"
                                            ml="auto"
                                        />
                                    </Stack>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    onClick={() => {
                                        signOut(auth);
                                        window.location = "/";
                                    }}
                                >
                                    Sign Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <>
                            <NextLink href="/login" passHref>
                                <Button
                                    as="a"
                                    fontSize="sm"
                                    fontWeight={400}
                                    variant="link"
                                >
                                    Sign In
                                </Button>
                            </NextLink>
                            <NextLink passHref href="/login">
                                <Button
                                    as="a"
                                    display={{
                                        base: "none",
                                        md: "inline-flex",
                                    }}
                                    fontSize="sm"
                                    colorScheme="brand"
                                >
                                    Sign Up
                                </Button>
                            </NextLink>
                        </>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.700");

    return (
        <Stack direction="row" spacing={{ base: 2, md: 1, lg: 4 }}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger="hover" placement="bottom-start">
                        <PopoverTrigger>
                            <ChakraNextLink
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize="sm"
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                                display="flex"
                                alignItems="center"
                            >
                                {navItem.label}{" "}
                                {navItem.children && <ChevronDownIcon />}
                            </ChakraNextLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow="xl"
                                bg={popoverContentBgColor}
                                p={4}
                                rounded="xl"
                                minW="sm"
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <ChakraNextLink
            href={href}
            role="group"
            display="block"
            p={2}
            rounded="md"
            _hover={{ bg: useColorModeValue("brand.50", "gray.800") }}
        >
            <Stack direction="row" align="center">
                <Box>
                    <Text
                        transition="all .3s ease"
                        _groupHover={{ color: "brand.500" }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition="all .3s ease"
                    transform="translateX(-10px)"
                    opacity={0}
                    _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                    }}
                    justify="flex-end"
                    align="center"
                    flex={1}
                >
                    <Icon color="brand.500" w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </ChakraNextLink>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify="space-between"
                align="center"
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition="all .25s ease-in-out"
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle="solid"
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align="start"
                >
                    {children &&
                        children.map((child) => (
                            <ChakraNextLink
                                key={child.label}
                                py={2}
                                href={child.href}
                            >
                                {child.label}
                            </ChakraNextLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Classes",
        children: [
            {
                label: "Classes",
                subLabel: "All the FREE Classes we offer",
                href: "/classes",
            },
            {
                label: "Canvas",
                subLabel: "The gradebook and assignment portal",
                href: "https://k12.instructure.com/",
            },
        ],
        href: "#",
    },
    {
        label: "Announcements",
        children: [
            {
                label: "Announcements",
                subLabel: "Recent announcements",
                href: "/announcements",
            },
            {
                label: "Blog",
                subLabel: "Blog posts",
                href: "/blog",
            },
            {
                label: "Media",
                subLabel: "Videos and pictures from our Events",
                href: "/media",
            },
        ],
        href: "#",
    },
    {
        label: "About",
        children: [
            {
                label: "About Us",
                subLabel: "Learn more about Tech Savvy Youth",
                href: "/about",
            },
            {
                label: "Our Team",
                subLabel: "The dedicated people who make TSY possible",
                href: "/team",
            },
            {
                label: "FAQ",
                subLabel: "Frequently Asked Questions",
                href: "/faq",
            },
        ],
        href: "#",
    },
    {
        label: "Contact",
        children: [
            {
                label: "Contact Us",
                subLabel: "Get in touch with us",
                href: "/contact",
            },
            {
                label: "Join Us",
                subLabel: "Join our team",
                href: "/join",
            },
        ],
        href: "#",
    },
    {
        label: "Events (NEW!)",
        children: [
            {
                label: "TSY Summer Camp 2.0",
                subLabel: "Register for our 2023 STEM Summer Camp",
                href: "/events/summercamp2023",
            },
            {
                label: "Hacktivate 2023",
                subLabel:
                    "Participate in our 2023 Hackathon for a chance to win prizes",
                href: "/events/hacktivate2023",
            },
        ],
        href: "#",
    },
    {
        label: "Donate",
        href: "/donate",
    },
];
