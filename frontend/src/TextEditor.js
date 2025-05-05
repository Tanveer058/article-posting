import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
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

                  const response = await fetch("YOUR_BACKEND_API_URL", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await response.json();
                  const url = data.imageUrl; // URL returned from backend

                  // Insert image into Quill editor
                  const range = quillInstance.current.getSelection();
                  quillInstance.current.insertEmbed(range.index, "image", url);
                };
              },
            },
          },
        },
      });
    }
  }, []);

//   return <div ref={editorRef} style={{ height: "300px" }} />;
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
        <button className="mr-4 px-5 py-2 bg-gray-300 rounded-md">
          Save as Draft
        </button>
        <button className="px-5 py-2 bg-green-500 text-white rounded-md">
          Publish
        </button>
      </div>
    </div>
  );
  
};

export default TextEditor;
