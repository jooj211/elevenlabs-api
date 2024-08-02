"use client";

import { generateSpeech } from "@/lib/elevenLabsService";
import { Button, message } from "antd";
import React from "react";
import "../styles/DropdownButton.css";
import { useVoiceContext } from "./VoiceContext";

export const GenerateButton:  React.FC<{ text: string }> = ({ text }) => {
  const { selectedVoice } = useVoiceContext();

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
      const voiceSettings = {
        stability: 0.5,
        similarity_boost: 0.75,
      };

      const audioUrl = await generateSpeech(selectedVoice.voice_id, text, voiceSettings);
      const audio = new Audio(audioUrl);
      audio.play();

      message.success("Fala gerada com sucesso!");
    } catch (error) {
      message.error("Falha ao gerar fala");
    }
  };

  return <Button onClick={handleGenerateSpeech}>Gerar fala</Button>;
};

export default GenerateButton;