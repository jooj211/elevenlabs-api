import { ActiveFilter } from "@/types/ElevenLabs";

export const formatLabel = (label: string, separator: string = ' ', lowercase: boolean = true) => {
  return label
    .split(separator)
    .map((word) => {
      if (lowercase) {
        return word.toLowerCase();
      }
      return word;
    })
    .join(' ');
};

export const showLabel = (voiceLabel: string, filter: string) => {
  return voiceLabel === filter ? false : true;
};
