import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateArticle } from "../Services/api";
import { toast } from "react-toastify";

const EditArticle = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${BASE_URL}/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setCategory(data.category);
          setContent(data.content);
        } else {
          setError("Failed to fetch article details.");
        }
      } catch (error) {
        console.error("Error fetching article details:", error);
        setError("An error occurred while fetching the article.");
      }
    };

    fetchArticle();
  }, [id, BASE_URL]);

  const handleUpdate = async (status = null) => {
    try {
      const updatedArticle = await updateArticle(id, { title, category, content, status });

      if (status === "published") {
        toast.success("Article published successfully!");
        navigate(`/article/${updatedArticle._id}`);
      } else {
        toast.success("Article updated successfully!");
        navigate("/drafts");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Failed to update the article. Please try again.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(); 
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => handleUpdate("published")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => handleUpdate("published")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update & Publish
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;