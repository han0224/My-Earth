const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // cookie
const config = require("./config/env/development");
const { User } = require("./models/User");
// const { auth } = require("./middleware/auth");

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
    cookie: { maxAge: 1000 * 60 * 5, domain: "localhost" }, //5분 뒤 만료
  })
);

app.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들을 client 에서 가져오면
  // db에 넣어줌
  const user = new User(req.body);
  // 저장, 에러시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

app.post("/login", async (req, res) => {
  // console.log(req);
  const userInfo = User.findOne({ email: req.body.email }, (err, user) => {
    console.log("user", user);
    if (!user) {
      return res.json({
        success: false,
        message: "유저가 없습니다",
      });
    }

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.json({
          success: false,
          message: "비밀번호가 틀렸습니다.",
          error: isMath,
        });
      }

      // res.cookie("sessionId", user.email);

      req.session.save(function () {
        req.session.userEmail = user.email;
        res.json({ success: true });
        if (err) console.log(err);
      });
    });
  });

  console.log("userinfo", userInfo);
});

app.get("/auth", (req, res) => {
  console.log(req.session);
  if (req.session.userEmail) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

app.get("/logout", (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err)
      return res.json({
        success: false,
        err,
      });
    return res.status(200).send({
      success: true,
    });
  });
});

app.get("/", (req, res) => res.send("Develog!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
