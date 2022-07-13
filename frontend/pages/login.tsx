import Layout from "../components/layout/Layout";
import styles from "../styles/Login.module.css";
import React from "react";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { login } from "../apis/userapi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user";
import { todayTime } from "../apis/timeapi";
import moment from "moment";
import { saveTime } from "../store/timer";
// import { setUser } from "../store/user";

const Login = () => {
  const userid = useInput("");
  const userpassword = useInput("");
  const dispatch = useDispatch();

  const router = useRouter();

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(userid.value, userpassword.value);
    if (res.success) {
      // alert(`성공`);
      const result = await todayTime(moment().format("YYYY-MM-DD"));
      if (result !== null) {
        console.log(result);
        console.log(result.data);
        dispatch(saveTime(result.data));
      }
      dispatch(setUser(res.data));
      router.push("/");
    } else {
      alert(`${res.message}`);
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
