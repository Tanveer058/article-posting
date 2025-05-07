import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {jwtDecode} from "jwt-decode"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Guest", email: "guest@gmail.com" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token: ", decodedToken);

        // Fetch user details using the user ID from the token
        fetchUserDetails(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token: ", error);
        toast.error("Invalid token. Please log in again.");
      }
    }
  }, [token]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await response.json();
      setUser({ name: userData.name, email: userData.email }); // Update user state
    } catch (error) {
      console.error("Error fetching user details: ", error);
      toast.error("Failed to fetch user details. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">
        Medium-Style Blog
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/new" className="hover:underline">
          New Article
        </Link>
        <Link to="/drafts" className="hover:underline">
          Drafted Articles
        </Link>

        {token ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              <span className="mr-2">Profile</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <div className="px-4 py-2 border-b">
                  <p className="font-bold">{user.name}</p> {/* Display user's name */}
                  <p className="text-sm text-gray-600">{user.email}</p> {/* Display user's email */}
                </div>
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
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