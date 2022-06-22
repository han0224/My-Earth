import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { auth, logout } from "../../apis/userapi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const goUser = async () => {
    const res = await auth();
    if (res.success) {
      console.log("로그인 중", res);
      dispatch(setUser(true));
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

  const clicklogout = async (e: any) => {
    if (isLogin) {
      const res = await logout();
      if (res) {
        alert(`정상적으로 로그아웃 되었습니다. ${res}`);
        window.localStorage.setItem("isLogin", "false");
        dispatch(setUser(false));
        setIsLogin(false);
        router.push("/");
      } else {
        alert(`비정상로그아웃`);
      }
    }
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
        <ul className={styles.mainmenu}>
          <li>
            <div className={styles.fixed}>community</div>
          </li>
          {isLogin ? (
            <li>
              <div className={styles.fixed} onClick={onClick}>
                User
              </div>
            </li>
          ) : (
            <li>
              <div className={styles.fixed} onClick={onClick}>
                Login
              </div>
            </li>
          )}
          <li>
            {" "}
            <div>
              <FiSettings size={30} />
            </div>
            <ul className={styles.submenu}>
              <li>
                <div>about</div>
              </li>
              <li>
                <div>????</div>
              </li>
              {isLogin === true && (
                <li>
                  <div onClick={clicklogout}>Logout</div>
                </li>
              )}
            </ul>
          </li>
        </ul>
        {/* <button className={styles.communiBtn} onClick={communityBtn}>
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
        </div> */}
      </div>
    </div>
  );
};

export default Header;
