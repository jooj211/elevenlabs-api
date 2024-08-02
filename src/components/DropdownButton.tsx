"use client";

import { fetchVoices } from "@/lib/elevenLabsService";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import "../styles/DropdownButton.css";

interface Voice {
  voice_id: string;
  name: string;
  description: string;
}

const DropdownButton: React.FC = () => {
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [voicesMap, setVoicesMap] = useState<Record<string, string>>({});
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("Selecione uma Voz");

  useEffect(() => {
    const loadVoices = async () => {
      try {
        const voices = await fetchVoices();
        const voiceItems = voices.map((voice: Voice) => ({
          label: voice.name,
          key: voice.voice_id,
          icon: <UserOutlined />,
        }));

        const voiceMap = voices.reduce((acc, voice) => {
          acc[voice.voice_id] = voice.name;
          return acc;
        }, {} as Record<string, string>);

        setItems(voiceItems);
        setVoicesMap(voiceMap);
      } catch (error) {
        console.error("Erro ao buscar vozes:", error);
        message.error("Erro ao buscar vozes");
      }
    };

    loadVoices();
  }, []);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const voiceName = voicesMap[e.key];
    setSelectedVoiceName(voiceName); // Update the selected voice name
    console.log(`Selected voice ID: ${e.key}`);
    message.success(`Voz selecionada: ${voiceName}`);
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} className="dropdown-menu">
      <Button>
        <Space className="space">
          {selectedVoiceName}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DropdownButton;
