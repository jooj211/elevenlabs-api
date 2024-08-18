"use client";

import { formatLabel, showLabel } from "@/utils/labelUtils";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Card, List, Spin, Tag } from "antd";
import React from 'react';
import "../styles/VoiceList.css";
import { useVoice } from "./hooks/useVoice";
import { useVoiceContext } from "./hooks/useVoiceContext";
import useVoiceFilters from "./hooks/useVoiceFilters";

const VoiceList: React.FC = () => {
  const { voices, selectedVoice, loadingVoiceId, handleSelectVoice, handlePreviewClick } = useVoice();
  const filteredVoices = useVoiceFilters().filteredVoices;
  const activeFilters = useVoiceContext().activeFilters;

  const filters = Object.keys(voices[0]?.labels || {});

  return (
    <div className="voice-list-container">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredVoices}
        renderItem={voice => (
          <List.Item>
            <Card
              className={`voice-item ${selectedVoice?.voice_id === voice.voice_id ? 'selected' : ''}`}
              onClick={() => handleSelectVoice(voice)}
              title={voice.name}
              extra={
                <div className="labels-container">
                        {filters.map((key) => {
                          if ((voice.labels as Record<string, string>)[key] && showLabel((voice.labels as Record<string, string>)[key], activeFilters[key])) {
                            return (
                              <Tag
                                key={key}
                                className={`label ${key.toLowerCase()} `}
                                data-label={formatLabel(key, '_')}
                              >
                                {formatLabel((voice.labels as Record<string, string>)[key], '_')}
                              </Tag>
                            );
                          }
                          return null;
                        })}
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
