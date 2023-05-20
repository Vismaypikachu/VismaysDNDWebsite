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
} from "@chakra-ui/react";

import Reveal from "@components/Reveal";
import { Field, Form, Formik } from "formik";
import { FiMail, FiUser } from "react-icons/fi";
import axios from "axios";

import ExternalLayout from "@layouts/ExternalLayout";
import ContactForm from "@components/ContactForm";
export default function Contact() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <ContactForm />
        </Container>
    );
}

Contact.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;
