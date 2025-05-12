// src/server.ts
import express, { Request, Response } from 'express';
import OpenAI from "openai";
const app = express();
const port = 3001;

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});
  

// Basic route
app.post('/flirt/response', async (req: Request, res: Response) => {
    
    const { userMessage } = req.body;

    const response = await openai.responses.create({
        model: "gpt-3.5-turbo",
        input: [],
        text: {
          "format": {
            "type": userMessage
          }
        },
        reasoning: {},
        tools: [],
        temperature: 1,
        max_output_tokens: 2048,
        top_p: 1,
        store: true
    });
});
  
  // Submit feedback after a chat
  app.post('/flirt/feedback', (req: Request, res: Response) => {
    res.send('Feedback submitted!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
