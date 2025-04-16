import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");  // Backend-URL

export const useWebSocket = () => {
    const [message, setMessage] = useState<any>(null);

    useEffect(() => {
        socket.on("auctionUpdate", (data) => {
            setMessage(data);
        });

        return () => {
            socket.off("auctionUpdate");
        };
    }, []);

    const sendMessage = (msg: string) => {
        socket.emit("placeBid", msg);  // Skicka bud till servern
    };

    return { message, sendMessage };
};
