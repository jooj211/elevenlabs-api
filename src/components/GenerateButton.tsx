"use client";

import { generateSpeech } from "@/lib/elevenLabsService";
import { PlayCircleOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React, { useState } from "react";
import "../styles/VoiceList.css";
import { useVoiceContext } from "./hooks/useVoiceContext";

export const GenerateButton:  React.FC<{ text: string }> = ({ text }) => {
  const { selectedVoice } = useVoiceContext();
  const [loading, setLoading] = useState(false);

  const handleGenerateSpeech = async () => {
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

  return (
    <>
      {loading ? (
        <Spin className="loading" />
      ) : (
        <PlayCircleOutlined
        className="play-icon" 
        onClick={!text.trim() ? undefined : handleGenerateSpeech}
        style={{ 
          opacity: !text.trim() ? 0 : undefined,
          cursor: !text.trim() ? 'default' : 'pointer'
        }} />
      )}
    </>
  );
};

export default GenerateButton;