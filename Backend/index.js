// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDb from "./config/db.js";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth.routes.js";


// dotenv.config();

// const app = express();

// const PORT = process.env.PORT || 8000;
// app.use(cors({
//   origin:"http://localhost:5173",
//   credentials:true
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (req, res) => {
//     res.send("Backend is working!");
// });
// app.use("/api/auth",authRouter)

// app.listen(PORT, () => {
//   connectDb();
//   console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import agentRouter from "./routes/agent.routes.js";
import chatRouter from "./routes/chat.routes.js";



const app = express();
const PORT = 8000;
console.log(process.env.GROQ_API_KEY)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    console.log("Root route accessed!");
    res.status(200).send("Backend is working!");
});

// Test API route
app.get("/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API connection successful!"
    });
});

app.use("/api/auth", authRouter);
app.use("/api/agent", agentRouter);
app.use("/api/chat",chatRouter)

// Start server
const server = app.listen(PORT, "0.0.0.0", async () => {
    console.log("--------------------------------");
    console.log("SERVER STARTED SUCCESSFULLY");
    console.log("Port:", PORT);
    console.log("Address:", server.address());
    console.log("--------------------------------");

    try {
        await connectDb();
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
    }
});

server.on("error", (error) => {
    console.log("SERVER ERROR:", error);
});
