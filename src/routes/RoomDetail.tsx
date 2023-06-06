import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getRoom, getRoomReviews } from "./api";
import { IReview, IRoomDetail } from "../types";
import { Avatar, Box, Container, Grid, GridItem, HStack, Heading, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom)
    const {data:reviewsData, isLoading: isReivewsLoading} = useQuery<IReview[]>(["rooms", roomPk, "reviews"], getRoomReviews)
    const [dates, setDates] = useState<Date[] | undefined>();
    const handleDateChange = (value: any) => {
        setDates(value);
    };
    useEffect(() => {
        if (dates) {
            const [fisrtDate, secondDate] = dates;
            const [checkIn] = fisrtDate.toISOString().split("T");
            const [checkOut] = secondDate.toISOString().split("T");
            console.log(checkIn, checkOut);
        }
    }, [dates]);
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Skeleton height={"43px"} width={"40%"} isLoaded={!isLoading}>
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
                            {data?.photos && data.photos.length > 0 ? (
                                <Image
                                w="100%"
                                h="100%"
                                objectFit={"cover"}
                                    src={data?.photos[index]?.file} />
                            ) : null}
                       </Skeleton>
                    </GridItem>
                ))}
            </Grid>

            <Grid gap={60} templateColumns={"2fr 1fr"}>
                <Box>
                    <HStack justifyContent={"space-between"} mt={10}>
                            
                    </HStack>
                    <Box mt={10}>

                    </Box>
                </Box>
                <Box pt={10}>
                    <Calendar
                        onChange={handleDateChange}
                        prev2Label={null}
                        next2Label={null}
                        minDetail="month"
                        minDate={new Date()}
                        maxDate={new Date(Date.now() + (60*60*24*7*4*6*1000))}
                        selectRange />
                </Box>
            </Grid>


            <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
                <VStack alignItems={"flex-start"}>
                <Skeleton isLoaded={!isLoading} height={"30px"}>
                    <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>    
                </Skeleton>
                <Skeleton isLoaded={!isLoading} height={"30px"}>
                <HStack justifyContent={"flex-start"} w="100%">
                        <Text>{data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}</Text>   
                        <Text>·</Text>
                    <Text>{data?.rooms} room{data?.rooms === 1 ? "" : "s"}</Text>   
                </HStack>
                </Skeleton>
                </VStack>
                <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
            </HStack>
            <Box mt={10}>
                <Heading mb={5} fontSize={"2xl"}>
                    <HStack>
                        <FaStar /> <Text>{data?.rating}</Text>
                        <Text>•</Text>
                        <Text>{reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}</Text>
                    </HStack>
                </Heading>
                <Container mt={15} maxW="container.lg" marginX="none">
                    <Grid gap={10} templateColumns={"1fr 1fr"}>
                    {reviewsData?.map((review, index) => (
                        <VStack key={index} alignItems={"flex-start"}>
                            <HStack>
                                <Avatar name={review.user.name} src={review.user.avatar} size={"md"} />
                                <VStack spacing={0} alignItems={"flex-start"}>
                                    <Heading fontSize={"md"}>
                                        {review.user.name}
                                    </Heading>
                                    <HStack spacing={1}>
                                        <FaStar size={"12px"} />
                                        <Text>{review.rating}</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <Text>{review.payload}</Text>
                        </VStack>
                    ))}
                </Grid>
                </Container>
            </Box>
        </Box>
    )
}