import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold">Aesthetic Art Club</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/admin">Admin Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
