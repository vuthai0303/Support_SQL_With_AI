import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAIToken } from "../redux/dbSlice";

const TokenInput = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.db.openAIToken);
  // State để theo dõi việc hiển thị token hay không (true: hiển thị, false: ẩn)
  const [showToken, setShowToken] = useState(false);

  const handleChange = (e) => {
    dispatch(setOpenAIToken(e.target.value));
  };

  return (
    <div className="my-4">
      <label htmlFor="openai-token" className="block text-lg font-medium mb-2">
        Nhập OpenAI Token:
      </label>
      <div className="relative">
        <input
          id="openai-token"
          type={showToken ? "text" : "password"}
          value={token}
          onChange={handleChange}
          className="border p-2 rounded w-full pr-10"
          placeholder="OpenAI Token của bạn"
        />
        <button
          type="button"
          onClick={() => setShowToken((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-blue-600"
        >
          {showToken ? "Hidden" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default TokenInput;
