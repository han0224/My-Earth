// 개발할 때 local환경에서 development mode로 혹은
// 클라우드 서비스를 통해 deploy 한 후에는 production mode로개발 할 수 있음
// 이 두가지 경우 정보를 가져오는 루트가 다름
// 그렇기에 분기를 나누어 주어야함
// development mode 에서는 process.env.NODE_ENV 가 development
// production mode 에서는 process.env.NODE_ENV 가 production

// Nodejs 에서 환경변수에 접근할 때는 process.env 라는 내장 자바스크립트 객체 사용
// process 는 전역 객체 -> 별도 임포트 필요 없음

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
