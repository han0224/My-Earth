import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
import Floor from "../components/Floor";

const Home: NextPage = () => {
  return (
    <div className={styles.scene}>
      {/* test */}
      <Canvas
        shadows={true}
        className={styles.canvas}
        camera={{ position: [-6, 7, 7] }}
      >
        <ambientLight color={"white"} intensity={0.3} />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};

export default Home;
