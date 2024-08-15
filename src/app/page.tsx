"use client"

import { VoiceProvider } from "@/components/hooks/useVoiceContext";
import { VoiceSelection } from "@/components/VoiceSelection";
import { Card } from "antd";


const Page = () => {

  return (
    <div className="main">
      <Card>
        <h1>Text to Speech Converter</h1>
        <VoiceProvider>
          <VoiceSelection />
        </VoiceProvider>
      </Card>
    </div>
  );
};

export default Page;
