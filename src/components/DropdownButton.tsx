"use client";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, message, Space } from "antd";
import React from "react";
import "../styles/DropdownButton.css";
import { useVoiceContext } from "./VoiceContext"; // Import the context

const DropdownButton: React.FC = () => {
  const { voices, selectedVoice, setSelectedVoice } = useVoiceContext();

  // Map voices to dropdown items
  const items: MenuProps["items"] = voices.map((voice) => ({
    label: voice.name,
    key: voice.voice_id,
    icon: <UserOutlined />,
  }));

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selected = voices.find((voice) => voice.voice_id === e.key);
    if (selected) {
      setSelectedVoice(selected); // Set selected voice in context
      message.success(`Voz selecionada: ${selected.name}`);
    }
  };

  return (
      <Dropdown menu={{ items, onClick: handleMenuClick }} className="dropdown-menu">
        <Button>
          <Space className="space">
            {selectedVoice ? selectedVoice.name : "Selecione uma Voz"} {/* Display selected voice name */}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
  );
};

export default DropdownButton;
