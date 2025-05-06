import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${BASE_URL}/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          console.log("Fetched article:", data);
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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!article) {
    return <p>Loading article details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-2">Category: {article.category}</p>
      <p className="text-gray-500 mb-4">Author: {article.author.name}</p>
      <div
        className="text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>
    </div>
  );
};

export default ArticleDetail;