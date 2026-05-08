import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // Key is managed server-side in production ideally
});

export async function openaiBreakDownTask(taskTitle: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a tactical academic advisor. Break down tasks into a JSON array of objects with title and description.'
      },
      {
        role: 'user',
        content: `Break down: ${taskTitle}`
      }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content || '{"steps": []}';
  const parsed = JSON.parse(content);
  return parsed.steps || parsed.tasks || [];
}
