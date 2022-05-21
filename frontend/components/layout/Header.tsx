import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const Login = () => {};

  const User = () => {
    return (
      <div className={styles.user}>
        <button>
          <CgProfile size={20} />
          User
        </button>
        <button>setting</button>
      </div>
    );
  };

  const communityBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", event);
  };
  return (
    <div className={styles.header}>
      <button className={styles.title}>My Earth</button>
      <div className={styles.menu}>
        <button className={styles.communiBtn} onClick={communityBtn}>
          community
        </button>
        <User />
      </div>
    </div>
  );
};

export default Header;
