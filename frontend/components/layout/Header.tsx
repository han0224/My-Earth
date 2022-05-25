import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {}, []);

  const User = () => {
    return (
      <div className={styles.user}>
        <button>
          <div className={styles.label}>login</div>
        </button>
        <button>
          <div className={styles.label}>setting</div>
        </button>
      </div>
    );
  };

  const communityBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click", event);
  };
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.title}>My Earth</a>
      </Link>
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
