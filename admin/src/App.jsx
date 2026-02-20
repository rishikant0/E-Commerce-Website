import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./components/Login.jsx";

import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || ""
  );

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex flex-col h-screen">

          {/* TOP NAVBAR */}
          <Navbar setToken={setToken} />

          {/* MAIN AREA */}
          <div className="flex flex-1 overflow-hidden">

            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENT */}
            <main className="flex-1 p-8 overflow-y-auto text-gray-700">
              <Routes>

                <Route path="/" element={<Navigate to="/add" />} />

                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />

                <Route path="*" element={<Navigate to="/add" />} />

              </Routes>
            </main>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
