import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListUser() {
const [users, setUsers] = useState([]);

useEffect(() => {
getUsers();
}, []);

const getUsers = () => {
axios
    .get("http://localhost/react/api/")
    .then((response) => {
    console.log(response.data);
    const sortedUsers = response.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    setUsers(sortedUsers);
    })
    .catch((error) => {
    console.error("Error fetching users:", error);
    });
};

const deleteUser = (id) => {
axios
    .delete(`http://localhost/react/api/${id}/delete`)
    .then((response) => {
    console.log(response.data);
    getUsers();
    })
    .catch((error) => {
    console.error("Error deleting user:", error);
    });
};

return (
<div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-4">Daftar Data Mahasiswa</h1>
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
    <thead className="bg-gray-100">
        <tr>
        <th className="px-4 py-2 text-left">No</th>
        <th className="px-4 py-2 text-left">Nama</th>
        <th className="px-4 py-2 text-left">Email</th>
        <th className="px-4 py-2 text-left">Nomor HP</th>
        <th className="px-4 py-2 text-left">Tindakan</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user, index) => (
        <tr key={user.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.mobile}</td>
            <td className="px-4 py-2">
            <Link
                to={`user/${user.id}/edit`}
                className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md mr-2"
            >
                Ubah
            </Link>
            <button
                onClick={() => deleteUser(user.id)}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md"
            >
                Hapus
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
}
