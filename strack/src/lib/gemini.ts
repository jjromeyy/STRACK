import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";

// API keys are injected by the platform
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const modelName = "gemini-3-flash-preview";

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true }) 
  : null;

export async function summarizeNote(noteContent: string) {
  const model = ai.getGenerativeModel({ model: modelName });
  const response = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: `Summarize the following study note content into a concise set of key takeaways. Note content: ${noteContent}` }] }],
  });
  return response.response.text();
}

export async function breakDownTask(taskTitle: string, taskDescription?: string) {
  // Prefer OpenAI if configured
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a tactical academic advisor. Break down tasks into a JSON array of 3-5 manageable sub-steps with 'title' and 'description' fields. Return a JSON object with a 'steps' key containing the array." },
          { role: "user", content: `Task: ${taskTitle}. Description: ${taskDescription || 'None'}` }
        ],
        response_format: { type: "json_object" }
      });
      const parsed = JSON.parse(response.choices[0].message.content || '{"steps": []}');
      return parsed.steps || parsed.tasks || [];
    } catch (err) {
      console.warn("OpenAI breakdown failed, falling back to Gemini", err);
    }
  }

  const model = ai.getGenerativeModel({ model: modelName });
  const response = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: `Break down the following academic task into 3-5 manageable sub-steps. Task: ${taskTitle}. Description: ${taskDescription || 'None'}` }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title"]
        }
      }
    }
  });
  return JSON.parse(response.response.text() || "[]");
}

export async function extractGrades(imageB64: string, mimeType: string) {
  const model = ai.getGenerativeModel({ model: modelName });
  const response = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: "Extract the subjects, grades/scores, and total possible scores from this image." },
          { inlineData: { data: imageB64, mimeType } }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            score: { type: Type.NUMBER },
            maxScore: { type: Type.NUMBER }
          },
          required: ["subject", "score"]
        }
      }
    }
  });
  return JSON.parse(response.response.text() || "[]");
}

export async function extractSyllabus(imageB64: string, mimeType: string) {
  const model = ai.getGenerativeModel({ model: modelName });
  const response = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: "Extract important dates, exams, and class schedules from this syllabus image. For class schedules, provide the recurring day of week and time." },
          { inlineData: { data: imageB64, mimeType } }
        ]
      }
    ],
    generationConfig: {
       responseMimeType: "application/json",
       responseSchema: {
         type: Type.ARRAY,
         items: {
           type: Type.OBJECT,
           properties: {
             title: { type: Type.STRING },
             date: { type: Type.STRING, description: "ISO format date or specific string if range" },
             time: { type: Type.STRING },
             location: { type: Type.STRING },
             type: { 
               type: Type.STRING, 
               enum: ["exam", "class", "assignment"],
               description: "The category of the event"
             }
           },
           required: ["title", "type"]
         }
       }
    }
  });
  return JSON.parse(response.response.text() || "[]");
}
