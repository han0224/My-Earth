import { ReactNode } from "react";
import Header from "./Header";
import styles from "../../styles/Layout.module.css";

interface layoutProps {
  children: ReactNode;
}

const layout = (props: layoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      {props.children}
    </div>
  );
};

export default layout;
