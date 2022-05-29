import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "../styles/Audios.module.css";
import { CgMusic } from "react-icons/cg";

interface PlayProps {
  musicName: string;
  currentMusic: string;
  setCurrentMusic: Function;
  setVolume: Function;
}

const Play = ({
  musicName,
  currentMusic,
  setCurrentMusic,
  setVolume,
}: PlayProps) => {
  const [isPlay, setIsPlay] = useState(false);
  const [music, setMusic] = useState("");
  const btnRef = useRef();

  const handleMusic = () => {
    if (isPlay) {
      setCurrentMusic("");
      setIsPlay(false);
    } else {
      setCurrentMusic(musicName);
      setIsPlay(true);
    }
    console.log("isplay", isPlay, currentMusic);
  };

  const VolumeChange = (e) => {
    console.log(e.target.value);
    if (isPlay) {
      setVolume(e.target.value);
    }
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
    <div className={styles.music}>
      <button
        className={isPlay ? styles.playBtn : styles.pauseBtn}
        onClick={handleMusic}
      >
        <CgMusic size={30} />
      </button>
      <div className={styles.volumediv}>
        <input
          className={styles.volume}
          type={"range"}
          id="volume"
          min="0"
          max="100"
          onChange={VolumeChange}
        ></input>
      </div>
    </div>
  );
};

const Audios = () => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [music, setMusic] = useState("");
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    console.log("useEffect music");
    if (!audio) {
      setAudio(new Audio());
    } else if (music !== "") {
      console.log("music change");
      audio.src = `audio/${music}.mp3`;
      audio.load();
      audio.play();
      audio.volume = volume * 0.01;
      audio.loop = true;
    } else {
      audio.pause();
    }
  }, [music]);

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.volume = volume * 0.01;
    }
  }, [volume]);

  return (
    <div className={styles.layout}>
      <Play
        musicName={"test2"}
        setCurrentMusic={setMusic}
        currentMusic={music}
        setVolume={setVolume}
      />
      <Play
        musicName={"test"}
        setCurrentMusic={setMusic}
        currentMusic={music}
        setVolume={setVolume}
      />
    </div>
  );
};

export default Audios;

// TODO : mp3 이름 변경
