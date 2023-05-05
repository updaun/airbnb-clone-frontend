import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../routes/api";

export default function Header() {
    const { userLoading, isLoggedIn, user} = useUser();
    const { isOpen:isLoginOpen, onClose:onLoginClose, onOpen:onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const onLogOut = async () => {
        // const data = await logOut();
        // console.log(data);
        const toastId = toast({
            title: "Log out...",
            description: "Sad to see you go...",
            status: "loading",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
        });
        setTimeout(() => {
            toast.update(toastId, {
            title: "Done!!, Good bye!",
            description: "See you later!",
            status: "success",
        })
        }, 3000);
        
    }
    return (
        <Stack justifyContent={"space-between"} alignItems="center" py={5} px={40} direction={{sm:"column", md:"row"}} spacing={{ sm:4, md:0}} borderBottomWidth={1}> 
            <Box color={logoColor}>
                <Link to={"/"}>
                    <FaAirbnb size={"48"} />
                </Link>
            </Box>
            <HStack spacing={2}>
                {/* <IconButton onClick={toggleColorMode} variant="ghost" aria-label="Toggle dark mode" icon={colorMode === "light" ? <FaMoon/> : <FaSun/> } /> */}
                <IconButton onClick={toggleColorMode} variant="ghost" aria-label="Toggle dark mode" icon={<Icon/>} />
                {!userLoading ? (
                    !isLoggedIn ? (
                    <>
                        <Button onClick={onLoginOpen}>Log in</Button>
                        <LightMode>
                            <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign up</Button>
                        </LightMode>
                    </>
                    ) : (
                            <Menu>
                                <MenuButton>
                                    <Avatar name={user.name} src={user.avatar} size={"md"} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                </MenuList>
                        </Menu>
                    )
                ) : null}
                
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}