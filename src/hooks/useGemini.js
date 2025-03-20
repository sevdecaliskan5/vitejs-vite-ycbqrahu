import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function useGemini() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGeminiResponse = async (userInput) => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent([userInput]);
      const text = await result.response.text();

      setResponse(text);
    } catch (err) {
      setError("API Hatası: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetchGeminiResponse };
}

