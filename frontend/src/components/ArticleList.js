import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.js";
import { fetchArticles } from "../Services/api.js";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
        console.log("Fetched articles:", data);
      } catch (error) {
        setError("Failed to fetch articles. Please try again later.");
      }
    };
    loadArticles();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {error ? ( <p className="text-red-500">{error}</p>)
       : 
       articles.length ? ( articles.map((article) => <ArticleCard key={article._id} article={article} />)) : ( <p>Loading articles...</p>
      )}
    </div>
  );
};


export default ArticleList;







