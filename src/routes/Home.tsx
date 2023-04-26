import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";
import { useEffect, useState } from "react";
import RoomSkeleton from "../components/RoomSkeleton";

interface IPhoto {
    pk: string;
    file: string;
    description: string;
}
interface IRoom {
    "pk": number;
    "name": string;
    "country": string;
    "city": string;
    "price": number;
    "rating": number;
    "is_owner": boolean;
    "photos": IPhoto[];
}

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const fetchRooms = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/");
        const json = await response.json();
        setRooms(json);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchRooms();
    }, [])
    return (
        <Grid mt={10} px={{ base:10, lg:40}} columnGap={4} rowGap={8} templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(5, 1fr)"
        }}>
            {isLoading ? (
                <>
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                </>) : null}
            {rooms.map((room) => (
                <Room
                    imageUrl={"https://a0.muscache.com/im/pictures/prohost-api/Hosting-607458038229062130/original/1e20dfc7-ea12-44b2-a837-2bdcd8502133.jpeg?im_w=720"}
                    name={room.name}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                />
            ))}
    </Grid>
    );
}