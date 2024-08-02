
export interface Voice {
    voice_id: string;
    name: string;
    description: string;
}

export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}

export interface GenerateSpeechResponse {
    audioUrl: string;
}

export interface VoiceContextType {
    voices: Voice[];
    selectedVoice: Voice | null;
    setSelectedVoice: (voice: Voice) => void;
}

export interface SpeechResponse {
    audio_data: ArrayBuffer;
}

export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}
