import Layout from "../components/layout/Layout";
import styles from "../styles/Login.module.css";
import React from "react";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { login } from "../apis/user/userapi";
import { useRouter } from "next/router";

const Login = () => {
  const userid = useInput("");
  const userpassword = useInput("");

  const router = useRouter();

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(userid.value, userpassword.value);
    if (res) {
      alert(`성공`);
      console.log("로그인 성공", res);
      // window.localStorage.setItem("isLogin", "true");
      // router.push("/");
    } else {
      window.localStorage.setItem("isLogin", "false");
      alert("다시 확인해주세요");
      console.log("실패");
    }
  };

  return (
    <Layout>
      <div className={styles.login_page}>
        <div className={styles.form}>
          <h2>Login</h2>
          <form className={styles.formlayout} onSubmit={submitLogin}>
            <label>email</label>
            <input
              className={styles.logininput}
              type="email"
              {...userid}
              required
            />
            <label>password</label>
            <input
              className={styles.logininput}
              type="password"
              {...userpassword}
              required
            />
            <div className={styles.btn}>
              <input type="submit" value="Login" />
            </div>
          </form>
          <Link href="/signup">
            <a className={styles.register}>Sign up</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
