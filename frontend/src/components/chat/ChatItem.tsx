import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "bot";
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [displayContent, setDisplayContent] = useState("")

  useEffect(()=>{
    if(content){
      setIsLoading(false);
      setDisplayContent(content);
    }
  }, [content]);

  const auth = useAuth();

  return isLoading ? (<Box>Loading...</Box>) :
  role === "bot" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: 0 }}>
        <img src="openai.png" alt="openai"width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{displayContent}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: 0, bgcolor:"black", color:'white' }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{displayContent}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
