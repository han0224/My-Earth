const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // cookie
const config = require("./config/env/development");

const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/keys");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const session = require("express-session");
const mongoose = require("mongoose");
mongoose
  .connect(db.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));
const mongoStore = require("connect-mongo");

app.use(
  session({
    secret: config.sessionSecert,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: db.MongoURI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24, domain: "localhost" }, //5분 뒤 만료
  })
);

const userRouter = require("./routers/user");

app.use("/user", userRouter);

app.get("/", (req, res) => res.send("Develog!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
