import { fetchVoices } from '@/lib/elevenLabsService';
import { VoiceContextType } from '@/types/ElevenLabs';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActiveFilter } from '@/types/ElevenLabs';

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<any | null>(null);
  const [text, setText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilter>({
    category: null,
    gender: null,
    accent: null,
    age: null,
    use_case: null,
});

  useEffect(() => {
    const loadVoices = async () => {
      try {
        const fetchedVoices = await fetchVoices();
        setVoices(fetchedVoices);
        // console.log('Voices:', fetchedVoices);
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    loadVoices();
  }, []);

  return (
    <VoiceContext.Provider value={{ voices, selectedVoice, setSelectedVoice, text, setText, activeFilters, setActiveFilters }}>
      {children}
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
