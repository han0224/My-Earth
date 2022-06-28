const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // cookie
// const config = require("./config/env/development");
const app = express();
const port = process.env.PORT || 5000;
const keys = require("./config/keys");
const cors = require("cors");

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dynamic-cannoli-c2d1ae.netlify.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const session = require("express-session");
const mongoose = require("mongoose");
mongoose
  .connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));
const mongoStore = require("connect-mongo");

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: keys.MONGO_URI }),
    cookie: {
      maxAge: 86400000,
      sameSite: process.env.NODE_ENV === undefined ? "lax" : "none",
      secure: process.env.NODE_ENV === undefined ? false : true,
      httpOnly: true,
    },
  })
);

const userRouter = require("./routers/user");
const timeRouter = require("./routers/time");
const todoRouter = require("./routers/todo");

app.use("/user", userRouter);
app.use("/time", timeRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => res.send("Develog!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
