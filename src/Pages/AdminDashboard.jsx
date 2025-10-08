// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://aestheticartclub-portfolio.onrender.com";  // Adjust if URL changes in Render
const token = localStorage.getItem("adminToken"); // For future authentication (optional enhancement)

const AdminDashboard = () => {
  const [artList, setArtList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BACKEND_URL}/images`);
      setArtList(res.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (public_id) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete`, {
        data: { public_id },
        headers: { Authorization: `Bearer ${token}` } // If you add auth to your backend
      });
      setArtList(artList.filter((item) => item.public_id !== public_id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        {artList.map((item) => (
          <div key={item.public_id} className="border p-2 rounded relative">
            <img src={item.url} alt={item.title || item.public_id} className="w-full h-48 object-cover rounded" />
            <button
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
