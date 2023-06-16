import { useState } from "react";

const useProfileNavigation = (profilesLength: number) => {
  const [profileIndex, setProfileIndex] = useState(0);

  const handleBiosNav = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    const offset = id === "prevQuest" ? -1 : 1;
    const newProfileIndex =
      (profileIndex + offset + profilesLength) % profilesLength;
    setProfileIndex(newProfileIndex);
  };
  return { profileIndex, handleBiosNav };
};

export default useProfileNavigation;
