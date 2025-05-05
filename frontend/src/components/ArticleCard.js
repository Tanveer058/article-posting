import React from "react";
import { deleteArticle } from "../Services/api.js";

const ArticleCard = ({ article }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteArticle(article._id);
      window.location.reload(); // Refresh after delete
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-lg mb-4">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-gray-600">{article.category}</p>
      <p className="mt-2">{article.content.substring(0, 100)}...</p>
      <div className="flex justify-end mt-4">
        <button className="mr-3 px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
      </div>
    </div>
  );
};

export default ArticleCard;
