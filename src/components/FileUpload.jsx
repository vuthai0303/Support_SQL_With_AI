import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTables } from "../redux/dbSlice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const tableslice = useSelector((state) => state.db.tables);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name); // Set the name of the uploaded file

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      // Phân tích nội dung để tìm các bảng
      const tableInfo = {};
      const regex = /CREATE TABLE (\w+).*?;/gis; // Capture table name

      let match;
      while ((match = regex.exec(content)) !== null) {
        tableInfo[match[1]] = match[0]; // Lưu cả câu lệnh tạo table từ CREATE TABLE đến ENGINE
      }
      dispatch(setTables(tableInfo));
      alert(
        `Đã lưu ${
          Object.keys(tableInfo).length
        } table vào store và localStorage.`
      );
    };
    reader.readAsText(file);
  };

  const handleFileRemove = () => {
    setUploadedFileName(""); // Clear the uploaded file name
    document.querySelector('input[type="file"]').value = null; // Reset the file input
  };

  return (
    <div className="my-4">
      <label className="block text-lg font-medium mb-2">
        Upload file dump của DB:
      </label>
      <input
        type="file"
        accept=".sql,.txt"
        onChange={handleFileUpload}
        className="border p-2 rounded"
      />
      {uploadedFileName && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-red-500 font-bold">{uploadedFileName}</p>
          <button
            onClick={handleFileRemove}
            className="text-red-500 hover:text-red-700"
            title="Remove file"
          >
            x
          </button>
        </div>
      )}
      <hr />
      <p className="text-sm text-gray-500 mt-[10px]">
        <span className="text-sm font-bold">Các bảng trong DB:</span>
        <br />
        {Object.keys(tableslice).join(", ")}
      </p>
    </div>
  );
};

export default FileUpload;
