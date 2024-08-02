import DropdownButton from '@/components/DropdownButton';
import { GenerateButton } from '@/components/GenerateButton';
import { fetchVoices } from '@/lib/elevenLabsService';
import { VoiceContextType } from '@/types/ElevenLabs';
import TextArea from 'antd/es/input/TextArea';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Voice {
  voice_id: string;
  name: string;
  description: string;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{}> = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const loadVoices = async () => {
      try {
        const fetchedVoices = await fetchVoices();
        setVoices(fetchedVoices);
        setSelectedVoice(fetchedVoices[0] || null); // Default to first voice
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    loadVoices();
  }, []);

  return (
    <VoiceContext.Provider value={{ voices, selectedVoice, setSelectedVoice }}>
          <div className="voice-container">
            <p className="voice-choice">Selecione uma voz</p>
            <DropdownButton />
          </div>
          <div className="input-container">
            <TextArea placeholder="Enter text" rows={2} className="input-box" onChange={(e) => setText(e.target.value)} />
            <GenerateButton text={text} />
          </div>
    </VoiceContext.Provider>
  );
};

export const useVoiceContext = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoiceContext deve ser usado em um VoiceProvider');
  }
  return context;
};