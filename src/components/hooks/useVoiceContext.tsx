import { Voice, VoiceContextType } from '@/types/ElevenLabs';
import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { fetchVoices } from '@/lib/elevenLabsService';
import { formatLabel } from '@/utils/labelUtils';

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<any | null>(null);
  const [text, setText] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    category: '',
    gender: '',
    accent: '',
    age: '',
    use_case: '',
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

        console.log(typeof fetchedVoices[0]?.category);

        const voices = fetchedVoices.map((voice: any) => {
            return {
            voice_id: voice.voice_id,
            preview_url: voice.preview_url,
            name: voice.name,
            labels: {
              'category': formatLabel(voice.category),
              'gender': formatLabel(voice.labels.gender),
              'accent': formatLabel(voice.labels.accent),
              'age': formatLabel(voice.labels.age, '-'),
              'use_case': formatLabel(voice.labels.use_case),
            },
            };
        });

        setVoices(voices);

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
                category: voice.labels.category,
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
    <VoiceContext.Provider value={{
      voices, setVoices, selectedVoice, setSelectedVoice,
      text, setText, activeFilters, setActiveFilters,
      voiceLabels, setVoiceLabels,
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoiceContext = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }
  return context;
};
