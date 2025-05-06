import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { fetchDraftedArticles } from "../Services/api.js";

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDrafts = async () => {
      try {
        const data = await fetchDraftedArticles();
        setDrafts(data);
      } catch (error) {
        setError("Failed to fetch drafts. Please try again later.");
      }
    };
    loadDrafts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Drafted Articles</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : drafts.length ? (
        drafts.map((draft) => <ArticleCard key={draft._id} article={draft} />)
      ) : (
        <p>No drafts available.</p>
      )}
    </div>
  );
};

export default DraftsPage;