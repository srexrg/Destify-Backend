import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function fetchData(preferences, budget, numTravelers, month,currency) {
  const prompt = `
  # Discover Your Ideal Travel Destination
  
  Plan your trip with a budget of ${budget} for ${numTravelers} travelers in ${currency}, intending to travel in the month of ${month}.
  
  ## Preferences
  Your main preferences are ${preferences}. Immerse yourself in breathtaking scenic landscapes, embrace rich cultural experiences, and explore thrilling adventure opportunities. Additionally, gain insights into the local community and their way of life.
  
  Please avoid using bold text to highlight the responses and use CommonMark Markdown for the response, with headings formatted using #, ##, ###.
  `;
  

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const res = text;
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchData;
