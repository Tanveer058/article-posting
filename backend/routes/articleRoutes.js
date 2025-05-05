import express from "express";
import { createArticle, getArticles, updateArticle, deleteArticle, saveDraft, updateDraft, deleteDraft, getDrafts } from '../controllers/articleControllers.js';
import { protectRoute } from "../middleware/authMiddleware.js"; 

const articleRouter = express.Router();

articleRouter.post("/create-article", protectRoute, createArticle);
articleRouter.get("/get-all-articles", getArticles);
articleRouter.put("/update-article/:id", protectRoute, updateArticle);
articleRouter.delete("/delete-article/:id", protectRoute, deleteArticle);

// drafts
articleRouter.post("/save-draft", protectRoute, saveDraft); // Assuming createArticle can handle drafts
articleRouter.get("/get-drafts", protectRoute, getDrafts); // You might want to create a separate controller for drafts
articleRouter.put("/update-draft/:id", protectRoute, updateDraft); // Assuming updateArticle can handle drafts
articleRouter.delete("/delete-draft/:id", protectRoute, deleteDraft); // Assuming deleteArticle can handle drafts

export default articleRouter;
