import { ReactNode } from "react";
import Header from "./Header";

interface layoutProps {
  children: ReactNode;
}

const layout = (props: layoutProps) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default layout;
