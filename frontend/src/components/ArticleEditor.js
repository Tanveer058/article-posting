import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
// console.log("BASE_URL:", BASE_URL);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!quillInstance.current) {
      // Initialize Quill only if it hasn't been initialized
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "link"],
            ],
            handlers: {
              image: function () {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  const formData = new FormData();
                  formData.append("image", file);

                  const response = await fetch(`${BASE_URL}/upload-image`, {
                    method: "POST",
                    body: formData,
                  });

                  const data = await response.json();
                  const url = data.imageUrl;

                  const range = quillInstance.current.getSelection();
                  quillInstance.current.insertEmbed(range.index, "image", url);
                };
              },
            },
          },
        },
      });
    }
  }, [BASE_URL]);

  const publishArticle = async () => {
    const content = quillInstance.current.getText();
    if (!title || !category || !content) {
      alert("Please fill in all fields before publishing.");
      return;
    }
    const articleData = {
      title,
      category,
      content,
    };

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await fetch(`${BASE_URL}/create-article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        alert("Article published successfully!");
        navigate("/");
      } else {
        alert("Failed to publish article. Please try again.");
      }
    } catch (error) {
      console.error("Error publishing article:", error);
      alert("An error occurred while publishing the article.");
    }

  };

  const draftArticle = async () => {
    const content = quillInstance.current.getText();
    if (!title || !category || !content) {
      alert("Please fill in all fields before saving as draft.");
      return;
    }
  
    const articleData = {
      title,
      category,
      content,
    };
  
    const token = localStorage.getItem("token");

  
    try {
      const response = await fetch(`${BASE_URL}/save-draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });
  
      if (response.ok) {
        alert("Article saved as draft successfully!");
        navigate("/drafts"); // Redirect to the drafts page
      } else {
        alert("Failed to save article as draft. Please try again.");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("An error occurred while saving the draft.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg">
      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-3 p-2 w-full border border-gray-300 rounded-md"
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <div ref={editorRef} className="h-80 mt-3 border border-gray-300 rounded-md shadow-sm" />

      <div className="mt-4 flex justify-end">
        <button className="mr-4 px-5 py-2 bg-gray-300 rounded-md" onClick={draftArticle}>
          Save as Draft
        </button>
        <button className="px-5 py-2 bg-green-500 text-white rounded-md" onClick={publishArticle}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
