const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchArticles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get-all-articles`);
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  };

export const deleteArticle = async (id) => {
    await fetch(`${BASE_URL}/delete-article/${id}`, { method: "DELETE" });
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
  