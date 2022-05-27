import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { auth } from "../../apis/user/userapi";
import { useRouter } from "next/router";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const goUser = async () => {
    const res = await auth();
    if (res) {
      console.log("로그인 중", res);
      router.push("/user");
    } else {
      alert("로그인 해주세요");
      router.push("/");
      window.localStorage.setItem("isLogin", "false");
      setIsLogin(false);
    }
  };
  const onClick = (e: React.MouseEvent) => {
    if (isLogin) {
      goUser();
    } else {
      router.push("/login");
    }
  };
  const communityBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", event);
  };
  useEffect(() => {
    if (window.localStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    } else setIsLogin(false);
    console.log("isLogin", isLogin);
  }, [isLogin]);

  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.title}>My Earth</a>
      </Link>
      <div className={styles.menu}>
        <button className={styles.communiBtn} onClick={communityBtn}>
          community
        </button>
        <div className={styles.user}>
          {isLogin ? (
            <button onClick={onClick}>User</button>
          ) : (
            <button onClick={onClick}>login</button>
          )}

          <div className={styles.setting}>
            <FiSettings size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
