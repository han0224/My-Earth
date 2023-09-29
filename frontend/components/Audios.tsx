import { useEffect, useState } from "react";
import styles from "../styles/Audios.module.css";
import FastForwardSharpIcon from "@mui/icons-material/FastForwardSharp";
import FastRewindSharpIcon from "@mui/icons-material/FastRewindSharp";
import StopCircleSharpIcon from "@mui/icons-material/StopCircleSharp";
import PlayCircleFilledSharpIcon from "@mui/icons-material/PlayCircleFilledSharp";
import Slider, { SliderValueLabelProps } from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const music = [
  {
    artist: "MasterClass",
    title: "A Glimmer Of Light",
  },
  {
    artist: "prima",
    title: "distant moon",
  },
  {
    artist: "Sumsay",
    title: "night plans",
  },
  {
    artist: "Xori",
    title: "Glow",
  },
];

const Audios = () => {
  const [volume, setVolume] = useState(50);
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const VolumeChange = (e: any) => {
    setVolume(e.target.value);
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.volume * 0.01;
    }
  };

  const setChange = (v: string) => {
    if (v === "up") {
      setMusicIndex((musicIndex + 1) % music.length);
    } else {
      setMusicIndex(musicIndex === 0 ? music.length - 1 : musicIndex - 1);
    }
  };
  const setMusic = () => {
    if (isPlay) {
      setIsPlay(false);
    } else {
      setIsPlay(true);
    }
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.src = `audio/${music[musicIndex].artist}-${music[musicIndex].title}.mp3`;
    }
  };

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.src = `audio/${music[musicIndex].artist}-${music[musicIndex].title}.mp3`;
      if (isPlay) {
        audio.load();
        audio.play();
        // audio.volume = volume * 0.01;
        audio.addEventListener("ended", () => {
          setChange("up");
        });
      } else {
        audio.pause();
      }
    }
  }, [musicIndex, isPlay]);
  useEffect(() => {
    if (!audio) {
      setAudio(new Audio());
    } else {
      audio.volume = volume * 0.01;
    }
  }, [volume]);

  return (
    <div className={styles.layout}>
      <div className={styles.musicPlayer}>
        <div className={styles.musicdetail}>
          <p>{music[musicIndex].title}</p>
          <span>{music[musicIndex].artist}</span>
        </div>
        <div className={styles.musicBtn}>
          <button onClick={() => setChange("down")}>
            <FastRewindSharpIcon style={{ fill: "white" }} fontSize="large" />
          </button>
          {isPlay ? (
            <button onClick={setMusic}>
              <StopCircleSharpIcon style={{ fill: "white" }} fontSize="large" />
            </button>
          ) : (
            <button onClick={setMusic}>
              <PlayCircleFilledSharpIcon
                style={{ fill: "white" }}
                fontSize="large"
              />
            </button>
          )}
          <button onClick={() => setChange("up")}>
            <FastForwardSharpIcon style={{ fill: "white" }} fontSize="large" />
          </button>
          <div className={styles.volume}>
            <Box component={"div"}>
              <Slider
                valueLabelDisplay="auto"
                slots={{
                  valueLabel: ValueLabelComponent,
                }}
                aria-label="Volume"
                value={volume}
                onChange={VolumeChange}
                min={0}
                max={100}
                sx={{
                  color: "#AF7EEA",
                }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audios;
