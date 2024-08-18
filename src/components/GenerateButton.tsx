"use client";

import { handleGenerateSpeech } from "@/utils/speechUtils";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useState } from "react";
import "../styles/VoiceList.css";
import { useVoiceContext } from "./hooks/useVoiceContext";

export const GenerateButton:  React.FC<{ text: string }> = ({ text }) => {
  const { selectedVoice } = useVoiceContext();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Spin className="loading" />
      ) : (
        <PlayCircleOutlined
          className="play-icon" 
          onClick={!text.trim() ? undefined : () => handleGenerateSpeech(selectedVoice, text, setLoading).catch((error) => console.error(error))}
          style={{ 
            opacity: !text.trim() ? 0 : undefined,
            cursor: !text.trim() ? 'default' : 'pointer'
          }} />
      )}
    </>
  );
};

export default GenerateButton;