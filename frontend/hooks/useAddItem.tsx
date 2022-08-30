import { useState } from "react";

const useAddItem = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e: any) => {
    const { value }: any = { ...e.target };
    setValue(value);
  };

  return { value, onChange, setValue };
};

export default useAddItem;
