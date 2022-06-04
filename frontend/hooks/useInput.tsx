import { useState } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e: any) => {
    const { value }: any = { ...e.target };
    setValue(value);
  };

  return { value, onChange };
};

export default useInput;
