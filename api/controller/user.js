import con from "../db/database.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import sendMail from "../services/sendEmail.js";

export const addUser = (req, res) => {
  const q =
    "INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `user_password`, `gender`, `dob`, `address`, `user_email`, `mobile`) VALUES (?)";
  const q1 = "SELECT `user_email` FROM `user` WHERE `user_email`=?";
  const {
    user_id,
    first_name,
    last_name,
    user_password,
    gender,
    dob,
    address,
    user_email,
    mobile,
  } = req.body;

  const formatedDob = moment(dob).format("YYYY-MM-DD");

  con.query(q1, [user_email], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Query!!", Result: err });
    } else if (data.length > 0) {
      return res.json({ Message: `User: ${first_name} Already exist!!` });
    } else {
      bcrypt.hash(user_password, 10, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ Message: "Error hashing password", Result: err });
        }

        const user = [
          user_id,
          first_name,
          last_name,
          hash,
          gender,
          formatedDob,
          address,
          user_email,
          mobile,
        ];

        con.query(q, [user], (err) => {
          if (err) {
            return res.json({ Message: "Error in Query!!", Result: err });
          } else {
            // Send Email to User
            const text = `Hello ${first_name}!! \n\nYour Account is Registered Successfull!! \n\n..............................................\nWelcome to the Web Application.`;
            const subject = "ACCOUNT REGISTRATION";

            sendMail(user_email, text, subject);

            return res.json({
              Message: `${first_name} Registered successful!!`,
              Status: "Success",
            });
          }
        });
      });
    }
  });
};

export const getUsers = (req, res) => {
  const q = "SELECT * FROM `user`";
  const q1 = "SELECT * FROM `user` WHERE `user_email`=? LIMIT 1";
  const { email } = req.query;

  if (email.includes("dmin")) {
    con.query(q, (err, data) => {
      if (err) {
        return res.json({ Message: "Error in Query!!", Result: err });
      } else {
        return res.json({ Result: data, Status: "Success" });
      }
    });
  } else {
    con.query(q1, [email], (err, data) => {
      if (err) {
        return res.json({ Message: "Error in Query!!", Result: err });
      } else if (data.length === 0) {
        return res.json({ Message: "User Not Found!!" });
      } else {
        return res.json({ Result: data, Status: "Success" });
      }
    });
  }
};

export const getUser = (req, res) => {
  const q = "SELECT * FROM `user` WHERE `user_email`=? LIMIT 1";
  const { user_id } = req.params;

  con.query(q, [user_id], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Query!!", Result: err });
    } else if (data.length === 0) {
      return res.json({ Message: "User Not Found!!" });
    } else {
      return res.json({ Result: data, Status: "Success" });
    }
  });
};

export const editUser = (req, res) => {
  const q =
    "UPDATE `user` SET `first_name`=?, `last_name`=?, `user_password`=?, `gender`=?, `dob`=?, `address`=?, `user_email`=?, `mobile`=? WHERE `user_email`=?";
  const q1 = "SELECT `user_id`, `user_password` FROM `user` WHERE `user_email`=? LIMIT 1";
  const q2 = "UPDATE `user` SET `first_name`=?, `last_name`=?, `gender`=?, `dob`=?, `address`=?, `user_email`=?, `mobile`=? WHERE `user_email`=?";
  const {
    first_name,
    last_name,
    user_password,
    gender,
    dob,
    address,
    user_email,
    mobile,
  } = req.body;
  const { user_id } = req.params;

  const formatedDob = moment(dob).format("YYYY-MM-DD");

  con.query(q1, [user_id], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Query!!", Result: err });
    } else if (data.length === 0) {
      return res.json({ Message: "User Not Found" });
    } else {
      const passwordMatch = user_password === data[0].user_password;

      if(!passwordMatch) {
        bcrypt.hash(user_password, 10, (err, hash) => {
          if (err) {
            return res.json({ Message: "Error hashing password", Result: err });
          }
  
          con.query(
            q,
            [
              first_name,
              last_name,
              hash,
              gender,
              formatedDob,
              address,
              user_email,
              mobile,
              user_id,
            ],
            (err) => {
              if (err) {
                return res.json({ Message: "Error in Query!!", Result: err });
              } else {
                return res.json({
                  Message: "Password Updated",
                  Status: "Success",
                });
              }
            }
          );
        });
      } else {
        con.query(q2, [first_name, last_name, gender, formatedDob, address, user_email, mobile, user_id], (err) => {
          if(err) {
            return res.json({ Message: "Error in Query!!", Result: err });
          } else {
            return res.json({ Message: "Updated Successfull!!", Status: "Success" });
          }
        })
      }
    }
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM `user` WHERE `user_id`=?";
  const q1 = "SELECT `user_id` FROM `user` WHERE `user_id`=? LIMIT 1";
  const { user_id } = req.params;

  con.query(q1, [user_id], (err, data) => {
    if (err) {
      return res.json({ Message: "Error in Query!!", Result: err });
    } else if (data.length === 0) {
      return res.json({ Message: `User with ID: "${user_id}" Not Found` });
    } else {
      con.query(q, [user_id], (err) => {
        if (err) {
          return res.json({ Message: "Error in Query!!", Result: err });
        } else {
          return res.json({
            Message: "Deleted Successful!!",
            Status: "Success",
          });
        }
      });
    }
  });
};
