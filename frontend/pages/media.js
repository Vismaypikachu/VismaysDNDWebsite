import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";

import ExternalLayout from "@layouts/ExternalLayout";
import Reveal from "@components/Reveal";
import Image from "next/image";

// Images
import BuildCloseup from "@public/assets/gallery/Pictures/Build Closeup.jpg";
import BuildCloseup2 from "@public/assets/gallery/Pictures/Build Closeup2.jpg";
import BuildCloseup3 from "@public/assets/gallery/Pictures/Build Closeup3.jpg";
import Build from "@public/assets/gallery/Pictures/Build.jpg";
import Build2 from "@public/assets/gallery/Pictures/Build2.jpg";
import Build3 from "@public/assets/gallery/Pictures/Build3.jpg";
import Build4 from "@public/assets/gallery/Pictures/Build4.jpg";
import Build5 from "@public/assets/gallery/Pictures/Build5.jpg";
import Build6 from "@public/assets/gallery/Pictures/Build6.jpg";
import Certificates from "@public/assets/gallery/Pictures/Certificates.jpg";
import Harish from "@public/assets/gallery/Pictures/Harish.jpg";
import JacksonTeachCloseup from "@public/assets/gallery/Pictures/Jackson Teach Closeup.jpg";
import JacksonTeach from "@public/assets/gallery/Pictures/Jackson Teach.jpg";

export default function Media() {
    return (
        <Container
            maxW="7xl"
            mt={24}
            px={{ base: 8, md: 12 }}
            pb={10}
            minH="100vh"
        >
            <Heading pb={7} as="h1" size="2xl">
                Media
            </Heading>

            <Accordion allowMultiple mt={12}>
                <AccordionItem>
                    <h2>
                        <AccordionButton py={6}>
                            <Box flex="1" textAlign="left">
                                <Text fontSize="3xl">Gallery</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel py={4}>
                        <SimpleGrid
                            columns={{ sm: 1, md: 2, lg: 3 }}
                            spacing={6}
                        >
                            {IMAGES.map((image) => (
                                <GalleryImageDisplay
                                    image={image}
                                    key={image.id}
                                />
                            ))}
                        </SimpleGrid>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Container>
    );
}

Media.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;

const GalleryImageDisplay = ({ image }) => {
    return (
        <Reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Box
                rounded="xl"
                position="relative"
                bg={useColorModeValue("white", "gray.800")}
                shadow="xl"
                overflow="hidden"
                height="sm"
                role="group"
            >
                <Image
                    src={image.image}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                />
                <Box
                    position="absolute"
                    bottom={0}
                    w="full"
                    py={2}
                    px={4}
                    background={useColorModeValue(
                        "whiteAlpha.700",
                        "blackAlpha.700"
                    )}
                    backdropFilter="auto"
                    backdropBlur="20px"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.25s ease"
                >
                    <Text fontSize="sm">{image.alt}</Text>
                </Box>
            </Box>
        </Reveal>
    );
};

const IMAGES = [
    {
        id: 1,
        alt: "Picture of a student working on a PC with a screwdriver.",
        image: BuildCloseup,
    },
    {
        id: 2,
        alt: "Closeup of a student looking over the shell of the computer.",
        image: BuildCloseup2,
    },
    {
        id: 3,
        alt: "Closeup of a student reaching in the computer to place a component.",
        image: BuildCloseup3,
    },
    {
        id: 4,
        alt: "Closeup of a student reaching in the computer to place a component.",
        image: Build,
    },
    {
        id: 5,
        alt: "Closeup of 2 students reaching in the computer to place components.",
        image: Build2,
    },
    {
        id: 6,
        alt: "3 students and a teacher building the computer.",
        image: Build3,
    },
    {
        id: 7,
        alt: "Closeup of 3 students and a teacher building the computer.",
        image: Build4,
    },
    {
        id: 8,
        alt: "2 students looking at the parts of a motherboard.",
        image: Build5,
    },
    {
        id: 9,
        alt: "Closeup of students learning about the motherboard.",
        image: Build6,
    },
    {
        id: 10,
        alt: "Students posing with their certificates after completing the build.",
        image: Certificates,
    },
    {
        id: 11,
        alt: "Event Sponsor, Harish Agarwal, in front of the donated computer.",
        image: Harish,
    },
    {
        id: 12,
        alt: "Picture of a student working on a PC with a screwdriver.",
        image: JacksonTeachCloseup,
    },
    {
        id: 13,
        alt: "Closeup of a student looking over the shell of the computer.",
        image: JacksonTeach,
    },
];
