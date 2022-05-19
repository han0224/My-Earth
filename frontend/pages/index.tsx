import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Floor from "../components/Floor";
import Earth from "../components/Earth";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.space}>
        <div className={styles.sidebar}></div>
        <p className={styles.time}>TIME</p>
        <Earth />
      </div>
    </Layout>
  );
};

export default Home;
