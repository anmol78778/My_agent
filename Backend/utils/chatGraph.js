import { ChatGroq } from "@langchain/groq"
import { StateSchema, MessagesValue, StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";
import { MongoClient } from "mongodb";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";

import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({
    path: fileURLToPath(
        new URL("../.env", import.meta.url)
    )
});

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})

const client = new MongoClient(process.env.MONGODB_URI);
const checkpointer = new MongoDBSaver({ client,dbName: "langgraph" });

const chatNode=async (state)=>{
    const response=await llm.invoke(state.messages)

    return {
        messages:[response]
    }
}

const workflow=new StateGraph(MessagesAnnotation)
.addNode("chatNode",chatNode)
.addEdge("__start__","chatNode")
.addEdge("chatNode","__end__")

const chatGraph=workflow.compile({checkpointer})

export default chatGraph