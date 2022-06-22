import Layout from "../components/layout/Layout";
import styles from "../styles/Login.module.css";
import React from "react";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { auth, login } from "../apis/userapi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../store/user";

const Login = () => {
  const userid = useInput("");
  const userpassword = useInput("");
  const dispatch = useDispatch();
  const router = useRouter();

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(userid.value, userpassword.value);
    if (res.success) {
      alert(`성공`);
      window.localStorage.setItem("isLogin", "true");
      dispatch(setUser(true));
      router.push("/");
      console.log("로그인 성공", res);
    } else {
      alert(res.message);
      console.log("실패");
    }
  };

  const test = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await auth();
    if (res.success) {
      alert("로그인 성공");
    } else {
      alert(`로그인 필요`);
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
      {/* <button onClick={test} style={{ background: "#fff", fontSize: "60px" }}>
        [test] login check
      </button> */}
    </Layout>
  );
};

export default Login;
