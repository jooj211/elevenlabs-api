import { Tag } from 'antd';
import useVoiceFilters from '../components/hooks/useVoiceFilters';

export const filters = [ 'category', 'gender', 'accent', 'age', 'use_case' ];

export const formatLabel = (label: string) => {
  const words = label.split('_');
  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word.toLowerCase();
  });
  return capitalizedWords.join(' ');
};

export const renderLabels = (labels: any) => {
  return (
    <>
      {filters.map((key) => {
        if (labels[key]) {
          return (
            <Tag
              key={key}
              className={`label ${key.toLowerCase()} `}
              data-label={formatLabel(key)}
            >
              {formatLabel(labels[key])}
            </Tag>
          );
        }
        return null;
      })}
    </>
  );
};
