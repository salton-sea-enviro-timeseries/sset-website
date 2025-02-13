import { Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import Image from "next/image";

type AboutUsProps = {
  image?: string;
  name: string;
  answer?: string;
  title: string;
  community: string;
  question: string;
  activeCard: boolean;
  onHeightChange: (height: number) => void;
};

const CardDetails = ({
  image,
  name,
  community,
  title,
  question,
  answer,
  activeCard,
  onHeightChange
}: AboutUsProps) => {
  const refHeight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const height = refHeight.current?.offsetHeight || 0;
    onHeightChange(height);
  }, [activeCard, onHeightChange]);

  return (
    <StyledGridContainer container spacing={0} ref={refHeight}>
      <Grid item xs={12}>
        <AvatarWrapper>
          <Image
            layout="fill"
            objectFit="cover"
            src={image ? `https:${image}` : "/avatar-placeholder.png"}
            alt={"Avatar"}
          />
        </AvatarWrapper>
      </Grid>
      <Grid item xs={12}>
        <BioWrapper>
          <Box display="flex" flexWrap="wrap" alignItems="center">
            <NameTextStyles variant="h6">{name}:</NameTextStyles>
            <TitleTextStyles>{title}</TitleTextStyles>
          </Box>
          <Typography>
            <b>From:</b> {community}
          </Typography>
          <Box>
            <Typography noWrap={true} gutterBottom={true}>
              <Typography component="span" color="primary">
                <strong>Question:</strong>
              </Typography>
              {question}
            </Typography>
          </Box>
          <Typography>
            <strong>Answer:</strong> {answer}
          </Typography>
        </BioWrapper>
      </Grid>
    </StyledGridContainer>
  );
};

export default CardDetails;

const StyledGridContainer = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center"
}));

const AvatarWrapper = styled("div")(() => ({
  borderRadius: "50%",
  overflow: "hidden",
  position: "relative",
  width: 275,
  height: 275,
  margin: "auto"
}));

const BioWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2)
}));

const NameTextStyles = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  paddingRight: theme.spacing(1)
}));

const TitleTextStyles = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize
}));
