# DB Dump Parser & OpenAI SQL Generator

A Vite ReactJS project that reads DB dump files from various databases (MySQL, PostgreSQL, OracleDB, SQL Server, etc.), extracts table information, and uses the OpenAI API to generate SQL statements for pre-populating data. This ensures that when a user's SQL query runs, the necessary data is already present.

---

## Overview

This project provides a seamless workflow:

- Upload a DB Dump:
  Users can upload a dump file (in SQL or text format). The application parses the file, extracts information of all the tables, and saves the details in a Redux slice (also persisted in LocalStorage).

- SQL Query Input:
  An input area allows users to enter their SQL query. The app automatically identifies which tables are referenced in the query.

- OpenAI Data Generation:
  The identified table information along with the user’s SQL query is sent to the OpenAI API. OpenAI then returns SQL statements to generate the necessary data for these tables.

- Result Display:
  The returned SQL statements from OpenAI are displayed in a dedicated results section for further review and execution.

- Token Management:
  Users can input and toggle the visibility of their OpenAI API token (hidden like a password). Additionally, any errors during the API call will trigger an alert modal for immediate feedback.

## Features

- File Upload & Parsing:
  Upload a file dump and parse table creation statements using regex.
- Redux Integration:
  Store and manage table data and OpenAI token using Redux Toolkit.
- SQL Query Analysis:
  Automatically extract table names from SQL queries using regex.
- OpenAI API Integration:
  Send parsed table information alongside the SQL query to the OpenAI API for generating data creation queries.
- Responsive UI:
  Styled with Tailwind CSS v3 for a clean and modern interface.
- Error Handling:
  Alert modal component to display error messages (e.g., when the OpenAI API call fails).
- Token Visibility Toggle:
  Secure and convenient token input field that can be switched between password and text modes.

## Technologies Used

- Vite & ReactJS: Modern and fast development environment.
- Redux Toolkit: Efficient state management.
- Tailwind CSS v3: Utility-first CSS framework for rapid UI development.
- Axios: For API calls.
- LocalStorage: Persisting table information across sessions.

## Project Structure

```
SUPPORT_SQL_WITH_AI/
├── node_modules/ # Project dependencies
├── public/ # Static assets and index.html
├── src/
│ ├── components/ # React components for the UI
│ │ ├── AlertModal.jsx # Modal component for error alerts
│ │ ├── FileUpload.jsx # Component to upload the DB dump file
│ │ ├── SQLQuery.jsx # Component for SQL input and OpenAI API call
│ │ ├── ResultDisplay.jsx # Component to display the OpenAI results
│ │ └── TokenInput.jsx # Component for inputting OpenAI API token (with show/hide toggle)
│ ├── redux/ # Redux state management
│ │ ├── dbSlice.js # Redux slice for storing table info & token
│ │ └── store.js # Redux store configuration
│ ├── App.jsx # Main application component that integrates all the components
│ ├── index.css # Global styles including Tailwind CSS imports
│ └── main.jsx # Entry point of the React application
├── package.json # Project configuration and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

## Getting Started

- Prerequisites
  Node.js (v14+ recommended)
  npm or yarn

- Installation
  - Clone the repository:
    ```bash
        git clone https://github.com/your-username/db-dump-parser-openai-sql-generator.git
        cd db-dump-parser-openai-sql-generator
    ```
  - Install dependencies:
    ```bash
        npm install
        # or
        yarn install
    ```
- Install Tailwind CSS (if not already installed):
  Tailwind is pre-configured. Check the tailwind.config.js and src/index.css for proper setup.

## Running the Project

- Start the development server:
  ```bash
      npm run dev
      # or
      yarn dev
  ```
  Open your browser and navigate to the provided local URL (typically http://localhost:3000).

## Usage

- Upload DB Dump File:
  Click the Upload button to select your SQL or text dump file. The app will parse and store table information.

- Input OpenAI Token:
  Enter your OpenAI token in the Token Input component. You can toggle visibility (show/hide) as needed.

- Enter SQL Query:
  Type or paste your SQL query in the provided text area. When you submit, the app extracts the table names used in the query.

- Call OpenAI API:
  The app sends the table data along with your SQL query to the OpenAI API.
  If an error occurs during the API call, an alert modal will display the error message.

- View Generated SQL:
  The OpenAI response containing the generated SQL to create data is then displayed for review.

## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch: git checkout -b feature/YourFeatureName
- Commit your changes: git commit -m "Add some feature"
- Push to the branch: git push origin feature/YourFeatureName
- Open a pull request.

Happy Coding!
