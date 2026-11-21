import { ChatGroq } from "@langchain/groq"
import { StateSchema, MessagesValue, StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})

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

const chatGraph=workflow.compile()