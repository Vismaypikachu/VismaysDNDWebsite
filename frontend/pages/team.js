import {
    Container,
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import Image from "next/image";

import ExternalLayout from "@layouts/ExternalLayout";
import Reveal from "@components/Reveal";
import { isValidMotionProp, motion } from "framer-motion";

import VismayImage from "@public/assets/images/team/VismayPatel.jpg";
import OwenImage from "@public/assets/images/team/OwenFei.jpg";
import JacksonImage from "@public/assets/images/team/JacksonBlunt.jpg";
import LiamImage from "@public/assets/images/team/LiamKikin-Gil.jpg";
import ManasImage from "@public/assets/images/team/ManasRaut.jpg";
import QuyImage from "@public/assets/images/team/QuyNgocNgo.jpg";
import YuvtajvirImage from "@public/assets/images/team/YuvtajvirSingh.jpg";
import AaryanImage from "@public/assets/images/team/AaryanBarjatya.jpg";
import TemiImage from "@public/assets/images/team/TemiJohnson.jpg";
import ZhuqinyuanImage from "@public/assets/images/team/Zhuqinyuan(Johnny)Shen.jpg";
import AtharvaImage from "@public/assets/images/team/AtharvaSaraf.jpg";
import RaymonImage from "@public/assets/images/team/RaymonZhang.jpg";
import TomasImage from "@public/assets/images/team/TomasBoast.jpg";
import YekalaivanImage from "@public/assets/images/team/YekalaivanAiyanar.jpg";
import SreeImage from  "@public/assets/images/team/SreeKokkonda.jpg";
import AarushImage from "@public/assets/images/team/AarushSureddi.jpg";

export default function Team() {
    return (
        <Container maxW="7xl" mt={24} px={{ base: 8, md: 12 }} py={10}>
            <Heading as="h1" size="2xl">
                Our Team
            </Heading>

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} mt={12}>
                {TEAMMEMBERS.map((member) => (
                    <Reveal
                        initial={{ y: "30%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        key={member.id}
                    >
                        <TeamMemberDisplay member={member} id={member.id} />
                    </Reveal>
                ))}
            </SimpleGrid>

            <Heading mt={24} as="h1" size="2xl">
                Former Team Members
            </Heading>

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} mt={12}>
                {FORMERTEAMMEMBERS.map((member) => (
                    <Reveal
                        initial={{ y: "30%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        key={member.id}
                    >
                        <TeamMemberDisplay member={member} id={member.id} />
                    </Reveal>
                ))}
            </SimpleGrid>
        </Container>
    );
}

const TeamMemberDisplay = ({ member }) => {
    return (
        <Box
            rounded="xl"
            direction="column"
            justify="space-between"
            position="relative"
            bg={useColorModeValue("white", "gray.800")}
            shadow="xl"
            overflow="hidden"
        >
            <Box flex={1} height="sm" position="relative">
                <Image
                    src={member.image}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                />
            </Box>

            <Box p={8}>
                <Heading as="h3" size="lg" fontWeight="normal">
                    {member.name}
                </Heading>
                <Text color="gray.500" whiteSpace="pre-line">
                    {member.position}
                </Text>

                <Text mt={4} color="gray.500">
                    {member.bio}
                </Text>
            </Box>
        </Box>
    );
};

Team.getLayout = (page) => <ExternalLayout>{page}</ExternalLayout>;

const TEAMMEMBERS = [
    {
        id: 1,
        name: "Vismay Patel",
        position: "CEO/Founder\nJava Advanced Teacher\nVideo Production Teacher",
        bio: `Vismay Patel is a Junior enrolled in the ALS (Advanced Learning Services) International Baccalaureate Diploma
         Program at Interlake High School, in Bellevue, Washington. Using the knowledge he has attained over the years, he 
         recently built his own custom computer.  Vismay has participated in many coding challenges at school, as well as 
         coding clubs. His hobbies are programming, aviation, and gaming.  Using his coding skills, he has made many different 
         projects, like auto searchers and Java games.`,
        image: VismayImage,
    },
    {
        id: 2,
        name: "Owen Fei",
        position: "Python Teacher",
        bio: `Owen Fei is a Junior enrolled in the ALS (Advanced Learning Services) International Baccalaureate Diploma Program 
        at Interlake High School, in Bellevue, Washington. He enjoys programming and has made apps and programs. His preferred 
        languages are Python and Java. In his free time, he develops Minecraft mods and Python bots. He is training in multiple 
        other languages.`,
        image: OwenImage,
    },
    {
        id: 3,
        name: "Liam Kikin-Gil",
        position: "K-5 Math Teacher\n6-8 Math Teacher",
        bio: `Liam Kikin-Gil is a Junior at Interlake High School in Bellevue, Washington. He is currently two years 
        advanced in math courses, and is also enrolled at DigiPen for the WANIC Video Game Programming class. He likes 
        to play video games and do worldbuilding exercises in his free time, as well as occasionally coding.`,
        image: LiamImage,
    },
    {
        id: 4,
        name: "Raymon Zhang",
        position: "Director of Software Engineering\nCompetitive Programming Teacher",
        bio: `Raymon Zhang is a sophomore enrolled in the ALS IB Diploma Program at Interlake High School. He enjoys programming
        competitively and is currently in the USACO Gold Division. He is proficient in several languages including C++, Python, 
        Java, and Javascript. In his free time he also enjoys participating in math competitions and plays the piano. `,
        image: RaymonImage,
    },
    {
        id: 5,
        name: "Yuvtajvir Singh",
        position: "Director of Social Media\nJava Beginner Teacher",
        bio: `Yuvtajvir Singh is a Sophomore at Interlake High School in Bellevue, Washington. He loves all aspects of modern 
        day technology such as programming and hardware related things. He has made things like text-based adventure 
        games and GUI-based adventure games using his extensive knowledge of Java.`,
        image: YuvtajvirImage,
    },
    {
        id: 6,
        name: "Zhuqinyuan (Johnny) Shen",
        position: "Biology: IB SL/HL, AP 1/2 Teacher\nPhysics: IB SL/HL, AP 1/2 Teacher",
        bio: `Johnny Shen is a Junior enrolled in the ALS (Advanced Learning Services) International Baccalaureate Diploma Program 
        at Interlake High School, in Bellevue, Washington. He enjoys learning about sciences such as Physics and Biology. He 
        also enjoys playing video games and reading in his free time.`,
        image: ZhuqinyuanImage,
    },
    {
        id: 7,
        name: "Yekalaivan Aiyanar",
        position: "Social Media",
        bio: `Yekalaivan Aiyanar is a Freshman enrolled at Big Picture in Bellevue, Washington. He enjoys playing many sports 
        and is a hard working student. He is a constant learner and is learning many coding languages mainly Java and Python. 
        He is interested in many extracurriculars such as Robotics, ASB, Green Team, PBIS and more!`,
        image: YekalaivanImage,
    },
    {
        id: 8,
        name: "Sree Kokkonda",
        position: "Social Media",
        bio: `Sree Kokkonda is a Freshman enrolled at Sammamish High School in Bellevue, Washington. He is interested in pursuing a 
        field in Computer Science. He enjoys programming, mathematics, badminton, and playing the piano.`,
        image: SreeImage,
    },
    {
        id: 9,
        name: "Aarush Sureddi",
        position: "Social Media",
        bio: `Aarush Sureddi is a Freshman enrolled at Interlake High School in Bellevue, Washington. He enjoys using 
        technology especially hardware related things. Some of his main interests are in basketball, tennis and programming. He
        enjoy building robots`,
        image: AarushImage,
    },
    {
        id: 10,
        name: "Atharva Saraf",
        position: "Blogger",
        bio: `Atharva Saraf is Junior enrolled at Interlake High School, in Bellevue, Washington. He loves programming, 
        gaming and writing blogs. He likes coding in Java and Python and he is currently learning JavaScript. He has coded 
        several interactive applications and file generators in Java. He likes playing the Guitar and Soccer in his free time.`,
        image: AtharvaImage,
    }, 
    {
        id: 11,
        name: "Tomas Boast",
        position: "Advertisement",
        bio: `Tomas Boast is a Junior at Interlake High School in Bellevue, Washington. He enjoys different activities, 
        such as graphic design and playing video games. He is also engaged with the school community by being involved in 
        several clubs. Outside of school in his free time, he enjoys sports including soccer, skiing, and working out at the gym.`,
        image: TomasImage,
    },
    {
        id: 12,
        name: "Temi Johnson",
        position: "Advertisement",
        bio: `Temi Johnson is a Senior enrolled at Caleb International College in Lagos, Nigeria. He enjoys building robots, 
        tutoring math and editing videos. He codes robots in C, but also loves Python!`,
        image: TemiImage,
    },
];

const FORMERTEAMMEMBERS = [
    {
        id: 1,
        name: "Jackson Blunt",
        position: "Hardware Teacher \n TSY Staff Member of the Year (2021)",
        bio: `Jackson Blunt is a Junior at International School in Bellevue, Washington. He loves both technology and engineering 
        and has built a number of different computers and circuits. He is well versed in computer systems and in his free time, he 
        enjoys building keyboards, playing the trombone, and film photography. He was TSY Staff Member of the Year in 2021 for
        his commitment to the organization and help in organizing the TSY Computer Building Event.`,
        image: JacksonImage,
    },
    {
        id: 2,
        name: "Manas Raut",
        position: "Designer \n SAT Prep Teacher",
        bio: `Manas Raut is a College Freshman enrolled at Purdue University in Lafayette, Indiana. He loves art and design 
        and has worked on a number of different design projects. He is well versed in Adobe Photoshop and Illustrator, and in 
        his free time, he learns the drums and enjoys theatre, film, drawing and painting, writing, and photography.`,
        image: ManasImage,
    },
    {
        id: 3,
        name: "Quy Ngoc Ngo",
        position: "Social Media \n TSY Staff Member of the Year (2022)",
        bio: `Quy is a Junior enrolled at Sammamish High School. He likes researching interesting information, eating 
        good food and playing video games. He uses his research to make informational posts on Instagram for TSY. He was 
        TSY Staff Member of the Year in 2021 for his commitment to the organization and incredible work on posts for 
        Instagram.`,
        image: QuyImage,
    },
    {
        id: 4,
        name: "Aaryan Barjatya",
        position: "Advertisement",
        bio: `Aaryan Barjatya is a Sophomore at Interlake High School in Bellevue, Washington. He loves technology, programming 
        and software development. By the knowledge he's gaining, Aaryan has assisted/participated in developing applications and 
        software for his school and other extracurriculars. Some of his main interests are programming, soccer, tennis, and mathematics.`,
        image: AaryanImage,
    },
];

const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%239F7AEA\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%230BC5EA\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%234299E1\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%234299E1'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%239F7AEA'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%230BC5EA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2338B2AC'/%3E%3C/svg%3E")`,
];
