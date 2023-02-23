import Article from "../db_models/Article_model";
import Comment from "../db_models/comment_model";
// import { Model } from "mongoose";


  export const create= async(req, res)=> {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        res.json({ status: "error", message: "Article not found" });
      }

      const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        article: article._id,
      });

      // const commentSave =
      await comment.save();
      article.comments.push(comment);
      await article.save();
      // let use mongoose populate method
      const updateArticle = await Article.findById(req.params.id).populate(
        "comments"
      );
      res.status(201).json({ status: "success", comment: updateArticle });
      console.log("comment sent sussfuly");
    } catch (error) {
      res.status(401).json({ error: error.message });
      console.log("coment not sent");
    }
  }

  export const getAll=async(req, res)=> {
    try {
      const cmt = await Comment.find();
      res.status(200).json({ cmt });
    } catch {
      res.status(400).json({ error: error.message });
      console.log("can not create article");
    }
  }
  export const  deletecomment = async(req, res) =>{
    try {
      const id = req.params.id;

      const result = await Comment.deleteOne({ _id: id });

      res.status(404).json({ status: "success", deleted: result });
      console.log("deleted", result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
