import React, { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IHostOnlyPageProps{
    children: React.ReactNode;
}

export default function HostOnlyPage({ children }: IHostOnlyPageProps) {
    const { user, isLoggedIn, userLoading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userLoading) {
            if(!user?.is_host) {
                navigate("/");
            }
        }
    }, [userLoading, isLoggedIn]);
    return <>{children}</>;
}