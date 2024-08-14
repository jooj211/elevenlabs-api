"use client";

import { generatePreview } from "@/lib/elevenLabsService";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Card, List, message, Spin, Tag } from "antd";
import React, { useState } from "react";
import "../styles/VoiceList.css";
import { useVoiceContext } from "./VoiceContext";

const VoiceList: React.FC = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceContext();
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null); // Track the voice ID that is currently loading
  const orderedKeys = ['category', 'use_case', 'accent', 'gender', 'age', 'description'];

  const handleSelectVoice = (voice: any) => {
    setSelectedVoice(voice);
    message.success(`Voz selecionada: ${voice.name}`);
  };

  const handlePreviewClick = async (event: React.MouseEvent, voice: any) => {
    event.stopPropagation(); // Prevent the list item from being selected when the play button is clicked

    try {
      setLoadingVoiceId(voice.voice_id); // Set the loading state to the clicked voice ID
      const audioUrl = await generatePreview(voice.preview_url);
      const audio = new Audio(audioUrl);
      audio.play();
      setLoadingVoiceId(null); // Clear the loading state once the preview is ready

      message.success("Fala gerada com sucesso!");
    } catch (error) {
      setLoadingVoiceId(null); // Clear the loading state in case of error
      message.error("Falha ao gerar fala");
      console.error("Falha ao gerar fala:", error);
    }
  };

  const formatLabel = (label: string) => {
    return label
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderLabels = (labels: Record<string, string>) => {
    return orderedKeys.map((key) => {
      if (labels[key]) {
        return (
          <Tag
            key={key}
            className={`${key.toLowerCase()}`}
          >
            {formatLabel(labels[key])}
          </Tag>
        );
      }
      return null;
    });
  };

  return (
    <div className="voice-list-container">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={voices}
        renderItem={voice => (
          <List.Item>
            <Card
              className={`voice-item ${selectedVoice?.voice_id === voice.voice_id ? 'selected' : ''}`}
              onClick={() => handleSelectVoice(voice)}
              title={voice.name}
              extra={
                <div className="labels-container">
                  {renderLabels(voice.labels)}
                </div>
              }
              headStyle={{ borderBottom: 'none' }}
            >
           
           {
                loadingVoiceId === voice.voice_id ? (
                  <Spin className="loading" />
                ) : (
                  <PlayCircleOutlined
                    className="play-icon"
                    onClick={(event) => handlePreviewClick(event, voice)}
                  />
                )
              }

            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default VoiceList;