import { generateSpeech } from '@/lib/elevenLabsService';
import { Button, message, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';

interface Voice {
  voice_id: string;
  name: string;
  description: string;
}

const VoiceSelector = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [text, setText] = useState<string>('Mensagem de teste');

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('/src/lib/voices');
        if (!response.ok) {
          throw new Error('Erro ao buscar vozes');
        }
        const data = await response.json();
        setVoices(data.voices);
      } catch (error) {
        console.error('Erro buscando vozes: ', error);
        message.error('Erro ao buscar vozes');
      } finally {
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const handleGenerateSpeech = async () => {
    if (!selectedVoice) {
      message.error('Selecione uma voz');
      return;
    }

    try {
      const audioData = await generateSpeech(text, selectedVoice);
      const audioBlob = new Blob([(audioData as unknown) as BlobPart], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      message.success('Áudio gerado com sucesso');
    } catch (error) {
      console.error('Erro gerando áudio: ', error);
      message.error('Erro ao gerar áudio');
    }
  };

  return (
    <div>
      <h2>Selecione uma Voz</h2>
      {loading ? (
        <Spin tip="Carregando vozes..." />
      ) : (
        <Select
          style={{ width: '100%' }}
          placeholder="Escolha uma voz"
          optionFilterProp="children"
          onChange={(value) => setSelectedVoice(value)}
          options={voices.map((voice) => ({
            value: voice.voice_id,
            label: voice.name,
          }))}
        />
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <Button type="primary" onClick={handleGenerateSpeech} style={{ marginTop: '1rem' }}>
        Gerar Áudio
      </Button>
    </div>
  );
};

export default VoiceSelector;
