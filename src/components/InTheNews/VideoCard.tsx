import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface VideoCardProps {
  title: string;
  description: string;
  src: string;
}
export default function VideoCard({ title, description, src }: VideoCardProps) {
  return (
    <StyledCard elevation={2}>
      <StyledIframe
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%"
}));

const StyledIframe = styled("iframe")(() => ({
  width: "100%",
  height: 225,
  border: 0,
  objectFit: "cover"
}));
