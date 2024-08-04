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
}

export interface SpeechResponse {
    audio_data: ArrayBuffer;
}

export interface VoiceSettings {
    stability: number;
    similarity_boost: number;
}
