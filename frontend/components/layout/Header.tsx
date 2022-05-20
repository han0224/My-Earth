import React from "react";
import styles from "../../styles/Header.module.css";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const User = () => {
    return (
      <div className={styles.user}>
        <CgProfile />
        <button>User</button>
      </div>
    );
  };

  const communityBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", event);
  };
  return (
    <div className={styles.header}>
      My Earth
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
