import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";

import { FiMail, FiUser } from "react-icons/fi";
import Reveal from "./Reveal";
import { Field, Form, Formik } from "formik";
import axios from "axios";

export default function ContactForm() {
    const toast = useToast();
    return (
        <Box as="section">
            <Container maxW="5xl" px={{ base: 8, md: 12 }} py={24}>
                <Reveal
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Stack
                        spacing={{ base: 8, lg: 12 }}
                        direction={{ base: "column", lg: "row" }}
                        bg="brand.500"
                        color="white"
                        borderRadius="2xl"
                        p={{ base: 6, md: 10, lg: 20 }}
                    >
                        <Box flex={1}>
                            <Heading>Get in touch</Heading>
                            <Text mt={3} color="gray.400" fontSize="lg">
                                We can't wait to hear from you!
                            </Text>
                        </Box>
                        <Box
                            bg={useColorModeValue("white", "gray.600")}
                            borderRadius="xl"
                            p={{ base: 6, md: 8 }}
                            color={useColorModeValue("black", "white")}
                            flex={1}
                        >
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    message: "",
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.name) {
                                        errors.name = "Required";
                                    }
                                    if (!values.email) {
                                        errors.email = "Required";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email = "Invalid email address";
                                    }
                                    if (!values.message) {
                                        errors.message = "Required";
                                    }
                                    return errors;
                                }}
                                onSubmit={async (values) => {
                                    try {
                                        await axios.post(
                                            "/api/contact",
                                            values
                                        );
                                        toast({
                                            title: "Message sent.",
                                            description:
                                                "We'll get back to you soon!",
                                            status: "success",
                                            isClosable: true,
                                        });
                                    } catch (err) {
                                        toast({
                                            title: "Oh no!",
                                            description:
                                                "Something went wrong. Try again later.",
                                            status: "error",
                                            isClosable: true,
                                        });
                                    }
                                }}
                            >
                                {(props) => (
                                    <Form>
                                        <Stack spacing={5}>
                                            <Field name="name">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.name &&
                                                            form.touched.name
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Name
                                                        </FormLabel>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                children={
                                                                    <FiUser />
                                                                }
                                                            />
                                                            <Input
                                                                type="text"
                                                                {...field}
                                                                placeholder="Your Name"
                                                            />
                                                        </InputGroup>
                                                        <FormErrorMessage>
                                                            {form.errors.name}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="email">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.email &&
                                                            form.touched.email
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Email
                                                        </FormLabel>
                                                        <InputGroup>
                                                            <InputLeftElement
                                                                children={
                                                                    <FiMail />
                                                                }
                                                            />
                                                            <Input
                                                                type="text"
                                                                {...field}
                                                                placeholder="Your Email"
                                                            />
                                                        </InputGroup>
                                                        <FormErrorMessage>
                                                            {form.errors.email}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="message">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors
                                                                .message &&
                                                            form.touched.message
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Message
                                                        </FormLabel>
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Message"
                                                            resize="none"
                                                            rows={5}
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .message
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button
                                                colorScheme="brand"
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Stack>
                </Reveal>
            </Container>
        </Box>
    );
}
