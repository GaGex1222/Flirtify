// src/server.ts

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'; // <--- Import cors

import express from 'express';
import OpenAI from "openai";
const app = express();
const port = 3001;
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});
  

// Basic route
app.post('/flirt/chat', async (req, res) => {
    
    const { userMessage, conversation } = req.body;
    console.log(conversation)
    console.log("message: ", userMessage)
    const messages = [
      ...conversation,
      {role: "user", "content": userMessage}
    ]
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1,
      max_tokens: 2048,
    });

    const aiMessage = response.choices[0].message.content
    res.json({aiMessage: aiMessage})
});
  
  // Submit feedback after a chat
  app.post('/flirt/feedback', (req, res) => {
    res.send('Feedback submitted!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
