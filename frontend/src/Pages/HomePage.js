import React from "react";
import ArticleList from "../components/ArticleList.js";
import heroBGVd from "../assets/HeroBGvideo.mp4";

const HomePage = () => {
  return (
    <div>
        <div className="relative h-[500px] w-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={heroBGVd}
          autoPlay
          loop
          muted
        >
        </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Medium-Style Blog</h1>
          <p className="text-lg mb-6">
            Discover amazing articles, share your thoughts, and explore new ideas.
          </p>
          <a
            href="/new"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create New Article
          </a>
        </div>
        </div>

      <h1 className="text-2xl font-bold text-center p-6">All Articles</h1>
      <ArticleList />
    </div>
  );
};

export default HomePage;
