export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}

export interface GenerateSpeechResponse {
    audioUrl: string;
}

export interface VoiceContextType {
    voices: any[];
    selectedVoice: any | null;
    setSelectedVoice: (voice: any) => void;
    text: string;
    setText: (text: string) => void;
    activeFilters: ActiveFilter;
    setActiveFilters: (filters: ActiveFilter) => void;
}

export interface SpeechResponse {
    audio_data: ArrayBuffer;
}

export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}

export const voiceLabels = {
    'category': ["premade"],
    'gender': ["male", "female"],
    'accent': ["american", "british", "australian", "Transatlantic"],
    'age': ["young", "middle-aged", "old"],
    'use_case': ["conversational", "characters", "narration", "social media", "news"],
};

export interface ActiveFilter {
    'category': string | null;
    'gender': string | null;
    'accent': string | null;
    'age': string | null;
    'use_case': string | null;
}