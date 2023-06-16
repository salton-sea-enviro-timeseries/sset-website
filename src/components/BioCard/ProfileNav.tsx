import { Box } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DoubleArrow from "@material-ui/icons/DoubleArrowSharp";
import { makeStyles } from "@material-ui/core/styles";
import { useAppContext } from "components/AppContext";

interface Props {
  handleBiosNav: React.MouseEventHandler<HTMLButtonElement>;
}
const ProfileNav = ({ handleBiosNav }: Props) => {
  // @ts-ignore
  const { language } = useAppContext();
  const classes = useStyles();
  return (
    <Box className={classes.iconButtonWrapper}>
      <IconButton
        aria-label="previous profile"
        color="primary"
        id="prevQuest"
        onClick={handleBiosNav}
      >
        <DoubleArrow style={{ transform: "rotate(180deg)" }} />
      </IconButton>

      <IconButton
        aria-label="next profile"
        color="primary"
        id="nextQuest"
        onClick={handleBiosNav}
      >
        <DoubleArrow />
      </IconButton>
    </Box>
  );
};
const useStyles = makeStyles(() => ({
  iconButtonWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4
  }
}));

export default ProfileNav;
