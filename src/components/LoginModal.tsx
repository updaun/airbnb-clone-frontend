import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({isOpen, onClose}:LoginModalProps) {
    const { register, handleSubmit, formState: {errors} } = useForm<IForm>();
    const onSubmit = (data:IForm) => {
        console.log("submitted");
        console.log(data);
    };
    return (
        <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500">
                                <FaUserNinja />
                            </Box>
                        } />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", {
                                required: "Please write a username",
                            })} variant={"filled"} placeholder="Username" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500">
                                <FaLock />
                            </Box>
                        } />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("password", {
                                required: "Please write a password",
                            })} variant={"filled"} type="password" placeholder="Password" />
                    </InputGroup>
                </VStack>
                <Button type="submit" mt={4} colorScheme={"red"} w={"100%"}>Log in</Button>
                <SocialLogin/>
            </ModalBody>
        </ModalContent>
    </Modal>
    );
}