import { Box, IconButton } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface Props {
  handleBiosNav: React.MouseEventHandler<HTMLButtonElement>;
}
const ProfileNav = ({ handleBiosNav }: Props) => {
  return (
    <IconButtonWrapper>
      <IconButton
        aria-label="previous profile"
        color="primary"
        id="prevQuest"
        onClick={handleBiosNav}
      >
        <DoubleArrow sx={{ transform: "rotate(180deg)" }} />
      </IconButton>

      <IconButton
        aria-label="next profile"
        color="primary"
        id="nextQuest"
        onClick={handleBiosNav}
      >
        <DoubleArrow />
      </IconButton>
    </IconButtonWrapper>
  );
};
const IconButtonWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 4
}));

export default ProfileNav;
