import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Data Mahasiswa
        </h1>

        <BrowserRouter>
          <div className="flex justify-between items-center mb-6">
            <Link
              to="user/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Tambahkan Data
            </Link>
          </div>

          <Routes>
            <Route index element={<ListUser />} />
            <Route path="user/create" element={<CreateUser />} />
            <Route path="user/:id/edit" element={<EditUser />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
