import { useState } from "react";

type SelectOptions<T> = {
  initialValues: T[];
  defaultValue: T;
};
const useSelect = <T extends string | number>({
  initialValues,
  defaultValue
}: SelectOptions<T>) => {
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue);
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as T);
  };

  return { selectedValue, handleSelectChange, options: initialValues };
};

export default useSelect;