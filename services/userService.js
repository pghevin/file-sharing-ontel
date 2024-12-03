const userModel = require("../models/user");
const companyModel = require("../models/company");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password, company_id } = req.body;

    let userExists = await userModel.findOne({ email }).lean();
    if (userExists) {
      return res
        .status(400)
        .json({ error: true, message: "Email id already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      company_id,
      active: true,
    });
    if (user) {
      return res.status(201).json({
        error: false,
        message: "User created",
        data: user,
      });
    } else {
      return res
        .status(500)
        .json({ error: true, message: "Ops!, Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email })
      .populate("company_id", "company")
      .select("name password company_id active")
      .lean();
    console.log("user found :", user);
    if (!user) {
      return res.status(400).json({
        error: true,
        isEmailWrong: true,
        message: "Your email is incorrect.",
      });
    }

    if (user && !user.active) {
      return res.status(400).json({
        error: true,
        isEmailWrong: true,
        message: "User is inactive",
      });
    }
    let isUser;
    let company;

    if (user) {
      isUser = await bcrypt.compare(password, user.password);
    }

    if (!isUser) {
      return res.status(400).json({
        error: true,
        isPasswordWrong: true,
        message: "Your password is incorrect.",
      });
    }

    const userObj = {
      name: user.name,
      user_id: user._id,
      email,
      company_id: user.company?._id,
      company: company,
    };

    return res.status(200).json({
      error: false,
      message: "Login successful",
      data: userObj,
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
