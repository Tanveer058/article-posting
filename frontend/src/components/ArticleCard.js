import React from "react";
import { deleteArticle } from "../Services/api.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ArticleCard = ({ article }) => {
  const handleDelete = () => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to delete this article?</p>
        <div className="flex justify-end mt-2">
          <button
            onClick={async () => {
              try {
                await deleteArticle(article._id);
                toast.dismiss(toastId);
                window.location.reload();
              } catch (error) {
                toast.dismiss(toastId);
                toast.error("Failed to delete the article. Please try again.");
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
          >
              Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
        closeButton: false,
      }
    );
  };
 

  return (
    <div className="border p-4 rounded-md shadow-lg mb-4">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-gray-600">{article.category}</p>
      <p className="mt-2">{article.content.substring(0, 100)}...</p>
      <Link
          to={`/article/${article._id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Read More
        </Link>
      <div className="flex justify-end mt-4">
      
        <Link
          to={`/edit-article/${article._id}`}
          className="mr-3 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Edit
        </Link>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
       
      </div>
    </div>
  );
};

export default ArticleCard;
