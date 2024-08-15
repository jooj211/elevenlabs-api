"use client";

import { PlayCircleOutlined } from "@ant-design/icons";
import { Card, List, Spin } from "antd";
import React from 'react';
import "../styles/VoiceList.css";
import { useVoice } from "./hooks/useVoice";
import { renderLabels } from "@/utils/Labels";

const VoiceList: React.FC = () => {
  const { voices, selectedVoice, loadingVoiceId, handleSelectVoice, handlePreviewClick } = useVoice();

  console.log("VoiceList -> voices", { category: voices[0]?.category, ...voices[0]?.labels });

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
                  {renderLabels({ category: voice.category, ...voice.labels })}
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
