import React, { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import { Trash } from 'react-feather';
import Loader from '../component/loader';
import {Users}from 'lucide-react';


const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch(`${baseUrl}/users/getallusers`);
      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to fetch users:', data);
        return;
      }
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);


  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;    
    try {
      const response = await fetch(`${baseUrl}/users/deleteuser/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ); 
  
  return (
    <>
      <Loader loading={loading} />
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <h1 className="text-3xl font-semibold mb-6 flex  items-center gap-4"><Users  /> Manage Users</h1>

          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* User List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <div
                key={index}
                className="bg-white relative p-5 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
              >
            
                <button
                
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => {
                  handleDeleteUser(user._id);
                  }}
                >
                  <Trash size={18} />
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <p className="text-gray-600">Email: <span className="font-medium">{user.email}</span></p>
                <p className="text-gray-600">Aura: <span className="font-medium">{user.aura}</span></p>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredUsers.length === 0 && (
            <p className="text-red-600 text-center mt-6 text-lg font-semibold">No users found.</p>
          )}
        </main>
      </div>
    </div>
    </>
  );
};

export default ManageUsers;
