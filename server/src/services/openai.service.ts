import OpenAI from "openai";
import dotenv from "dotenv";
import { UserProfile } from "../types/user.types";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  // Workout Plan Generation
  static async generateWorkoutPlan(userProfile: UserProfile) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert fitness trainer. Generate a personalized workout plan based on the user's profile.
          The plan should be detailed, safe, and progressive. Include:
          1. Weekly workout schedule
          2. Exercise descriptions with proper form cues
          3. Sets, reps, and rest periods
          4. Progression recommendations
          5. Safety considerations based on user's health information
          6. Modifications for available equipment`,
        },
        {
          role: "user",
          content: JSON.stringify(userProfile),
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });
    return completion.choices[0].message.content;
  }

  // Form Analysis
  static async analyzeForm(imageUrl: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert in exercise form analysis. Analyze the exercise form in the image and provide:
          1. Overall form assessment
          2. Specific areas for improvement
          3. Safety concerns
          4. Step-by-step corrections
          5. Common mistakes to avoid
          6. Tips for proper form`,
        },
        {
          role: "user",
          content: `Analyze this exercise form: ${imageUrl}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });
    return completion.choices[0].message.content;
  }

  // Quick Tips and General Questions
  static async getQuickResponse(query: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful fitness assistant. Provide concise, accurate answers to fitness-related questions. Focus on safety and evidence-based information.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });
    return completion.choices[0].message.content;
  }

  // Generate Exercise Visual Guide
  static async generateExerciseGuide(exerciseName: string) {
    const completion = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a clear, professional illustration of proper form for the exercise: ${exerciseName}. 
      Show the correct posture and movement. Include:
      1. Starting position
      2. Movement path
      3. Key form points
      4. Common mistakes to avoid
      Make it suitable for a fitness app.`,
      n: 1,
      size: "1024x1024",
    });
    return completion.data[0].url;
  }

  // Journal Analysis
  static async analyzeJournalEntry(entry: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: `You are a fitness and wellness coach. Analyze the journal entry and provide:
          1. Emotional and physical state assessment
          2. Progress insights
          3. Motivation and encouragement
          4. Specific recommendations for improvement
          5. Actionable next steps
          Keep the tone supportive and constructive.`,
        },
        {
          role: "user",
          content: entry,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    return completion.choices[0].message.content;
  }
}
