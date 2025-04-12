import axios from "axios";

export const shortenNotes = async (text) => {
  try {
    console.log("Cohere API Key:", import.meta.env.VITE_COHERE_API_KEY ? "Loaded" : "Missing");
    console.log("Sending to Cohere:", text);
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
    console.log("Cohere Response:", response.data);
    return { summary: response.data.summary };
  } catch (error) {
    console.error("Cohere Error:", error.response?.data || error.message);
    throw new Error("Failed to summarize");
  }
};