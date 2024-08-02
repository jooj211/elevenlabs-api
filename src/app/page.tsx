"use client"

import { VoiceProvider } from "@/components/VoiceContext";
import { Card } from "antd";


const Page = () => {

  return (
    <div className="main">
      <Card>
        <h1>Text to Speech Converter</h1>
        <VoiceProvider />

      </Card>
    </div>
  );
};

export default Page;
