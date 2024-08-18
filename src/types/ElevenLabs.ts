export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}

export interface GenerateSpeechResponse {
    audioUrl: string;
}

export interface VoiceContextType {
    voices: Voice[];
    setVoices: (voices: Voice[]) => void
    selectedVoice: Voice;
    setSelectedVoice: (voice: Voice) => void;
    text: string;
    setText: (text: string) => void;
    activeFilters: Record<string, string>;
    setActiveFilters: (filters: Record<string, string>) => void;
    voiceLabels: Record<string, string[]>;
    setVoiceLabels: (labels: Record<string, string[]>) => void;
}

export interface Voice {
    voice_id: string;
    name: string;
    preview_url: string;
    labels: {
        'category': string;
        'gender': string;
        'accent': string;
        'age': string;
        'use_case': string;
    };
}

export interface SpeechResponse {
    audio_data: ArrayBuffer;
}

export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}

export interface ActiveFilter {
    'category': string | null;
    'gender': string | null;
    'accent': string | null;
    'age': string | null;
    'use_case': string | null;
}