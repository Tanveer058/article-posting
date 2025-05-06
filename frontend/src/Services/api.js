import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchPublishedArticles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-published-articles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching published articles:", error);
    throw error;
  }
};

export const fetchDraftedArticles = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. User is not authenticated.");
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/get-drafted-articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching drafted articles:", error);
    throw error;
  }
};
export const deleteArticle = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User is not authenticated.");
      toast.error("User is not authorized to delete others posts.");
      return;
    }
    await fetch(`${BASE_URL}/delete-article/${id}`, {
       method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
       });
    console.log("Article deleted:", id);
    toast.success("Article deleted successfully!");
  };

  export const updateArticle = async (id, data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User is not authenticated.");
      toast.error("User is not authorized to edit others posts.");
  
      return;
    }
  
    const response = await fetch(`${BASE_URL}/update-article/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
  
    return await response.json();
  };






  ///////  user authentication ///////
  export const registerUser = async (data) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  export const loginUser = async (data) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  