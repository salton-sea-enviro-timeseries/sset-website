import { Box, Avatar, Typography, makeStyles, Divider } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
type BioProps = {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  img?: string;
};
const MemberBio: React.FC<BioProps> = ({
  firstName,
  lastName,
  title,
  bio,
  img = ""
}) => {
  return (
    <BioWrapper>
      <TeamMemberBioSection>
        <NameStyle variant="h5" display="block">
          {firstName} {lastName}
        </NameStyle>
        <DividerWrapper>
          <StyledDivider />
          <FiberManualRecordIcon color="primary" fontSize="small" />
          <StyledDivider />
        </DividerWrapper>
      </TeamMemberBioSection>

      <BioContainer>
        <StyledAvatar alt={`${firstName} ${lastName}`} src={img}>
          <Typography variant="h4">
            {`${firstName[0]}${lastName[0]}`}
          </Typography>
        </StyledAvatar>
        <Box>
          <TitleStyles variant="subtitle1" display="block">
            {title}
          </TitleStyles>
          <Typography variant="body1" display="inline">
            {bio}
          </Typography>
        </Box>
      </BioContainer>
    </BioWrapper>
  );
};
const BioWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const TeamMemberBioSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2)
}));

const NameStyle = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  minWidth: "200px"
}));

const DividerWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center"
}));

const StyledDivider = styled(Divider)(() => ({
  flexGrow: 1,
  height: 1,
  borderRadius: 50,
  background: "#BCBCBC"
}));

const BioContainer = styled(Box)(() => ({
  display: "flex"
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginRight: theme.spacing(2)
}));

const TitleStyles = styled(Typography)(() => ({
  fontWeight: "bold"
}));

export default MemberBio;
