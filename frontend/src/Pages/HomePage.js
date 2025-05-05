import React from "react";
import ArticleList from "../components/ArticleList.js";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center p-6">Articles</h1>
      <ArticleList />
    </div>
  );
};

export default HomePage;
