import React, { useEffect, useState } from "react";

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-drafts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDrafts(data);
        } else {
          setError("Failed to fetch drafts.");
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
        setError("An error occurred while fetching drafts.");
      }
    };

    fetchDrafts();
  }, [BASE_URL, token]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Drafted Articles</h1>
      {error && <p className="text-red-500">{error}</p>}
      {drafts.length > 0 ? (
        drafts.map((draft) => (
          <div key={draft._id} className="p-4 border border-gray-300 rounded-md mb-4">
            <h2 className="text-xl font-semibold">{draft.title}</h2>
            <p className="text-gray-600">{draft.category}</p>
            <p className="mt-2">{draft.content}</p>
          </div>
        ))
      ) : (
        <p>No drafts available.</p>
      )}
    </div>
  );
};

export default DraftsPage;