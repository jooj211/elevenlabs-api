    import axios from "axios";

    const ELEVEN_LABS_API_URL = "https://api.elevenlabs.io/v1";
    const API_KEY = process.env.XI_API_KEY;

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

interface SpeechResponse {
  audio_data: ArrayBuffer;
}

interface Voice {
  voice_id: string;
  name: string;
  description: string;
}

export const generateSpeech = async (text: string, voiceId: string): Promise<SpeechResponse> => {
  try {
    const response = await instance.post(
      `/text-to-speech/${voiceId}`,
      { text },
      { responseType: 'arraybuffer' }
    );

    return { audio_data: response.data };
  } catch (error) {
    console.error("Erro gerando o áudio: ", error);
    throw error;
  }
};

export const fetchVoices = async (): Promise<Voice[]> => {
  try {
    const response = await instance.get('/voices');
    return response.data.voices;
  } catch (error) {
    console.error("Erro buscando vozes: ", error);
    throw error;
  }
};
