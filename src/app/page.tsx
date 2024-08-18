"use client"

import { VoiceProvider } from "@/components/hooks/useVoiceContext";
import { VoiceGeneration } from "@/components/VoiceGeneration";
import { Card } from "antd";


const Page = () => {

  return (
    <div className="main">
      <Card>
        <h1>Text to Speech Converter</h1>
        <VoiceProvider>
          <VoiceGeneration />
        </VoiceProvider>
      </Card>
    </div>
  );
};

export default Page;
