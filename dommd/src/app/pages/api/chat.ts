import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OPENAI_API_KEY = 'key';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;

  try {
    // Make a request to the OpenAI GPT API to generate the response
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Patient: ${message}\nDoctor:`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
        stop: 'Patient:',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const { choices } = response.data;
    const chatbotResponse = choices[0].text.trim();

    // Extract diagnoses, treatments, and recommended doctors from the chatbot response
    const diagnoses = extractDiagnoses(chatbotResponse);
    const treatments = extractTreatments(chatbotResponse);
    const doctors = extractDoctors(chatbotResponse);

    return res.status(200).json({ response: chatbotResponse, diagnoses, treatments, doctors });
  } catch (error) {
    console.error('Error calling OpenAI GPT API:', error);
    return res.status(500).json({ message: 'Error generating chatbot response' });
  }
};

// Helper function to extract possible diagnoses from the chatbot response
const extractDiagnoses = (response: string): string[] => {
  // Your logic to extract diagnoses from the response goes here
  // You can use regular expressions, string manipulation, or other techniques
  // to extract relevant information from the chatbot response
  const diagnoses = [];

  // Example extraction logic:
  const regex = /Possible diagnosis: ([^\n]+)/g;
  let match;
  while ((match = regex.exec(response))) {
    diagnoses.push(match[1]);
  }

  return diagnoses;
};

// Helper function to extract possible treatments from the chatbot response
const extractTreatments = (response: string): string[] => {
  // Your logic to extract treatments from the response goes here
  // Similar to the extractDiagnoses function, you can use the appropriate
  // techniques to extract relevant information from the chatbot response
  const treatments = [];

  // Example extraction logic:
  const regex = /Possible treatment: ([^\n]+)/g;
  let match;
  while ((match = regex.exec(response))) {
    treatments.push(match[1]);
  }

  return treatments;
};

// Helper function to extract recommended doctors from the chatbot response
const extractDoctors = (response: string): string[] => {
  // Your logic to extract recommended doctors from the response goes here
  // Similar to the extractDiagnoses and extractTreatments functions,
  // use the appropriate techniques to extract relevant information
  const doctors = [];

  // Example extraction logic:
  const regex = /Recommended doctor: ([^\n]+)/g;
  let match;
  while ((match = regex.exec(response))) {
    doctors.push(match[1]);
  }

  return doctors;
};

export default handler;
