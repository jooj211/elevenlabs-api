import { useEffect, useState } from 'react';
import { Voice } from '@/types/ElevenLabs';
import { useVoiceContext } from './useVoiceContext';

const useVoiceFilters = () => {
  const { voices, setVoiceLabels } = useVoiceContext();
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const { activeFilters, setActiveFilters } = useVoiceContext();

  const handleFilterChange = (value: string | null, filterName: string): void => {
    setActiveFilters({
      ...activeFilters,
      [filterName]: value ?? '',
    });
  };

  useEffect(() => {
    const filtered = voices.filter(voice =>
      Object.keys(activeFilters).every(key => {
        const labelKey = key as keyof Voice['labels'];
        const filterValue = activeFilters[key];
        return !filterValue || filterValue === "all" || voice.labels[labelKey] === filterValue;
      })
    );
    setFilteredVoices(filtered);
  }, [voices, activeFilters]);

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

      setVoiceLabels(voiceLabels);
    }
  }, [voices, setVoiceLabels]);

  return {
    filteredVoices,
    handleFilterChange,
    activeFilters,
  };
};

export default useVoiceFilters;
