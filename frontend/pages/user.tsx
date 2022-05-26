import Layout from "../components/layout/Layout";
import styles from "../styles/Login.module.css";
import React, { useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import { auth } from "../apis/user/userapi";
import { off } from "process";
import { useRouter } from "next/router";

const User = () => {
  const userid = useInput("");
  const userpassword = useInput("");
  const username = useInput("");
  const [checkpw, setCheckpw] = useState("");
  const router = useRouter();

  const isLogin = async () => {
    const res = await auth();
    if (res) {
      console.log("로그인 중", res);
    } else {
      router.push("/");
      window.localStorage.setItem("isLogin", "false");
      alert("로그인 해주세요");
    }
  };
  useEffect(() => {
    isLogin();
  }, []);

  return <Layout>auth</Layout>;
};

export default User;
