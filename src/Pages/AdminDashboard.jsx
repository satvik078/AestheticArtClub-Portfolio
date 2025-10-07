// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [artList, setArtList] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://aestheticartclub-portfolio.onrender.com/gallery");
      setArtList(res.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://aestheticartclub-portfolio.onrender.com/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtList(artList.filter((item) => item._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        {artList.map((item) => (
          <div key={item._id} className="border p-2 rounded">
            <img src={item.url} alt={item.title} className="w-full h-48 object-cover rounded" />
            <p className="mt-2 text-lg">{item.title}</p>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
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
