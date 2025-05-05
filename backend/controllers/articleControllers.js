import Article from '../models/articleModel.js';

export const createArticle = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const article = await Article.create({ ...req.body, author: req.userId });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: "Error creating article" });
  }
};

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching articles" });
  }
};

// Update an article
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Error updating article" });
  }
};

// Delete an article
export const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting article" });
  }
};


// drafts controllers
export const saveDraft = async (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !category || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const draft = await Article.create({
      title,
      category,
      content,
      author: req.userId, // Assuming you have user authentication
      status: "draft", // Mark the article as a draft
    });

    res.status(201).json(draft);
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ error: "Failed to save draft" });
  }
};

export const getDrafts = async (req, res) => {
  try {
    const drafts = await Article.find({ author: req.userId, status: "draft" });
    res.json(drafts);
  } catch (error) {
    console.error("Error fetching drafts:", error);
    res.status(500).json({ error: "Failed to fetch drafts" });
  }
}

export const updateDraft = async (req, res) => {
  try {
    const draft = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(draft);
  }
  catch (error) {
    res.status(500).json({ error: "Error updating draft" });
  }
}
export const deleteDraft = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Draft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting draft" });
  }
};