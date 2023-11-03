import express from "express";
import { addUser, deleteUser, editUser, getUser, getUsers } from "../controller/user.js";

const router = express.Router();

router.route("/add").post(addUser);
router.route("/view").get(getUsers);
router.route("/view/:user_id").get(getUser);
router.route("/edit/:user_id").put(editUser);
router.route("/delete/:user_id").delete(deleteUser);

export default router;