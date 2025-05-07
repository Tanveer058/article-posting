import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import dummyProfile from "../assets/dummyProfile.jpeg"; // Dummy profile picture to show if no picture exists

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ name: "Guest", email: "guest@gmail.com", picture: null });

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await response.json();
      setUser({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user.picture || dummyProfile} // Dummy picture if no picture exists
          alt="User Profile"
          className="w-32 h-32 rounded-full mb-4"
        />

        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>

        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;