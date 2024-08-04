import axios from "axios";

const ELEVEN_LABS_API_URL = "https://api.elevenlabs.io/v1";
const API_KEY = process.env.NEXT_PUBLIC_XI_API_KEY;

console.log('Process Base URL: ' + process.env.NEXT_PUBLIC_BASE_URL);
console.log('Process API Key: ' + process.env.NEXT_PUBLIC_XI_API_KEY);

if (!API_KEY) {
  console.error("Chave API não encontrada. Por favor, a defina nas suas variáveis de ambiente.");
}

const instance = axios.create({
  baseURL: ELEVEN_LABS_API_URL,
  headers: {  
    'Accept': 'application/json',
    'xi-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export const fetchVoices = async (): Promise<any[]> => {
  try {
    const response = await instance.get('/voices');
    return response.data.voices;
  } catch (error) {
    console.error("Erro buscando vozes: ", error);
    throw error;
  }
};


export const generateSpeech = async (
  voiceId: string,
  text: string
): Promise<string> => {
  const url = `${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`;
  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY || "",
  };
  const data = {
    text,
    model_id: "eleven_multilingual_v2",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error("Falha ao gerar fala:", error);
    throw error;
  }
};

export const generatePreview = async (
  preview_url: string
): Promise<string> => {
  try {
    const response = await fetch(preview_url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error("Failed to generate speech preview:", error);
    throw error;
  }
};

