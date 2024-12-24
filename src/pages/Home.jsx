import React, { useState, useEffect } from "react";
import CodeInput from "../components/Console/CodeInput";
import OutputConsole from "../components/Console/OutputConsole";
import SampleList from "../components/SampleList";
import axios from "axios";

const Home = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [samples, setSamples] = useState([]);
  const [returnType, setReturnType] = useState("string");

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await axios.get("http://localhost:5000/samples");
        setSamples(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSamples();
  }, []);

  const handleExecute = async () => {
    try {
      const response = await axios.post("http://localhost:8000/post_code", {
        code,
        return_type: returnType,
      });
      setOutput(response.data.received_json.result);
    } catch (error) {
      setOutput(error.response.data.detail);
    }
  };

  return (
    <div className="home-container">
      <SampleList samples={samples} setCode={setCode} />
      <div className="right-pane">
        <CodeInput
          code={code}
          setCode={setCode}
          handleExecute={handleExecute}
        />
        <div className="return-type-selector">
          <label htmlFor="returnType">Return Type:</label>
          <select
            id="returnType"
            value={returnType}
            onChange={(e) => setReturnType(e.target.value)}
          >
            <option value="string">String</option>
            <option value="int">Int</option>
            <option value="double">Double</option>
            <option value="bool">Bool</option>
          </select>
        </div>
        <OutputConsole output={output} />
      </div>
    </div>
  );
};

export default Home;
