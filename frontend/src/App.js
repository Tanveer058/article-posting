import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage.js";
import ArticleEditor from "./components/ArticleEditor.js";
import Register from "./Pages/Auth/register.jsx";
import Login from "./Pages/Auth/login.jsx";
import PrivateRoute from "./privateRoute.js";
import DraftsPage from "./Pages/DraftsPage.jsx";
import ArticleDetail from "./Pages/ArticleDetail.jsx";
import EditArticle from "./Pages/editArticle.jsx";
import Navbar from "./components/navbar.jsx";
import PublicRoute from "./publicRoute.js";
import Footer from "./components/footer.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={4000}/>
      <Router>
        <Navbar />
        <div className="flex-grow">
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
            <Route path="/article/:id" element={
              <PrivateRoute>
                <ArticleDetail />
              </PrivateRoute>
              } />

            <Route path="/edit-article/:id" element={
              <PrivateRoute>
                <EditArticle />
              </PrivateRoute>
            } />


            {/* Authentication routes */}
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
              } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
              } />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



