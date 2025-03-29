import React from "react";

const AlertModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay nền mờ */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Nội dung modal */}
      <div className="bg-white rounded shadow-lg p-6 z-10 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Lỗi khi gọi OpenAI</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
