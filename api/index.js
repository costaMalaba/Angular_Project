import express from "express";
import dotenv from "dotenv";
import logIn from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import session from "express-session";
import user_log from "./routes/user_log.js";
import logger from "./logs/logger.js";

dotenv.config();
const app = express();



app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip,
    user: req.user,
  });
  next();
})

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'session',
    secret: process.env.JWT_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 30,
        secure: false,
        sameSite: 'none',
    }
  })
);

// User
app.use("/login", logIn);
app.use("/user", user);

// Auth
app.use("/auth", auth);

// Logs
app.use("/log", user_log);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App listening on port ${PORT}`));
