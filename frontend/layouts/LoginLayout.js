import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
    Button,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Progress,
    Spinner,
    Stack,
    StackDivider,
    Text,
    useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    createUserWithEmailAndPassword,
    getRedirectResult,
    OAuthProvider,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useUser } from "lib/context";
import { auth, firestore, googleAuthProvider } from "lib/firebase";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

import { FcCheckmark, FcGoogle } from "react-icons/fc";
import { FiCheck, FiX } from "react-icons/fi";

import * as Yup from "yup";
import ChakraNextLink from "@components/ChakraNextLink";

import Script from "next/script";

export default function LoginLayout(props) {
    const { user, userDoc, loading } = useUser();
    console.log(user, userDoc);

    return (
        <Stack minH="100vh" direction="row" spacing={0}>
            <Flex
                flex="1 0 50%"
                bgColor="brand.500"
                display={{ base: "none", lg: "flex" }}
            ></Flex>
            <Flex
                flex="1 0 50%"
                padding={16}
                justify="center"
                align="center"
                direction="column"
            >
                {loading ? (
                    <Spinner color="brand.500" />
                ) : user ? (
                    user.emailVerified ? (
                        userDoc ? (
                            <Text>hello</Text>
                        ) : (
                            <UsernameForm />
                        )
                    ) : (
                        <EmailVerificationForm />
                    )
                ) : (
                    <AuthForm />
                )}
            </Flex>
        </Stack>
    );
}

const AuthForm = () => {
    const [login, setLogin] = useState(true);

    return login ? (
        <SignInForm setLogin={setLogin} />
    ) : (
        <SignUpForm setLogin={setLogin} />
    );
};

const MicrosoftIcon = (props) => (
    <Icon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        {...props}
    >
        <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)" />
        <path
            fill="#4caf50"
            d="M26 6H42V22H26z"
            transform="rotate(-180 34 14)"
        />
        <path
            fill="#ffc107"
            d="M26 26H42V42H26z"
            transform="rotate(-180 34 34)"
        />
        <path
            fill="#03a9f4"
            d="M6 26H22V42H6z"
            transform="rotate(-180 14 34)"
        />
    </Icon>
);

const SignInForm = ({ setLogin }) => {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    };
    const signInWithMicrosoft = async () => {
        const microsoftAuthProvider = new OAuthProvider("microsoft.com");
        await signInWithRedirect(auth, microsoftAuthProvider);
        await getRedirectResult(auth)
            .catch((error) => {})
            .then((result) => {});
    };

    const signInWithEmail = async (values, actions) => {
        const { email, password } = values;
        await signInWithEmailAndPassword(auth, email, password).catch(
            (error) => {
                if (error.code === "auth/user-not-found") {
                    actions.setFieldError("email", "Email not found");
                } else if (error.code === "auth/wrong-password") {
                    actions.setFieldError("password", "Wrong password");
                }
            }
        );
    };

    return (
        <>
            <Stack spacing={4} w="full" maxW="sm" textAlign="center">
                <Heading fontWeight="normal">Sign in to your account</Heading>
                <Text color="gray.500">
                    <ChakraNextLink href="/contact" color="brand.500">
                        Contact us
                    </ChakraNextLink>{" "}
                    if you need account help
                </Text>
            </Stack>
            <Stack
                mt={8}
                spacing={8}
                w="full"
                maxW="sm"
                divider={<StackDivider />}
            >
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={signInWithEmail}
                >
                    {(props) => (
                        <Form>
                            <Stack spacing={4}>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isRequired
                                            isInvalid={form.errors.email}
                                        >
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Email"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl
                                            isRequired
                                            isInvalid={form.errors.password}
                                        >
                                            <FormLabel>Password</FormLabel>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    isLoading={props.isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                <Stack spacing={4}>
                    <Button
                        leftIcon={<FcGoogle size="1.5rem" />}
                        variant="outline"
                        onClick={signInWithGoogle}
                        fontWeight="normal"
                    >
                        Sign in with Google
                    </Button>
                    {/* <Button
                        leftIcon={<MicrosoftIcon size="1.5rem" />}
                        variant="outline"
                        onClick={signInWithMicrosoft}
                        fontWeight="normal"
                    >
                        Sign in with Microsoft
                    </Button> */}
                </Stack>
            </Stack>
            <Text mt={6} color="gray.500">
                Don't have an account yet?{" "}
                <Button
                    variant="link"
                    colorScheme="brand"
                    onClick={() => setLogin(false)}
                >
                    Sign up
                </Button>
            </Text>
        </>
    );
};

const SignUpForm = ({ setLogin }) => {
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider);
    };
    const signInWithMicrosoft = async () => {
        const microsoftAuthProvider = new OAuthProvider("microsoft.com");
        await signInWithRedirect(auth, microsoftAuthProvider);
        await getRedirectResult(auth)
            .catch((error) => {})
            .then((result) => {});
    };
    const signInWithEmailPassword = async (values, actions) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
        ).catch((error) => {
            console.log(error.code);
            if (error.code === "auth/email-already-in-use") {
                actions.setFieldError("email", "Email already in use");
            }
        });

        const user = userCredential.user;
        await updateProfile(user, {
            displayName:
                capitalize(values.firstName) +
                " " +
                capitalize(values.lastName),
        });

        await sendEmailVerification(user).then(() => {
            console.log("email sent");
        });
    };

    const capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    };

    return (
        <>
            <Stack spacing={4} w="full" maxW="sm" textAlign="center">
                <Heading fontWeight="normal">Sign up for an account</Heading>
                <Text color="gray.500">
                    <ChakraNextLink href="/contact" color="brand.500">
                        Contact us
                    </ChakraNextLink>{" "}
                    if you need account help
                </Text>
            </Stack>
            <Stack
                mt={8}
                spacing={8}
                w="full"
                maxW="sm"
                divider={<StackDivider />}
            >
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string()
                            .min(2, "Must be 2 characters or more")
                            .max(50, "Must be 50 characters or less")
                            .required("Required"),
                        lastName: Yup.string()
                            .min(2, "Must be 2 characters or more")
                            .max(50, "Must be 50 characters or less")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        password: Yup.string()
                            .min(8, "Must be 8 characters or more")
                            .required("Required"),
                        passwordConfirmation: Yup.string().oneOf(
                            [Yup.ref("password"), null],
                            "Passwords must match"
                        ),
                    })}
                    onSubmit={signInWithEmailPassword}
                >
                    {(props) => (
                        <Form>
                            <Stack spacing={5}>
                                <Stack direction="row" spacing={4}>
                                    <Field name="firstName">
                                        {({ field, form }) => (
                                            <FormControl
                                                isRequired
                                                isInvalid={
                                                    form.errors.firstName &&
                                                    form.touched.firstName
                                                }
                                            >
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    {...field}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.firstName}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="lastName">
                                        {({ field, form }) => (
                                            <FormControl
                                                isRequired
                                                isInvalid={
                                                    form.errors.lastName &&
                                                    form.touched.lastName
                                                }
                                            >
                                                <FormLabel>Last Name</FormLabel>
                                                <Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    {...field}
                                                />
                                                <FormErrorMessage>
                                                    {form.errors.lastName}
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Field name="email">
                                    {({ field, form }) => (
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                form.errors.email &&
                                                form.touched.email
                                            }
                                        >
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                            <FormErrorMessage>
                                                {form.errors.email}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, form }) => (
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                form.errors.password &&
                                                form.touched.password
                                            }
                                        >
                                            <FormLabel>Password</FormLabel>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <FormErrorMessage>
                                                {form.errors.password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="passwordConfirmation">
                                    {({ field, form }) => (
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                form.errors
                                                    .passwordConfirmation &&
                                                form.touched
                                                    .passwordConfirmation
                                            }
                                        >
                                            <FormLabel>
                                                Confirm password
                                            </FormLabel>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <FormErrorMessage>
                                                {
                                                    form.errors
                                                        .passwordConfirmation
                                                }
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    isLoading={props.isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                <Stack spacing={4}>
                    <Button
                        leftIcon={<FcGoogle size="1.5rem" />}
                        variant="outline"
                        onClick={signInWithGoogle}
                        fontWeight="normal"
                    >
                        Sign up with Google
                    </Button>
                    {/* <Button
                        leftIcon={<MicrosoftIcon size="1.5rem" />}
                        variant="outline"
                        onClick={signInWithMicrosoft}
                        fontWeight="normal"
                    >
                        Sign up with Microsoft
                    </Button> */}
                </Stack>
            </Stack>
            <Text mt={6} color="gray.500">
                Don't have an account yet?{" "}
                <Button
                    variant="link"
                    colorScheme="brand"
                    onClick={() => setLogin(true)}
                >
                    Sign up
                </Button>
            </Text>
        </>
    );
};

const EmailVerificationForm = () => {
    const { user } = useUser();
    return (
        <>
            <Stack spacing={4} w="full" maxW="sm" textAlign="center">
                <Heading fontWeight="normal">Verify Your Email</Heading>
            </Stack>
            <Stack mt={8} w="full" maxW="sm" spacing={8} color="gray.500">
                <Text>
                    We've sent you an email with a link to verify your email
                    address. Once you've verified your email, reload this page
                    to continue.
                </Text>
                <Text>
                    If you didn't get an email, click below to try again
                </Text>
                <Button
                    colorScheme="brand"
                    onClick={() => sendEmailVerification(user)}
                >
                    Send another email
                </Button>
            </Stack>
        </>
    );
};

const UsernameForm = () => {
    const [username, setUsername] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [age, setAge] = useState("");
    const [grade, setGrade] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [parentEmail, setParentEmail] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const [step, setStep] = useState(0);

    const { user } = useUser();

    const toast = useToast();

    useEffect(() => {
        if (user) {
            setFirstName(user?.displayName?.split(" ")?.[0] || "");
            setLastName(user?.displayName?.split(" ")?.[1] || "");
            setStudentEmail(user?.email || "");
        }
    }, [user]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            isValid &&
            firstName &&
            lastName &&
            studentEmail &&
            age &&
            grade &&
            city &&
            state &&
            country &&
            parentEmail
        ) {
            setSubmitting(true);

            const userDoc = doc(firestore, "users", user.uid);
            const usernameDoc = doc(firestore, "usernames", username);

            const batch = writeBatch(firestore);
            batch.set(userDoc, {
                username,
                photoURL: user.photoURL,
                displayName: user.displayName,
                email: user.email,
                createdAt: serverTimestamp(),
                bio: null,
                role: "student",
                firstName,
                lastName,
                studentEmail,
                age,
                grade,
                city,
                state,
                country,
                parentEmail,
            });
            batch.set(usernameDoc, { uid: user.uid });
            await batch.commit();
            setSubmitting(false);
        } else {
            toast({
                title: "Oh no!",
                description: "Some of your responses are invalid or missing.",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Script>
                {`gtag('event', 'conversion', {'send_to': 'AW-10963449035/yoOoCIS4xtQDEMvp4-so'});`}
            </Script>
            <Stack spacing={4} w="full" maxW="sm" textAlign="center">
                <Heading fontWeight="normal">
                    Welcome to Tech Savvy Youth!
                </Heading>
                <Text color="gray.500">
                    We'll first need some more information.
                </Text>
            </Stack>
            <chakra.form
                mt={8}
                w="full"
                maxW="sm"
                onSubmit={onSubmit}
                noValidate
            >
                {/* <Progress
                    value={((step + 1) / 2) * 100}
                    colorScheme="brand"
                    size="xs"
                    mb={6}
                /> */}
                <Stack spacing={6}>
                    <UserInfoForm1
                        step={step}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        studentEmail={studentEmail}
                        setStudentEmail={setStudentEmail}
                        age={age}
                        setAge={setAge}
                        grade={grade}
                        setGrade={setGrade}
                        city={city}
                        setCity={setCity}
                        state={state}
                        setState={setState}
                        country={country}
                        setCountry={setCountry}
                        parentEmail={parentEmail}
                        setParentEmail={setParentEmail}
                    />
                    <UserInfoForm2
                        username={username}
                        setUsername={setUsername}
                        isValid={isValid}
                        setIsValid={setIsValid}
                        step={step}
                    />
                    <Stack
                        direction={{ base: "column", sm: "row" }}
                        spacing={5}
                    >
                        {step !== 0 && (
                            <Button onClick={() => setStep(step - 1)} flex={1}>
                                Back
                            </Button>
                        )}
                        {step !== 1 && (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(step + 1);
                                }}
                                colorScheme="brand"
                                flex={1}
                                type="submit"
                            >
                                Next
                            </Button>
                        )}
                        {step === 1 && (
                            <Button
                                colorScheme="brand"
                                type="submit"
                                disabled={!isValid}
                                isLoading={submitting}
                                flex={1}
                            >
                                Submit
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </chakra.form>
        </>
    );
};

const UserInfoForm1 = ({
    step,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    studentEmail,
    setStudentEmail,
    age,
    setAge,
    grade,
    setGrade,
    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
    parentEmail,
    setParentEmail,
}) => {
    return (
        <Stack
            divider={<StackDivider />}
            spacing={8}
            display={step === 0 ? "flex" : "none"}
        >
            <Stack spacing={4}>
                <Heading
                    fontWeight="normal"
                    style={{ fontSize: "1.5rem" }}
                    mb={2}
                >
                    Student information
                </Heading>
                <Stack direction="row" spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </FormControl>
                </Stack>
                <FormControl isRequired>
                    <FormLabel>Student Email</FormLabel>
                    <Input
                        placeholder="Student Email"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                </FormControl>
                <Stack direction="row" spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>Age</FormLabel>
                        <NumberInput
                            min={1}
                            max={99}
                            value={age}
                            onChange={setAge}
                        >
                            <NumberInputField placeholder="Age" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Grade</FormLabel>
                        <NumberInput
                            min={1}
                            max={12}
                            value={grade}
                            onChange={setGrade}
                        >
                            <NumberInputField placeholder="Grade" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                            placeholder="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>State/Territory</FormLabel>
                        <Input
                            placeholder="State/Territory"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </FormControl>
                </Stack>
                {/* TODO: make proper country and state selector */}
                <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input
                        placeholder="Country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </FormControl>
            </Stack>
            <Stack spacing={4}>
                <Heading
                    fontWeight="normal"
                    style={{ fontSize: "1.5rem" }}
                    mb={2}
                >
                    Parent information
                </Heading>
                <FormControl isRequired>
                    <FormLabel>Parent Email</FormLabel>
                    <Input
                        placeholder="Parent Email"
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                    />
                </FormControl>
            </Stack>
        </Stack>
    );
};

const UserInfoForm2 = ({
    username,
    setUsername,
    isValid,
    setIsValid,
    step,
}) => {
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setUsername(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setUsername(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // TODO: move username to api route
    const checkUsername = useMemo(
        () =>
            debounce(async (username) => {
                if (username.length >= 3) {
                    const ref = doc(firestore, "usernames", username);
                    const exists = (await getDoc(ref)).exists();
                    setIsValid(!exists);
                    setLoading(false);
                }
            }, 500),
        []
    );

    useEffect(() => {
        checkUsername(username);
    }, [username, checkUsername]);

    return (
        <Stack spacing={4} display={step === 1 ? "flex" : "none"}>
            <FormControl isRequired isInvalid={username && !isValid}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                    <Input
                        type="text"
                        placeholder="Your Username"
                        value={username}
                        onChange={onChange}
                    />
                    {username && (
                        <InputRightElement
                            children={
                                loading ? (
                                    <Spinner color="brand.500" size="sm" />
                                ) : isValid ? (
                                    <CheckIcon color="green.500" />
                                ) : (
                                    <CloseIcon color="red.500" />
                                )
                            }
                        />
                    )}
                </InputGroup>
            </FormControl>
        </Stack>
    );
};

const SignOutForm = () => {
    return (
        <button
            onClick={() => {
                signOut(auth);
            }}
        >
            sign out form
        </button>
    );
};
