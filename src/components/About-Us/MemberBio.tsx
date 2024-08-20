import {
  Box,
  Avatar,
  Typography,
  makeStyles,
  Divider
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
type BioProps = {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  img: string;
};
const MemberBio: React.FC<BioProps> = ({
  firstName,
  lastName,
  title,
  bio,
  img
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.bioWrapper}>
      <Box className={classes.teamMemberBioSection}>
        <Typography variant="h5" display="block" className={classes.nameStyle}>
          {firstName} {lastName}
        </Typography>
        <Box className={classes.dividerWrapper}>
          <Divider className={classes.divider} />
          <FiberManualRecordIcon color="primary" fontSize="small" />
          <Divider className={classes.divider} />
        </Box>
      </Box>

      <Box className={classes.bioContainer}>
        <Avatar
          alt={`${firstName} ${lastName}`}
          src={img}
          className={classes.avatar}
        >
          <Typography variant="h4">
            {`${firstName[0]}${lastName[0]}`}
          </Typography>
        </Avatar>
        <Box>
          <Typography
            variant="subtitle1"
            display="block"
            className={classes.titleStyles}
          >
            {title}
          </Typography>
          <Typography variant="body1" display="inline">
            {bio}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  nameStyle: {
    marginRight: theme.spacing(2),
    minWidth: "200px"
  },
  titleStyles: { fontWeight: "bold" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center"
  },
  teamMemberBioSection: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  dividerWrapper: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  divider: {
    flexGrow: 1,
    height: 1,
    borderRadius: 50,
    background: "#BCBCBC"
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginRight: theme.spacing(2)
  },
  avatarOdd: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    float: "right",
    shapeOutside: "circle(50%)",
    marginRight: "1rem"
  },
  bioContainer: {
    display: "flex"
  },
  bioWrapper: {
    marginTop: theme.spacing(4)
  }
}));
export default MemberBio;
