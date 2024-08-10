import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api-communicator";

type Message = {
  role: "user" | "bot";
  content: string;
};

const Chat = () => {
  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content) {
      return;
    }

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...chatData.chats]);
    } catch (error) {
      console.error("Error while fetching response: ", error);
    } finally {
      inputRef.current!.value = "";
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          height: "100%",
          width: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: { md: "flex", sm: "none", xs: "none" },
            flex: 0.2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              bgcolor: "rgb(17,29,39)",
              borderRadius: 5,
              flexDirection: "column",
              mx: 3,
            }}
          >
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700,
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
              You're talking to a ChatBOT
            </Typography>
            <Typography
              sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}
            >
              You can ask anything to MERN-GPT
            </Typography>
            <Button
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: 700,
                borderRadius: 3,
                mx: "auto",
                bgcolor: red[300],
                ":hover": {
                  bgcolor: red.A400,
                },
              }}
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 3,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "40px",
              color: "whtie",
              mb: 2,
              mx: "auto",
              fontWeight: 600,
            }}
          >
            Model - gemini-pro
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem key={index} content={chat.content} role={chat.role} />
            ))}
          </Box>
          <div
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: 8,
              backgroundColor: "rgb(17,27,39)",
              display: "flex",
              margin: "auto",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{ ml: "auto", color: "white" }}
            >
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
