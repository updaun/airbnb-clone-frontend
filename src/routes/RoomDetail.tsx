import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "./api";
import { IRoomDetail } from "../types";
import { Box, Grid, GridItem, Heading, Image, Skeleton } from "@chakra-ui/react";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom)
    console.log(data);
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Skeleton height={"43px"} width={"25%"} isLoaded={!isLoading}>
                <Heading>{ data?.name }</Heading>
            </Skeleton>
            <Grid
                mt={8}
                rounded={"xl"}
                overflow={"hidden"}
                gap={3}
                height="60vh"
                templateRows={"repeat(2, 1fr)"}
                templateColumns={"repeat(4, 1fr)"}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <GridItem
                        colSpan={ index === 0 ? 2 : 1 }
                        rowSpan={ index === 0 ? 2 : 1 }
                        overflow={"hidden"} key={index}>
                        <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                            <Image
                                w="100%"
                                h="100%"
                                objectFit={"cover"}
                                src={data?.photos[index]?.file} />
                       </Skeleton>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    )
}