import { ActiveFilter } from '@/types/ElevenLabs';
import { filters } from '@/utils/Labels';
import { useVoiceContext } from './useVoiceContext';

export const useVoiceFilters = () => {
    const { activeFilters, setActiveFilters } = useVoiceContext();

    const handleFilterChange = (value: string | null, filterName: keyof ActiveFilter): void => {
                setActiveFilters({
            ...activeFilters,
            [filterName]: value})
    };
    
    

    return {
        handleFilterChange,
        filters
    };
};

export default useVoiceFilters;