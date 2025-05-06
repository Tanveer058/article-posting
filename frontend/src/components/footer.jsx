import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Medium-Style Blog. All rights reserved.
      </p>
      <p className="text-sm mt-2">
        Developed by <span className="font-bold">Tanveer Hussain</span>, MERN Stack Intern at 
        <span className="font-bold"> iCreativez Technologies, Nawabshah</span>.
      </p>
    </footer>
  );
};

export default Footer;