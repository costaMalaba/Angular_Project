import express from 'express';
import csurf from "csurf";
import {forgotPassword, logIn, logOut, resetPassword} from '../controller/auth.js';

const router = express.Router();
const csurfProtection = csurf({ cookie: true });

router.route("/auth").post(logIn);
router.route("/auth").post(logOut);
router.route("/resetpassword").put(forgotPassword);
router.route("/updatepassword").put(resetPassword);


export default router;