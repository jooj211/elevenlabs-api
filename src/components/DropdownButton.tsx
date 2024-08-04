"use client";

import { generatePreview } from "@/lib/elevenLabsService";
import { DownOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, Spin } from "antd";
import React, { useState } from "react";
import "../styles/DropdownButton.css";
import { useVoiceContext } from "./VoiceContext";

const DropdownButton: React.FC = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceContext();
  const [loading, setLoading] = useState(false);
  const orderedKeys = ['category', 'use_case', 'accent', 'gender', 'age', 'description'];

  const handleMenuClick: any = (e: any) => {
    // console.log('e:', e);
    const selected = voices.find((voice) => voice.voice_id === e.voice_id);
    if (selected) {
      setSelectedVoice(selected);
      message.success(`Voz selecionada: ${selected.name}`);
      // console.log('Voz selecionada:', selected);
    }
  };

  const handlePreviewClick = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que quando o botão de play seja clicado, o menu também seja aberto

    try {
      setLoading(true);
      const audioUrl = await generatePreview(selectedVoice.preview_url);
      const audio = new Audio(audioUrl);
      setLoading(false);
      audio.play();

      message.success("Fala gerada com sucesso!");
    } catch (error) {
      message.error("Falha ao gerar fala");
      console.error("Falha ao gerar fala:", error);
    }
  };

  const formatLabel = (label: string) => {
    return label
      .split('_') // Separa os sublinhados
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palavra
      .join(' '); // Junta novamente com espaços
  };

  const renderLabels = (labels: Record<string, string>) => {
    return orderedKeys.map((key) => {
      if (labels[key]) {
        return (
          <span
            key={key}
            className={`label ${key.toLowerCase()}`}
            data-label={formatLabel(key)}
          >
            {labels[key]}
          </span>
        );
      }
      return null;
    });
  };

  const menu = (
    <Menu className="custom-menu">
      {voices.map(voice => (
        <Menu.Item
          className="menu-item"
          key={voice.name}
          onClick={() => handleMenuClick(voice)}
        >
          <div className="voice-item">
            <span className="voice-name">{voice.name}</span>
            <div className="voice-labels">{renderLabels(voice.labels)}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="parent-div">
      <Dropdown overlay={menu} trigger={['click']} className="dropdown-menu">
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
                <div className="selected-voice">
                  <span className="voice-name">{selectedVoice.name}</span>
                  <div className="labels">
                    <span
                      key="category"
                      className={`label category`}
                      data-label={formatLabel('category')}
                    >
                      {selectedVoice.category}
                    </span>
                    {selectedVoice.labels && renderLabels(selectedVoice.labels)}
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
