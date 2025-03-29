import React, { useState } from "react";
import AlertModal from "./components/AlertModal";
import FileUpload from "./components/FileUpload";
import ResultDisplay from "./components/ResultDisplay";
import SQLQuery from "./components/SQLQuery";
import TokenInput from "./components/TokenInput";

function App() {
  const [openAIResult, setOpenAIResult] = useState(null);
  // State để hiển thị thông báo lỗi
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        DB Dump Parser & OpenAI SQL Generator
      </h1>

      <FileUpload />
      <TokenInput />

      <SQLQuery
        onResult={(result) => setOpenAIResult(result)}
        onError={(msg) => setAlertMessage(msg)}
      />

      {openAIResult && <ResultDisplay result={openAIResult} />}

      <AlertModal
        show={!!alertMessage}
        message={alertMessage}
        onClose={() => setAlertMessage("")}
      />
    </div>
  );
}

export default App;
