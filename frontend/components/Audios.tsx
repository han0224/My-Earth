import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "../styles/Audios.module.css";
import { CgMusic } from "react-icons/cg";

interface PlayProps {
  musicName: string;
  currentMusic: string;
  setCurrentMusic: Function;
}

const Play = ({ musicName, currentMusic, setCurrentMusic }: PlayProps) => {
  const [isPlay, setIsPlay] = useState(false);
  const [music, setMusic] = useState("");
  const btnRef = useRef();

  const handleMusic = () => {
    console.log("music Btn Click", musicName);
    setCurrentMusic(musicName);
    setIsPlay(true);
  };

  useEffect(() => {
    console.log("useEffect: currentMusic", currentMusic);
    if (!music) {
      setMusic(musicName);
    } else if (currentMusic !== music) {
      setIsPlay(false);
    }
  }, [currentMusic]);

  return (
    <button className={styles.musicBtn} onClick={handleMusic}>
      <CgMusic size={30} />
    </button>
  );
};

const Audios = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [music, setMusic] = useState("");

  useEffect(() => {
    console.log("useEffect music");
    console.log("typeof currentMusic", typeof setMusic);
    if (!audio) {
      setAudio(new Audio());
    } else {
      console.log("music change");
      audio.src = `audio/${music}.mp3`;
      audio.load();
      audio.play();
      audio.loop = true;
    }
  }, [music]);
  return (
    <div className={styles.layout}>
      <Play
        musicName={"test2"}
        setCurrentMusic={setMusic}
        currentMusic={music}
      />
      <Play
        musicName={"test"}
        setCurrentMusic={setMusic}
        currentMusic={music}
      />
    </div>
  );
};

export default Audios;

// TODO : mp3 이름 변경
