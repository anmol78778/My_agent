import Agent from "../models/agent.model"

export const createAgent = async(req,res)=>{
    try {
        const {name,knowledgeBase,instructions,tools}=req.body
        if(!name || !knowledgeBase || !instructions || !tools){
            return res.status(400).json({message:"send all details"})
        }

        const agent=await Agent.create({
            name,knowledgeBase,instructions,tools
        })

        return res.status(201).json(agent)
    } catch (error) {
        return res.status(500).json({message:`create agent error ${error}`})
    }
}