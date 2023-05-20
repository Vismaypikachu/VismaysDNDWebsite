import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Collapse,
    Container,
    Heading,
    Icon,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ExternalLayout from "@layouts/ExternalLayout";
import { FiChevronDown } from "react-icons/fi";

export default function FAQ() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Heading as="h1" size="2xl">
                Frequently Asked Questions
            </Heading>

            <Accordion allowMultiple mt={12}>
                {FAQs.map((faq) => (
                    <AccordionItem key={faq.question}>
                        <h2>
                            <AccordionButton py={6}>
                                <Box flex="1" textAlign="left">
                                    <Text fontSize="xl">{faq.question}</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel py={4}>
                            <Text color="gray.500">{faq.answer}</Text>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Container>
    );
}

FAQ.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;

const FAQs = [
    {
        question: "Where can I find the Discord Link?",
        answer: "The Discord Server link in here: https://discord.com/invite/JBEwzpznrq. STUDENTS AND STAFF ONLY!!!",
    },
    {
        question: "How do I sign up?",
        answer: "Simply sign up for an account on our website, then click on the CLASSES page. Once there, click on a class and press register.",
    },
    {
        question: "Where do I find the links for the classes?",
        answer: 'First of all, make sure you have an account for our website. Secondly, make sure you have signed up for the desired class and received a welcome email from us. Third, on the day of the class, navigate to the Class Home by going to the Classes Page and clicking the "Learn More" button, or you can navigate to your profile and click on the Class Home in the list. Once in the Class Home, there will be a link to the meeting. That\'s it! Zoom is a required piece of software.',
    },
    {
        question: "Is tutoring online or in-person? (COVID-19)",
        answer: "We offer all classes online. However, if you are part of the Hardware Building class and decide to build a computer by yourself and would like assistance, we can help in person.",
    },
    {
        question: "Can a student living outside the USA participate?",
        answer: "Absolutely! We have students from the USA, Canada, Europe,  and India participating. Do not hesitate to sign up.",
    },
    {
        question: "What are the age restrictions?",
        answer: "Please refer to the age restriction on the CLASSES page. It depends per class. If you would like to inquire about an exception, please email us at admin@techsavvyyouth.org for further information.",
    },
    {
        question: "How many students per class?",
        answer: "Currently, we do not have a maximum group size as we try to include everyone. This however does not deteriorate teaching quality as we have many teachers available to assist your student to the best of their ability.",
    },
    {
        question:
            "Is there a time to ask questions in class? And can I stay longer after class?",
        answer: "Absolutely, we answer any questions and we offer tutorials after the regular class if the students need it.",
    },
    {
        question: "Where can we contact you?",
        answer: "Contact us on our website using the contact form. Alternatively, you can email us at support@techsavvyyouth.org",
    },
];
