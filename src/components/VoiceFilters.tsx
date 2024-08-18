import { ActiveFilter } from '@/types/ElevenLabs';
import { formatLabel } from '@/utils/labelUtils';
import { Select } from 'antd';
import React from 'react';
import { useVoiceContext } from './hooks/useVoiceContext';
import useVoiceFilters from './hooks/useVoiceFilters';

const VoiceFilters: React.FC = () => {
    const { activeFilters } = useVoiceContext();
    const { handleFilterChange } = useVoiceFilters();
    const { voiceLabels } = useVoiceContext();

    return (
        <div className='filters'>
            {Object.keys(voiceLabels).map((filter) => (
                <div key={filter} className="filter-select">
                    <h3>{formatLabel(filter, '_').toUpperCase()}</h3>
                    <Select
                        placeholder={`Select a ${filter}`}
                        style={{ width: 200 }}
                        onChange={(value) => handleFilterChange(value, filter as keyof ActiveFilter)}
                        value={activeFilters[filter as keyof ActiveFilter] || "all"}
                    >
                        <Select.Option value="all">all</Select.Option>
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
