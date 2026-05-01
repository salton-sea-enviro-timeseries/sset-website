import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  StyledImageWrapper,
  StyledSmallTextLeaderShip
} from "../Shared/StyledElements";
import SocialLinkContainer from "../Shared/SocialLinkContainer";
import { getSocialLinks } from "@/util/getSocialLinks";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=E0E0E0&color=757575&size=256";

const getAvatar = (firstName?: string, lastNAme?: string) => {
  const name = `${firstName ?? ""} ${lastNAme ?? ""}`.trim();

  return name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E0E0E0&color=757575&size=256`
    : //TODO: add a better placeholder
      DEFAULT_AVATAR;
};
interface SocialMediaItem {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  // Todo: add bluesky icon
  bluesky?: string;
  email?: string;
}

interface PersonnelDetailsProp {
  index?: number;
  firstName?: string;
  lastName?: string;
  title?: string;
  headShotPath?: string;
  employment?: string;
  socials?: SocialMediaItem;
}

const Member = ({
  index,
  // TODO change place holder
  firstName = "first-name",
  lastName = "last-name",
  title = "role",
  headShotPath = DEFAULT_AVATAR,
  employment = "",
  socials = {}
}: PersonnelDetailsProp) => {
  const socialStyles = {
    width: 24,
    height: 24,
    fill: "#163C3D"
  };
  const socialMediaIcons = getSocialLinks(socials, socialStyles);
  const imageSrc = headShotPath?.trim()
    ? headShotPath
    : getAvatar(firstName, lastName);
  return (
    <HeadShotDetailsWrapper key={`head-shot-${index}`}>
      <StyledImageWrapper
        backgroundImage={imageSrc}
        borderRadius={16}
        height="312px"
        maxWidth={{ xs: "100%", xl: "300px" }}
      />
      <NameAndSocialsContainer>
        <StyledSmallTextLeaderShip>
          {[firstName, lastName].filter(Boolean).join(" ")}{" "}
        </StyledSmallTextLeaderShip>
        <StyledSmallTextLeaderShip
          sx={{ fontWeight: 400, fontSize: "1.0625rem", textAlign: "center" }}
        >
          {title}
        </StyledSmallTextLeaderShip>
        <SocialLinkContainer socialMediaIcons={socialMediaIcons} />
      </NameAndSocialsContainer>
    </HeadShotDetailsWrapper>
  );
};
const HeadShotDetailsWrapper = styled(Box)({
  maxWidth: "312px",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto"
});

const NameAndSocialsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

export default Member;
