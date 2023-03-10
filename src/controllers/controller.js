import Model from "../db_models/contact_message";
import User from "../db_models/contact_message";


  export const getAllUsers=async(req, res)=> {
    try {
      const Users = await User.find();
      res.status(200).json(Users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  export const createUser=async(req, res)=> {
    try {
      const data = new Model({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      await data.save();
      res.status(201).json(data);
      console.log("msg sent sussfuly");
    } catch (error) {
      res.status(401).json({ message: error.message });
      console.log("it can not create user");
    }
  }

