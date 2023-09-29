import Layout from "../components/layout/Layout";
import styles from "../styles/User.module.css";
import React from "react";
import Profile from "../components/Profile";

import Box from "@mui/material/Box";

const boxSx = {
  width: "75%",
  height: "75%",
  border: 1,
};

const User = () => {
  return (
    <Layout>
      <div className={styles.space}>
        <Box sx={boxSx} component={"div"}>
          <div className={styles.userCard}>
            <Profile />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

export default User;
