import { GenerateButton } from '@/components/GenerateButton';
import VoiceList from '@/components/VoiceList';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useVoiceContext } from './hooks/useVoiceContext';
import VoiceFilters from './VoiceFilters';

export const VoiceGeneration: React.FC<{}> = ({}) => {
  const { text, setText } = useVoiceContext();

  return (
    <div>
          <div className="input-container">
            <TextArea placeholder="Enter text" rows={2} className="input-box" onChange={(e) => setText(e.target.value)} />
            <GenerateButton text={text} />
          </div>
          <div className="voice-container">
            <VoiceFilters />
            <p className="voice-choice">Selecione uma voz</p>
            <VoiceList />
          </div>
    </div>
  );
};