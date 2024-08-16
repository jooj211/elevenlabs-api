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
  const [voiceLabels, setVoiceLabels] = useState<Record<string, string[]>>({
    category: [],
    gender: [],
    accent: [],
    age: [],
    use_case: [],
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

  useEffect(() => {
    if (voices.length > 0) {
        const voiceLabels = voices.reduce((acc, voice) => {
            const labels = {
                category: voice.category,
                gender: voice.labels.gender,
                accent: voice.labels.accent,
                age: voice.labels.age,
                use_case: voice.labels.use_case,
            };

            Object.keys(labels).forEach((key) => {
                const labelKey = key as keyof typeof labels;
                const value = labels[labelKey];

                if (!acc[labelKey].includes(value)) {
                    acc[labelKey].push(value);
                }
            });

            return acc;
        }, {
            category: [],
            gender: [],
            accent: [],
            age: [],
            use_case: [],
        } as Record<string, string[]>);

        console.log('Voice Labels:', voiceLabels);
        setVoiceLabels(voiceLabels);
    }
}, [voices]);


  return (
    <VoiceContext.Provider value={{ voices, selectedVoice, setSelectedVoice, text, setText, activeFilters, setActiveFilters, voiceLabels }}>
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
