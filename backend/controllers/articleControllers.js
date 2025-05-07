import Article from '../models/articleModel.js';

export const createArticle = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { title, category, content, status } = req.body;

    // Explicitly set the status to "published" if provided
    const article = await Article.create({
      title,
      category,
      content,
      status: status || "draft", // Default to "draft" if no status is provided
      author: req.userId,
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Error creating article" });
  }
};


// get all published articles
export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" }).populate("author");
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error fetching published articles" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", "name email");
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

// Update an article
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Check if the logged-in user is the author of the article
    if (article.author.toString() !== req.userId) {
      return res.status(403).json({ error: "You are not authorized to edit this article" });
    }

    const { title, category, content, status } = req.body;

    article.title = title || article.title;
    article.category = category || article.category;
    article.content = content || article.content;

    // Update the status if provided
    if (status) {
      article.status = status;
    }

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Error updating article" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    if (article.author.toString() !== req.userId) {
      return res.status(403).json({ error: "You are not authorized to delete this article" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Error deleting article" });
  }
};



/////////////// drafts controllers//////////////
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
      author: req.userId,
      status: "draft",
    });

    res.status(201).json(draft);
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ error: "Failed to save draft" });
  }
};

// Get all drafted articles
export const getDraftedArticles = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const drafts = await Article.find({ status: "draft", author: req.userId }).populate("author");
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching drafted articles" });
  }
};


export const updateDraft = async (req, res) => {
  try {
    const draft = await Article.findById(req.params.id);

    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    // Check if the logged-in user is the author of the draft
    if (draft.author.toString() !== req.userId) {
      return res.status(403).json({ error: "You are not authorized to edit this draft" });
    }

    const { title, category, content, status } = req.body;

    draft.title = title || draft.title;
    draft.category = category || draft.category;
    draft.content = content || draft.content;

    // Update the status if provided
    if (status) {
      draft.status = status;
    }

    const updatedDraft = await draft.save();
    res.json(updatedDraft);
  } catch (error) {
    console.error("Error updating draft:", error);
    res.status(500).json({ error: "Error updating draft" });
  }
};

export const deleteDraft = async (req, res) => {
  try {
    const draft = await Article.findById(req.params.id);

    if (!draft) {
      return res.status(404).json({ error: "Draft not found" });
    }

    // Check if the logged-in user is the author of the draft
    if (draft.author.toString() !== req.userId) {
      return res.status(403).json({ error: "You are not authorized to delete this draft" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Draft deleted" });
  } catch (error) {
    console.error("Error deleting draft:", error);
    res.status(500).json({ error: "Error deleting draft" });
  }
};