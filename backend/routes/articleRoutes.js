import express from "express";
import { createArticle, updateArticle, deleteArticle, saveDraft, updateDraft, deleteDraft, getArticleById, getPublishedArticles, getDraftedArticles } from '../controllers/articleControllers.js';
import { protectRoute } from "../middleware/authMiddleware.js"; 

const articleRouter = express.Router();

articleRouter.post("/create-article", protectRoute, createArticle);
articleRouter.get("/get-published-articles", getPublishedArticles);
articleRouter.get("/articles/:id", getArticleById);
articleRouter.put("/update-article/:id", protectRoute, updateArticle);
articleRouter.delete("/delete-article/:id", protectRoute, deleteArticle);

// drafts
articleRouter.post("/save-draft", protectRoute, saveDraft);
articleRouter.get("/get-drafted-articles", protectRoute, getDraftedArticles);
articleRouter.put("/update-draft/:id", protectRoute, updateDraft); 
articleRouter.delete("/delete-draft/:id", protectRoute, deleteDraft);

export default articleRouter;
