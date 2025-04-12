import axios from "axios";

export const shortenNotes = async (text) => {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v2/summarize",
      { text, length: "medium" },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { summary: response.data.summary };
  } catch (error) {
    console.error("Cohere Error:", error.message);
    throw new Error("Failed to summarize");
  }
};