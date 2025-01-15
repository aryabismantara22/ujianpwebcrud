import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
const navigate = useNavigate();
const { id } = useParams();
const [inputs, setInputs] = useState({});
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

useEffect(() => {
getUser();
}, []);

const getUser = () => {
axios
    .get(`http://localhost/react/api/${id}`)
    .then((response) => {
    console.log(response.data);
    setInputs(response.data);
    })
    .catch((error) => {
    console.error("Error fetching user data:", error);
    });
};

const handleChange = (event) => {
const { name, value } = event.target;
setInputs((values) => ({ ...values, [name]: value }));
};

const handleSubmit = (event) => {
event.preventDefault();
setLoading(true);

axios
    .put(`http://localhost/react/api/${id}/edit`, inputs)
    .then((response) => {
    console.log(response.data);
    setLoading(false);
    setSuccess(true);
    navigate("/");
    })
    .catch((error) => {
    setLoading(false);
    console.error("Error updating user:", error);
    });
};

return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg">
    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit User</h1>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama
        </label>
        <input
            type="text"
            id="name"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        />
        </div>
        <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
            type="email"
            id="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        />
        </div>
        <div className="mb-4">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Nomor HP
        </label>
        <input
            type="text"
            id="mobile"
            name="mobile"
            value={inputs.mobile || ""}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        />
        </div>
        <button
        type="submit"
        className={`w-full py-3 mt-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"} text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out`}
        disabled={loading}
        >
        {loading ? (
            <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
            </div>
        ) : (
            "Simpan"
        )}
        </button>
    </form>

    {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
        Data berhasil diperbarui!
        </div>
    )}
    </div>
</div>
);
}
