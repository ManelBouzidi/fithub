import { Box, Slide } from "@mui/material";
import { MessageText, PromotionsContainer } from "../styles/PromoStyle";
import { useEffect, useState } from "react";

const messages =[
    "50% off on your first order!",
    "Just Do It!!!",
];

export default function Promotions(){

    const [messageIndex,setMessageIndex]=useState(0);
    const [show,setShow]=useState(true);
    useEffect (()=>{

        setTimeout(()=>{setShow(false)},3000);
        const intervalid=setInterval(()=>{
            setMessageIndex(i=>(i+1)%messages.length) 
            setShow(true);
            setTimeout(()=>{setShow(false)},3000);      
         },6000);
         return ()=>{clearInterval(intervalid);}
    },[])
    return (
        <PromotionsContainer>
        <Slide direction={show ?"left" : "right"} in={show} timeout={{
            enter:500,
            exit:100}}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <MessageText>{messages[messageIndex]}</MessageText>
            </Box>
               </Slide>
        
        </PromotionsContainer>
    )
}