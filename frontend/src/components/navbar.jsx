import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center position: sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">
        Medium-Style Blog
      </Link>
      <div>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link to="/new" className="mr-4 hover:underline">
          New Article
        </Link>
        <Link to="/drafts" className="mr-4 hover:underline">
          Drafted Articles
        </Link>
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;