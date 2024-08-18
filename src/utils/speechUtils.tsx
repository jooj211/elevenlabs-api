import { message } from "antd";
import { generateSpeech } from "@/lib/elevenLabsService";
import { Voice } from "@/types/ElevenLabs";

export const handleGenerateSpeech = async (selectedVoice: Voice, text: string, setLoading: (loading: boolean) => void) => {
  if (!selectedVoice) {
    message.error("Nenhuma voz selecionada!");
    return;
  }

  if (!text.trim()) {
    message.error("Texto não pode estar vazio!");
    return;
  }

  try {
    setLoading(true);
    const audioUrl = await generateSpeech(selectedVoice.voice_id, text);
    const audio = new Audio(audioUrl);
    setLoading(false);
    audio.play();

    message.success("Fala gerada com sucesso!");
  } catch (error) {
    message.error("Falha ao gerar fala");
  }
};
