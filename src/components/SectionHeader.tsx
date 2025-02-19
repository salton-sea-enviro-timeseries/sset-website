import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { LaunchOutlined } from "@mui/icons-material";
import Link from "next/link";
import { styled } from "@mui/material/styles";
// type variantText = TypographyVariant;
interface SectionHeaderProps {
  subtitle?: string;
  subtitleProps?: Object;
  title?: string;
  sectionId: string;
  sectionFootNoteLink?: Boolean;
  titleProps?: Object;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  display?: string;
  justifyContent?: string;
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
function SectionHeader(props: SectionHeaderProps) {
  const {
    subtitle,
    subtitleProps,
    title,
    sectionId,
    sectionFootNoteLink,
    titleProps,
    size,
    className,
    ...otherProps
  } = props;
  // Render nothing if no title or subtitle
  if (!title && !subtitle) {
    return null;
  }
  const renderTitleWithLink = () => (
    <a
      href={sectionId}
      style={{ color: "inherit", textDecoration: "none" }}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(`${sectionId}-footnote`);
      }}
    >
      {title}
      <StyledSup>†</StyledSup>
    </a>
  );
  const SectionTitle = () => (
    <Typography variant={size} gutterBottom={!!subtitle} {...titleProps}>
      {sectionFootNoteLink ? renderTitleWithLink() : title}
    </Typography>
  );
  const renderGraduationSection = () => (
    <StyledGraduationSection>
      <Image
        src="/graduation-illustration-balloons.svg"
        alt="balloons illustration"
        width={150}
        height={150}
        style={{
          objectFit: "contain"
        }}
      />
      <SectionTitle />
      <Image
        src="/graduation-illustration-2.svg"
        alt="graduation celebration"
        width={150}
        height={150}
        style={{
          objectFit: "contain"
        }}
      />
    </StyledGraduationSection>
  );
  const renderAboutUsSection = () => (
    <Link href="/about-us" passHref legacyBehavior>
      <StyledAboutLink>
        <Typography variant={size} gutterBottom={!!subtitle} {...titleProps}>
          {title}
        </Typography>
        <LaunchOutlined />
      </StyledAboutLink>
    </Link>
  );
  return (
    <StyledHeader id={sectionId} className={className} {...otherProps}>
      {title &&
        (sectionId === "section-grads" ? (
          renderGraduationSection()
        ) : sectionId === "aboutus" ? (
          renderAboutUsSection()
        ) : (
          <SectionTitle />
        ))}

      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{ maxWidth: 700, display: "inline-block" }}
          {...subtitleProps}
        >
          {subtitle}
        </Typography>
      )}
    </StyledHeader>
  );
}
const StyledHeader = styled(Box)(({ theme }) => ({
  "&:not(:last-child)": {
    marginBottom: "2rem"
  }
}));

const StyledSup = styled("sup")(({ theme }) => ({
  color: "#336699",
  fontWeight: "bold",
  transition: "300ms",
  "&:hover": {
    color: "red"
  }
}));

const StyledGraduationSection = styled(Box)({
  display: "flex",
  alignItems: "center"
});

const StyledAboutLink = styled("a")(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& > svg": {
    transition: "color 300ms"
  },
  "&:hover > svg": {
    color: "royalBlue"
  }
}));
export default SectionHeader;
