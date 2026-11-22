import { HumanMessage } from "@langchain/core/messages"
import chatGraph from "../utils/chatGraph.js"

export const chat = async (req,res)=>{
    try {
        const {message}=req.body
        const threadId=(req.user._id).toString()
        if(!message){
            return res.status(400).json({message:"messsage required"})
        }

        const data=await chatGraph.invoke({
            messages:[
                new HumanMessage(message)
            ]},
            {
                configurable:{thread_id:threadId}
            }
        )

        const lastMessage=data.messages[data.messages.length-1].content

        return res.status(200).json({aiResponse:lastMessage})
    } catch (error) {
        return res.status(500).json({message:`chat controller error ${error}`})
    }
}