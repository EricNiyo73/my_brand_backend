import Article from "../db_models/Article_model";
import cloudinary from "../helper/cloudinary";


  export const createblog=async(req, res)=> {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      //   const article = await Article.create(req.body);

      const article = new Article({
        image: result.secure_url,
        content: req.body.content,
        title: req.body.title,
      });
      await article.save();
      // set valid json fro fetch api
      res.setHeader("Content-Type", "application/json");

      //  fetch api
      // res.setHeaders("Content-Type", "application/json");

      res.status(200).json({ status: "success", article: article });
      console.log("article now is created");
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
      console.log("can not create article");
    }
  }

  export const getAll=async(req, res) =>{
    try {
      const article = await Article.find();
      res.status(200).json({ status: "success", article: article });
    } catch (error) {
      res.status(400).json({ status: "error", error: error.message });
      console.log("can not create article");
    }
  }

  export const getOne=async(req, res) =>{
    try {
      const id = req.params.id;
      const article = await Article.findById({ _id: id });
      res.status(200).json({ status: "success", article: article });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log("can not create article");
    }
  }

  export const updateblog=async(req, res)=> {
    try {
      const id = req.params.id;
      const findblog = await Article.findOne({ _id: id });
      // console.log(findblog);
      await cloudinary.uploader.destroy(findblog.image);
      const result = await cloudinary.uploader.upload(req.file.path);
      // console.log(result);
      // const updatedData = req.body;
      // console.log(
      //   "update blog hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ",
      //   result.secure_url,
      //   req.body
      // );
      const options = { new: true };
      const updateblog = await Article.findByIdAndUpdate(
        id,
        {
          $set: {
            image: result.secure_url,
            content: req.body.content,
            title: req.body.title,
          },
        },
        options
      );

      // res.send(result);
      // await result.save();
      res.status(200).json({ status: "success", data: updateblog });
    } catch (error) {
      res.status(400).json({ status: "fail", message: error.message });
    }

    // try {
    //   //Upload image to Cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

    //   //Find the article by its id
    //   const id = req.params.id;
    //   const article = await Article.findById(id);

    //   //Update the article with the new data
    //   article.image = result.secure_url;
    //   article.content = req.body.content;
    //   article.title = req.body.title;

    //   //Save the updated article to the database
    //   await article.save();

    //   res.json({ status: "success", data: article });
    // } catch (error) {
    //   res.status(400).json({ message: error.message });
    // }
  }

  export const deleteblog =async(req, res) =>{
    try {
      const id = req.params.id;

      const result = await Article.deleteOne({ _id: id });

      res
        .status(204)

        .json({ status: "success", deletedCount: result.deletedCount });
      console.log(result.deletedCount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
