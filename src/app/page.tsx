import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import DropdownButton from "../components/DropdownButton";

const Page = () => {

  return (
    <div className="main">
      <Card>
        <h1>Text to Speech Converter</h1>
        <div className="voice-container">
          <p className="voice-choice">Choose a voice</p>
          <DropdownButton />
        </div>
        <div>
          <TextArea placeholder="Enter text" rows={2} className="input-box"/>
        </div>
      </Card>
    </div>
  );
};

export default Page;
