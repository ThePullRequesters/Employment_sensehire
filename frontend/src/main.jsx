import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // optional
import EmployerLogin from "./features/f12/EmployerLogin.jsx";
import EmployerDashboard from "./features/f12/f12.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
