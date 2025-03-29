import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div className="my-4 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">Kết quả trả về từ OpenAI:</h3>
      {result?.map((item, index) => (
        <pre key={index} className="whitespace-pre-wrap">
          {item}
        </pre>
      ))}
    </div>
  );
};

export default ResultDisplay;
