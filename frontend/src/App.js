import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import ArticleEditor from "./components/ArticleEditor.js";
import Register from "./Pages/Auth/register.jsx";
import Login from "./Pages/Auth/login.jsx";
import PrivateRoute from "./privateRoute.js";
import DraftsPage from "./Pages/DraftsPage.jsx";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl font-bold">Medium-Style Blog</h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/new">New Article</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={
          <PrivateRoute >
            <ArticleEditor />
          </PrivateRoute>
          } />
        <Route path="/edit/:id" element={<ArticleEditor />} />
        <Route path="/drafts" element={
          <PrivateRoute >
            <DraftsPage />
          </PrivateRoute>
        } />
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

