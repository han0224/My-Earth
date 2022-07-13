import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { logout } from "../../apis/userapi";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/user";
import { RootState } from "../../store";

const Header = () => {
  const dispatch = useDispatch();
  const { isUser } = useSelector((state: RootState) => state.user);

  const [isLogin, setIsLogin] = useState(isUser);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const userClick = (e: React.MouseEvent) => {
    if (isLogin) {
      router.push("user");
    } else {
      router.push("/login");
    }
  };

  const clicklogout = async (e: any) => {
    if (isLogin) {
      const res = await logout();
      if (res) {
        alert(`정상적으로 로그아웃 되었습니다. ${res}`);

        dispatch(deleteUser());
        router.push("/");
      } else {
        alert(`비정상로그아웃`);
        dispatch(deleteUser());
        router.push("/");
      }
    }
  };

  const clickSubmenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isUser) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isUser]);

  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.title}>My Earth</a>
      </Link>
      <div className={styles.menu}>
        <ul className={styles.mainmenu}>
          <li>
            <button className={styles.fixed}>community</button>
          </li>
          {isLogin ? (
            <li>
              <button className={styles.fixed} onClick={userClick}>
                User
              </button>
            </li>
          ) : (
            <li>
              <button className={styles.fixed} onClick={userClick}>
                Login
              </button>
            </li>
          )}
          <li>
            {" "}
            <button onClick={clickSubmenu}>
              <FiSettings size={30} />
            </button>
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
      {isOpen ? (
        <ul className={styles.submenu}>
          <li>
            <button>about</button>
          </li>
          <li>
            <button>????</button>
          </li>
          {isLogin === true && (
            <li>
              <button onClick={clicklogout}>Logout</button>
            </li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
