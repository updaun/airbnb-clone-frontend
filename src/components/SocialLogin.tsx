import {
    Box,
    Divider,
    Button,
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";

export default function SocialLogin() {
    const kakaoParams = {
        client_id: "0e1ec36b90bc8835e41554e8d6c3e54b",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const params = new URLSearchParams(kakaoParams).toString();
    return (
        <Box mb={4}>
        <HStack my={8}>
            <Divider />
            <Text
                textTransform={"uppercase"}
                color="gray.500"
                fontSize="xs"
                as="b">Or</Text>
            <Divider />
        </HStack>
        <VStack>
            <Button as="a" href="https://github.com/login/oauth/authorize?client_id=c60425707db819049b03&scope=read:user,user:email" w={"100%"} leftIcon={<FaGithub/>}>Continue with Github</Button>
            <Button as="a" href={`https://kauth.kakao.com/oauth/authorize?${params}`} w={"100%"} leftIcon={<FaComment/>} colorScheme={"yellow"}>Continue with Kakao</Button>
        </VStack>
        </Box>
    );
}