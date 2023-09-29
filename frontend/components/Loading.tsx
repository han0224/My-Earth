import CircularProgress from "@mui/material/CircularProgress";
import styled from "../styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styled.loading}>
      <CircularProgress color="secondary" size={80} />
    </div>
  );
};
export default Loading;
