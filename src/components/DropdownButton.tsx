"use client";

import { generatePreview } from "@/lib/elevenLabsService";
import { DownOutlined, PlayCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message, Space, Spin } from "antd";
import React, { useState } from "react";
import "../styles/DropdownButton.css";
import { useVoiceContext } from "./VoiceContext";

const DropdownButton: React.FC = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceContext();
  const [loading, setLoading] = useState(false);

  const items: MenuProps["items"] = voices.map((voice) => ({
    label: voice.name,
    key: voice.voice_id,
    icon: <UserOutlined />,
  }));

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selected = voices.find((voice) => voice.voice_id === e.key);
    if (selected) {
      setSelectedVoice(selected);
      message.success(`Voz selecionada: ${selected.name}`);
      console.log('Voz selecionada:', selected);
  }
  };

  const handlePreviewClick = async () => {
    if (!selectedVoice) {
      message.error("Nenhuma voz selecionada!");
      return;
    }

    try {
      setLoading(true);
      const audioUrl = await generatePreview(selectedVoice.preview_url);
      const audio = new Audio(audioUrl);
      setLoading(false);
      audio.play();

      message.success("Fala gerada com sucesso!");
    } catch (error) {
      message.error("Falha ao gerar fala");
    }
  };

  return (
    <div className="parent-div">
      <Dropdown menu={{ items, onClick: handleMenuClick }} className="dropdown-menu">
        <Button className="voice-button">
          <Space className="space">
            {selectedVoice && (
              <>
                {loading ? (
                  <Spin className="loading" />
                ) : (
                  <PlayCircleOutlined
                    className="play-icon"
                    onClick={handlePreviewClick}
                  />
                )}
                <div className="voice-and-labels">
                <span className="voice-name">{selectedVoice.name}</span>
                <div className="labels">
                {selectedVoice.labels && Object.entries(selectedVoice.labels).map(([key, value]) => (
                  <span key={key} className={`label ${key.toLowerCase()}`}>{value as React.ReactNode}</span>
                ))}
                </div>
                </div>
              </>
            )}
            {!selectedVoice && (
              <span style={{ flexGrow: 1 }}>
                Selecione uma Voz
              </span>
            )}
            <DownOutlined style={{ marginLeft: 'auto' }} />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownButton;
