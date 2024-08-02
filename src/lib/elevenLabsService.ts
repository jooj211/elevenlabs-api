import axios from "axios";
import { SpeechResponse, Voice, VoiceSettings } from "@/types/ElevenLabs";

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

export const fetchVoices = async (): Promise<Voice[]> => {
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
  text: string,
  voiceSettings: VoiceSettings
): Promise<string> => {
  const url = `${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`;
  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": API_KEY || "",
  };
  const data = {
    text,
    model_id: "eleven_monolingual_v1", // You can choose another model
    voice_settings: voiceSettings,
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

    // Convert the response to an audio blob
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return audioUrl;
  } catch (error) {
    console.error("Falha ao gerar fala:", error);
    throw error;
  }
};
