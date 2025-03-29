import { createSlice } from "@reduxjs/toolkit";

// Lấy dữ liệu từ localStorage nếu có
const persistedTables = JSON.parse(localStorage.getItem("tables") || "[]");
const persistedOpenAIToken = localStorage.getItem("openAIToken") || "";

const dbSlice = createSlice({
  name: "db",
  initialState: {
    tables: persistedTables, // danh sách các table (mỗi table có thể là object { name, ... })
    typeDB: "", // lưu type của database
    openAIToken: persistedOpenAIToken, // lưu token của OpenAI
  },
  reducers: {
    setTables: (state, action) => {
      state.tables = action.payload;
      localStorage.setItem("tables", JSON.stringify(state.tables));
    },
    addTable: (state, action) => {
      state.tables.push(action.payload);
      localStorage.setItem("tables", JSON.stringify(state.tables));
    },
    setOpenAIToken: (state, action) => {
      state.openAIToken = action.payload;
      localStorage.setItem("openAIToken", action.payload);
    },
    setTypeDB: (state, action) => {
      state.typeDB = action.payload;
    },
  },
});

export const { setTables, addTable, setOpenAIToken, setTypeDB } =
  dbSlice.actions;
export default dbSlice.reducer;
