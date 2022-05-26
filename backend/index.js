const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // cookie

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const app = express();
const port = 5000;
const db = require("./config/keys");
const cors = require("cors");

//tset
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("not allowd origin!"));
    }
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

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
    secret: "ASDFASDFE",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: db.MongoURI }),
    cookie: { maxAge: 3.6e6 * 24, httpOnly: true }, //24시간 뒤 만료
  })
);

app.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들을 client 에서 가져오면
  // db에 넣어줌
  const user = new User(req.body);
  // 저장, 에러시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log("user", user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "유저가 없습니다",
      });
    }

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
          error: isMath,
        });
      }

      // user.generateToken((err, user) => {
      //   if (err) return res.status(400).send(err);

      //   res.cookie("x_auth", user.token, { httpOnly: true }).status(200).json({
      //     loginSuccess: true,
      //     token: user.token,
      //   });
      // });
      req.session.user = req.body.email;
      res.json({ loginSuccess: true, userid: user.email });
    });
  });
});

app.get("/auth", auth, (req, res) => {
  console.log(req);
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/logout", auth, (req, res) => {
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
