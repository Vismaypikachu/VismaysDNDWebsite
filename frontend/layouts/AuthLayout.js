import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spinner,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { useUser } from "lib/context";
import LoginLayout from "./LoginLayout";

import { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@lib/firebase";

export default function AuthLayout({ children }) {
    const { userDoc, loading } = useUser();
    return (
        <>
            {loading ? (
                <Center height="100vh">
                    <Spinner color="brand.500" />
                </Center>
            ) : userDoc ? (
                userDoc?.age ? (
                    children
                ) : (
                    <>
                        {children}
                        <UserInfoModal userDoc={userDoc} />
                    </>
                )
            ) : (
                <LoginLayout />
            )}
        </>
    );
}

const UserInfoModal = ({ userDoc }) => {
    const { user } = useUser();
    const onSubmit = async (values, actions) => {
        await updateDoc(doc(firestore, "users", user.uid), {
            ...values,
        });
    };

    return (
        <Modal isOpen={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Please complete your profile</ModalHeader>
                <Formik
                    initialValues={{
                        firstName: userDoc?.displayName.split(" ")[0],
                        lastName: userDoc?.displayName.split(" ")[1],
                        studentEmail: userDoc?.email,
                        age: "",
                        grade: "",
                        city: "",
                        state: "",
                        country: "",
                        ...(userDoc?.role === "student" && { parentEmail: "" }),
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required("Required"),
                        lastName: Yup.string().required("Required"),
                        studentEmail: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        age: Yup.number()
                            .min(1, "Must be 1 or older")
                            .max(99, "Must be 99 or younger")
                            .required("Required"),
                        grade: Yup.number()
                            .min(1, "Must be 1 or higher")
                            .max(12, "Must be 12 or lower")
                            .required("Required"),
                        city: Yup.string().required("Required"),
                        state: Yup.string().required("Required"),
                        country: Yup.string().required("Required"),
                        ...(userDoc?.role === "student" && {
                            parentEmail: Yup.string()
                                .email("Invalid email address")
                                .required("Required"),
                        }),
                    })}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form>
                            <ModalBody>
                                <Stack divider={<StackDivider />} spacing={8}>
                                    <Stack spacing={4}>
                                        {userDoc?.role === "student" && (
                                            <Heading
                                                fontWeight="normal"
                                                style={{ fontSize: "1.5rem" }}
                                                mb={2}
                                            >
                                                Student information
                                            </Heading>
                                        )}
                                        <Stack direction="row" spacing={5}>
                                            <Field name="firstName">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors
                                                                .firstName &&
                                                            form.touched
                                                                .firstName
                                                        }
                                                    >
                                                        <FormLabel>
                                                            First Name
                                                        </FormLabel>
                                                        <Input
                                                            placeholder="First Name"
                                                            type="text"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .firstName
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="lastName">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors
                                                                .lastName &&
                                                            form.touched
                                                                .lastName
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Last Name
                                                        </FormLabel>
                                                        <Input
                                                            placeholder="Last Name"
                                                            type="text"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .lastName
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                        <Field name="studentEmail">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isRequired
                                                    isInvalid={
                                                        form.errors
                                                            .studentEmail &&
                                                        form.touched
                                                            .studentEmail
                                                    }
                                                >
                                                    <FormLabel>
                                                        Student Email
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="Student Email"
                                                        type="email"
                                                        {...field}
                                                    />
                                                    <FormErrorMessage>
                                                        {
                                                            form.errors
                                                                .studentEmail
                                                        }
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Stack direction="row" spacing={5}>
                                            <Field name="age">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.age &&
                                                            form.touched.age
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Age
                                                        </FormLabel>
                                                        <NumberInput
                                                            min={1}
                                                            max={99}
                                                            {...field}
                                                            onChange={(value) =>
                                                                form.setFieldValue(
                                                                    "age",
                                                                    value
                                                                )
                                                            }
                                                        >
                                                            <NumberInputField placeholder="Age" />
                                                            <NumberInputStepper>
                                                                <NumberIncrementStepper />
                                                                <NumberDecrementStepper />
                                                            </NumberInputStepper>
                                                        </NumberInput>
                                                        <FormErrorMessage>
                                                            {form.errors.age}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="grade">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.grade &&
                                                            form.touched.grade
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Grade
                                                        </FormLabel>
                                                        <NumberInput
                                                            min={1}
                                                            max={12}
                                                            {...field}
                                                            onChange={(value) =>
                                                                form.setFieldValue(
                                                                    "grade",
                                                                    value
                                                                )
                                                            }
                                                        >
                                                            <NumberInputField placeholder="Grade" />
                                                            <NumberInputStepper>
                                                                <NumberIncrementStepper />
                                                                <NumberDecrementStepper />
                                                            </NumberInputStepper>
                                                        </NumberInput>
                                                        <FormErrorMessage>
                                                            {form.errors.grade}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                        <Stack direction="row" spacing={5}>
                                            <Field name="city">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.city &&
                                                            form.touched.city
                                                        }
                                                    >
                                                        <FormLabel>
                                                            City
                                                        </FormLabel>
                                                        <Input
                                                            placeholder="City"
                                                            type="text"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.city}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="state">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors.state &&
                                                            form.touched.state
                                                        }
                                                    >
                                                        <FormLabel>
                                                            State
                                                        </FormLabel>
                                                        <Input
                                                            placeholder="State"
                                                            type="text"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {form.errors.state}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                        <Field name="country">
                                            {({ field, form }) => (
                                                <FormControl
                                                    isRequired
                                                    isInvalid={
                                                        form.errors.country &&
                                                        form.touched.country
                                                    }
                                                >
                                                    <FormLabel>
                                                        Country
                                                    </FormLabel>
                                                    <Input
                                                        placeholder="Country"
                                                        type="text"
                                                        {...field}
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.country}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    {userDoc?.role === "student" && (
                                        <Stack spacing={4}>
                                            <Heading
                                                fontWeight="normal"
                                                style={{ fontSize: "1.5rem" }}
                                                mb={2}
                                            >
                                                Parent information
                                            </Heading>
                                            <Field name="parentEmail">
                                                {({ field, form }) => (
                                                    <FormControl
                                                        isRequired
                                                        isInvalid={
                                                            form.errors
                                                                .parentEmail &&
                                                            form.touched
                                                                .parentEmail
                                                        }
                                                    >
                                                        <FormLabel>
                                                            Parent Email
                                                        </FormLabel>
                                                        <Input
                                                            placeholder="Parent Email"
                                                            type="email"
                                                            {...field}
                                                        />
                                                        <FormErrorMessage>
                                                            {
                                                                form.errors
                                                                    .parentEmail
                                                            }
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </Stack>
                                    )}
                                </Stack>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    isLoading={props.isSubmitting}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};
