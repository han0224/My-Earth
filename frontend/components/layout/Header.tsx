import React from "react";
import styles from "../../styles/Header.module.css";
import { CgProfile } from "react-icons/cg";

const buttons = [];

const Header = () => {
  const Right = () => {
    return (
      <div>
        <CgProfile />
      </div>
    );
  };

  const communityBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", event);
  };
  return (
    <div className={styles.header}>
      My Earth
      <button className={styles.communiBtn} onClick={communityBtn}>
        community
      </button>
      <Right />
    </div>
  );
};

export default Header;
