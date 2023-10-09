import { useState } from "react";
import "./App.css";
import ConeForm from "./components/ConeForm";
import ConeViewer from "./components/ConeViewer";
import { sendConeData } from "./services/api";

function App() {
  const [triangulation, setTriangulation] = useState(null);

  const handleTriangulation = async (data: any) => {
    try {
      const result = await sendConeData(data);
      setTriangulation(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Cone Viewer</h1>
      <div className="container">
        <ConeForm onSubmit={handleTriangulation} />
        <ConeViewer key={Date.now()} triangulation={triangulation} />
      </div>
    </div>
  );
}

export default App;
