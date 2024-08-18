import { useState } from 'react';
import { message } from 'antd';
import { generatePreview } from "@/lib/elevenLabsService";
import { useVoiceContext } from './useVoiceContext';
import { Voice } from '@/types/ElevenLabs';

export const useVoice = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceContext();
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);

  const handleSelectVoice = (voice: Voice) => {
    setSelectedVoice(voice);
    console.log("Voice ID: " + voice.voice_id);
    message.success(`Voz selecionada: ${voice.name}`);
  };

  const handlePreviewClick = async (event: React.MouseEvent, voice: any) => {
    event.stopPropagation();

    try {
      setLoadingVoiceId(voice.voice_id);
      const audioUrl = await generatePreview(voice.preview_url);
      const audio = new Audio(audioUrl);
      audio.play();
      setLoadingVoiceId(null);

      message.success("Fala gerada com sucesso!");
    } catch (error) {
      setLoadingVoiceId(null);
      message.error("Falha ao gerar fala");
      console.error("Falha ao gerar fala:", error);
    }
  };

  return {
    voices,
    selectedVoice,
    loadingVoiceId,
    handleSelectVoice,
    handlePreviewClick,
  };
};
