export const formatTime = (second: number) => {
  const min = second / 60;
  const hour = min / 60;
  const sec = second % 60;
  return `${`0${Math.floor(hour)}`.slice(-2)}:${`0${
    Math.floor(min) % 60
  }`.slice(-2)}:${`0${sec}`.slice(-2)}`;
};

export const getHourAndMin = (second: number) => {
  const min = second / 60;
  const hour = min / 60;
  return `${`0${Math.floor(hour)}`.slice(-2)}:${`0${
    Math.floor(min) % 60
  }`.slice(-2)}`;
};
