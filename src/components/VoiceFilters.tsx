import { Select } from 'antd';
import React from 'react';
import { useVoiceContext } from './hooks/useVoiceContext';
import useVoiceFilters from './hooks/useVoiceFilters';
import { formatLabel } from '@/utils/Labels';
import { ActiveFilter, voiceLabels } from '@/types/ElevenLabs';

const VoiceFilters: React.FC = () => {
    const { activeFilters } = useVoiceContext();
    const { handleFilterChange } = useVoiceFilters();


    const onFilterChange = (value: string | null, filterName: keyof ActiveFilter) => {
        handleFilterChange(value, filterName);
    };

    return (
        <div className='filters'>
            {Object.keys(voiceLabels).map((filter) => (
                <div key={filter} className="filter-select">
                    <h3>{filter.toUpperCase()}</h3>
                    <Select
                        placeholder={`Select a ${filter}`}
                        style={{ width: 200 }}
                        onChange={(value) => onFilterChange(value, filter as keyof ActiveFilter)}
                        value={activeFilters[filter as keyof ActiveFilter] || "all"}
                    >
                        <Select.Option value="all">All</Select.Option>
                        {(voiceLabels as any)[filter].map((label : string) => (
                            <Select.Option key={label} value={label}>
                                {formatLabel(label)}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            ))}
        </div>
    );
};

export default VoiceFilters;
