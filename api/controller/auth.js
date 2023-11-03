import con from "../db/database.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import sendMail from "../services/sendEmail.js";
import { v4 as uuid } from "uuid";
import logger from "../logs/logger.js";

dotenv.config();
const TOKEN = process.env.JWT_TOKEN;

const createToken = (user) => {
  return jwt.sign({ userId: user.user_id }, TOKEN, { expiresIn: "5s" });
};



export const logIn = (req, res) => {
  const q =
    "SELECT `user_email`, `user_password` FROM `user` WHERE `user_email`=? LIMIT 1";
    const q1 = "INSERT INTO `user_logs` (`user_id`, `activity`) VALUES(?, ?)";
  const { user_email, user_password, csrfToken } = req.body;
  let activity;

  con.query(q, [user_email], (err, data) => {
    if (err) {
      activity = "Error in Running Query"
      logger.error('Error logging activity', { user_email, activity })
      return res.json({ Message: activity, Result: err });
    } else if (data.length === 0) {
      activity = "Invalid email or password";
      logger.error('Error logging activity', { user_email, activity })
      con.query(q1, [user_email, activity]);
      return res.json({ Message: activity });
    } else {
      const user = data[0];
      req.session.user = user;
      req.session.loggedIn = true;

      bcrypt.compare(user_password, user.user_password, (err, isValid) => {
        if (err) {
          activity = "Error comparing passwords";
          logger.error('Error logging activity', { user_email, activity })
          con.query(q1, [user_email, activity]);
          return res.json({ Message: activity });
        } else if (!isValid) {
          activity = "Authentication failed!!"
          logger.error('Error logging activity', { user_email, activity })
          con.query(q1, [user_email, activity]);
          return res.json({ Message: activity });
        } else {
          activity = "Login Successful!!";
          logger.info('User activity logged', { user_email, activity });
          con.query(q1, [user_email, activity]);
          const token = createToken(user);
          return res.json({
            Message: activity,
            token: token,
            Status: "Success",
            user,
            session: req.session,
          });
        }
      });
    }
  });
};

export const logOut = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .json({ Satus: "Success", Message: "User has been logged out." });
};

export const forgotPassword = (req, res) => {
  const q = "SELECT `user_email` FROM `user` WHERE `user_email`=? LIMIT 1";
  const q1 = "UPDATE `user` SET `resetToken`=? WHERE `user_email`=?";
  const { user_email } = req.body;

  con.query(q, [user_email], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Running Query", Result: err });
    } else if (data.length === 0) {
      return res.json({ Message: "User Not Found!!" });
    } else {
      const token = uuid();

      con.query(q1, [token, user_email], (err, data) => {
        if (err) {
          return res.json({ Message: "Error in Running Query", Result: err });
        } else {
          // Send Email to User
          const text = `Click on the link below to reset your password:\nhttp://localhost:4200/changepassword/${token}`;
          const subject = "RESET YOUR PASSWORD";

          sendMail(user_email, text, subject);

          return res.json({
            Message: "A password reset link has been sent to your email",
            Status: "Success",
          });
        }
      });
    }
  });
};

export const resetPassword = (req, res) => {
  const q =
    "SELECT `resetToken`, `user_email` FROM `user` WHERE `resetToken`=? LIMIT 1";
  const q1 = "UPDATE `user` SET `user_password`=? WHERE `user_email`=?";
  const { n_password, token } = req.body;

  con.query(q, [token], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Running Query", Result: err });
    } else if (data.length === 0) {
      return res.json({ Message: "Invalid Token" });
    } else {
      bcrypt.hash(n_password, 10, (err, hash) => {
        if (err) {
          return res.json({ Message: "Error hashing password", Result: err });
        } else {
          const email = data[0].user_email;
          con.query(q1, [hash, email], (err, data) => {
            if (err) {
              return res.json({
                Message: "Error in Running Query",
                Result: err,
              });
            } else {
              // Send Email to User
            const text = `Hello!! \n\nYour password has been reset`;
            const subject = "PASSWORD RESET";

            sendMail(email, text, subject);

              return res.json({ Message: "Your password has been reset", Status: "Success" });
            }
          });
        }
      });
    }
  });
};
