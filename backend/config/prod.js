// 배포시
// Heroku 라는 사이트에 MONGO_RUI 라는 변수에 숨기고 싶은 코드를 넣어주어 사용
// 아직 배포하지 않아 코드만 작성

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECERT,
};
