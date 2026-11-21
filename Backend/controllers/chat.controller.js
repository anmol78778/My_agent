import { HumanMessage } from "@langchain/core/messages"
import chatGraph from "../utils/chatGraph"

export const chat = async (requestAnimationFrame,res)=>{
    try {
        const {message}=req.body
        if(!threadId || !message){
            return res.status(400).json({message:"threadId and messsage required"})
        }

        const threadId=String(req.user._id)
        const data=await chatGraph.invoke({
            messages:[
                new HumanMessage(message)
            ]},
            {
                configurable:{threadId}
            }
        )

        const lastMessage=data.messages[data.messages.length-1].content

        return res.status(200).json(lastMessage)
    } catch (error) {
        return res.status(500).json({message:`chat controller error ${error}`})
    }
}