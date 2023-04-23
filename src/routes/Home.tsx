import { Box, Grid, Heading, Image, VStack, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <Grid mt={10} px={40} columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
        <VStack alignItems={"flex-start"}>
            <Box overflow={"hidden"} mb={2} rounded="3xl">
                <Image
                    h="280"
                    src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-607458038229062130/original/1e20dfc7-ea12-44b2-a837-2bdcd8502133.jpeg?im_w=720" />
            </Box>
            <Heading noOfLines={1} fontSize={"md"}>
                Ganggu-myeon, Yeongdeok-gun, 경상북도, 한국
                </Heading>
                <Text fontSize={"sm"} color="gray.600">Seoul, S. Korea</Text>
                <Text fontSize={"sm"} color="gray.600">
                    <Text as="b">$72</Text>/ night
                </Text>
        </VStack>
            
    </Grid>
    );
}