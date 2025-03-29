import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const SQLQuery = ({ onResult, onError }) => {
  const [sql, setSql] = useState("");
  const [loading, setLoading] = useState(false);
  // Lấy danh sách tables từ redux
  const tables = useSelector((state) => state.db.tables);
  // Lấy OpenAI token từ redux
  const token = useSelector((state) => state.db.openAIToken);

  const extractTableNames = (query) => {
    const tableNames = [];
    const regex = /(?:FROM|JOIN)\s+([`"]?(\w+)[`"]?)/gi;
    let match;
    while ((match = regex.exec(query)) !== null) {
      tableNames.push(match[2]); // Capture the table name without backticks or quotes
    }
    return [...new Set(tableNames)]; // Remove duplicates
  };

  const handleSubmit = async () => {
    if (!sql.trim()) return;
    setLoading(true);

    const usedTables = extractTableNames(sql);

    // Lọc thông tin table từ store theo danh sách tên trích xuất
    const tablesInfo = Object.keys(tables)
      .filter((table) => usedTables.includes(table))
      .map((table) => tables[table]);

    if (usedTables.length != tablesInfo.length) {
      onError(
        "Câu SQL không sử dụng đúng các table có trong DB. Vui lòng sửa lại câu SQL!"
      );
      setLoading(false);
      return;
    }

    // Tạo payload cho OpenAI: gửi thông tin và câu SQL của người dùng
    const payload = {
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là 1 chuyên gia database, giúp tạo các câu SQL để tạo data cho các table
                    Thông tin bảng: ${JSON.stringify(tablesInfo)}`,
        },
        {
          role: "user",
          content: `Hãy tạo các câu SQL để tạo data cho các table để câu SQL sau có data (Lưu ý kết quả trả về chỉ gồm các câu SQL dưới dạng  ["SQL1", "SQL2", "SQL3", ...], không cần trả lời gì thêm): ${sql}`,
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Giả sử response.data chứa kết quả
      onResult(JSON.parse(response?.data?.choices[0]?.message?.content));
    } catch (error) {
      console.error("Lỗi khi gọi API OpenAI:", error);
      // Gọi callback onError để thông báo lỗi
      onError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="my-4">
      <label className="block text-lg font-medium mb-2">Nhập câu SQL:</label>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        className="w-full border p-2 rounded h-32 min-h-[100px]"
        placeholder="Nhập câu SQL của bạn..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Gửi SQL"}
      </button>
    </div>
  );
};

export default SQLQuery;
