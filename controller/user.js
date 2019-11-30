var bcrypt = require('bcryptjs');
const User = require("../model/sect");
const dotenv = require("dotenv").config();
const salt = 10;

const registerX = async (req, res, next) =>{
  try {
    const { name, email, password} = req.body;
    const data = await User.findOne({ email });
    if (data) {
      return res.status(400).json({
        message: "User has been registered already"
      });
    } else {
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        password: hash,
        email
      });
      await newUser.save();
      return res.redirect('/login');
    }
  } catch (err) {
    return next(err);
  }
};


const loginX = async (req, res) => {
 
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    console.log(data);
    if (!data) {
      return res.status(401).json({
        message: "User doesn't exist"
      });
    } else {
        const passwordChecked = await bcrypt.compare(password, data.password);
      if (!passwordChecked) {
        return res.status(401).json({
          message: "Invalid name/password"
        });
      } else {
        // req.session.isAdmin = data.isAdmin;
        req.session.loggedIn = true;
        return res.redirect('/about');
      }
    }
  } catch {
    return next(err);
  }
};


module.exports = {registerX, loginX }

