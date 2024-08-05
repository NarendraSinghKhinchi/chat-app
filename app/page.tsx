"use client";
import { useState, useCallback, useEffect } from "react";
import { Input, Button } from "antd";
import { createRoom } from "@/services";
import io, { Socket } from "socket.io-client";

// Define the types
interface Message {
  text: string;
  username: string;
  userId: string;
}

export const socket: Socket = io("http://localhost:1337");

export default function Home() {
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState<string | null>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(()=>{
    setLoggedIn(localStorage.getItem("userId"));
  },[]);
  
  useEffect(() => {
    if(loggedIn){
      socket.on("connect", () => {
        console.log("connection successfull");
        socket.emit("joinRoom", {
          username: localStorage.getItem("username"),
          room: "globalRoom",
          userId: localStorage.getItem("userId"),
        });
      });
      // Listen for messages from the server
      socket.on("newMessage", (message: Message) => {
        setMessages([...messages, message]);
      });
    }
    // Clean up the connection when the component unmounts
    return () => {
      socket.off("chat message");
    };

  }, [loggedIn, messages, socket]);
  if(!loggedIn){
    return (<div className="pt-16 mx-auto font-bold text-center text-black">
      Please login to continue
    </div>)
  }
  const handleSubmit = () => {
    socket.emit("sendMessage", {
      username: localStorage.getItem("username"),
      room: "globalRoom",
      userId: localStorage.getItem("userId"),
      text: message,
    });
    setMessage("");
  };

  // const handleRoomCreation = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     await createRoom({ name: room });
  //   } catch (err: any) {
  //     window.alert(
  //       err?.response?.data?.error?.message || "Sorry, unable to register!"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [room]);
  return (
    <main className="pt-12">
      <section className="max-w-xl mx-auto mt-5 sm:mt-20">
        <div className="overflow-y-scroll w-full h-96">
          <ul className="">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`px-2 py-3 border-b-2 border-gray-400 rounded-lg mb-1 block w-full ${message.userId === loggedIn ? 'text-left' : 'text-right'}`}
              >
                <span className="block font-bold text-md">{message.username}</span>
                <span className="block font-semibold text-sm">{message.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="flex gap-0">
        <Input
          value={room}
          onChange={(e)=> setRoom(e.target.value)}
          className="rounded-r-none"
        />
        <Button disabled={loading} type="primary" className="rounded-r-md rounded-l-none bg-primary" onClick={handleRoomCreation}>
          Create Room +
        </Button>
      </div> */}
        <div className="flex gap-0">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-r-none"
          />
          <Button
            type="primary"
            className="rounded-r-md rounded-l-none bg-primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Send
          </Button>
        </div>
      </section>
    </main>
  );
}
