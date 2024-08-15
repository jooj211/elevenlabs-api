import { GenerateButton } from '@/components/GenerateButton';
import VoiceList from '@/components/VoiceList';
import VoiceFilters from './VoiceFilters';
import { fetchVoices } from '@/lib/elevenLabsService';
import { VoiceContextType } from '@/types/ElevenLabs';
import TextArea from 'antd/es/input/TextArea';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { VoiceProvider as ExternalVoiceProvider, useVoiceContext } from './hooks/useVoiceContext';

export const VoiceSelection: React.FC<{}> = ({}) => {
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