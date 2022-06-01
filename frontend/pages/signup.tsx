import Layout from "../components/layout/Layout";
import styles from "../styles/Login.module.css";
import React, { useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import { register } from "../apis/userapi";
import { off } from "process";
import { useRouter } from "next/router";

const Signup = () => {
  const userid = useInput("");
  const userpassword = useInput("");
  const username = useInput("");
  const [checkpw, setCheckpw] = useState("");
  const [okPw, setOkPw] = useState(true);
  const ref = useRef<HTMLLabelElement>(null);
  const router = useRouter();

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!okPw) {
      ref.current.style.color = "red";
      return;
    }
    const res = await register(
      username.value,
      userid.value,
      userpassword.value
    );
    if (res) {
      console.log("회원가입 성공", res);
      router.push("/login");
    } else {
      alert("실패");
      console.log("실패");
    }
  };

  const comparePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckpw(e.target.value);
    if (e.target.value !== userpassword.value) {
      console.log("다름!", checkpw, userpassword.value);
      setOkPw(false);
    } else {
      console.log("같음!");
      setOkPw(true);
    }
  };
  useEffect(() => {
    if (okPw) {
    }
  }, [okPw]);

  return (
    <Layout>
      <div className={styles.signup_page}>
        <div className={styles.form}>
          <h2>Sign Up</h2>
          <form className={styles.formlayout} onSubmit={submitSignup}>
            <label>name</label>
            <input
              className={styles.logininput}
              type="string"
              {...username}
              required
            />
            <label>email</label>
            <input
              className={styles.logininput}
              type="email"
              {...userid}
              required
            />
            <label>pass</label>
            <input
              className={styles.logininput}
              type="password"
              {...userpassword}
              required
            />
            <label>passcheck</label>
            <input
              value={checkpw}
              className={styles.logininput}
              type="password"
              onChange={comparePw}
              required
            />
            <label
              ref={ref}
              className={okPw ? styles.notActive : styles.active}
            >
              비밀번호를 확인해주세요
            </label>
            <div className={styles.btn}>
              <input type="submit" value="Sign Up" />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
