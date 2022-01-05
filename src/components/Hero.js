import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

function Hero(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {(props.title || props.subtitle) && (
        <Container>
          <Box textAlign="center">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={4}
              {...props.sectionHeaderProps}
            />
          </Box>
        </Container>
      )}
    </Section>
  );
}

export default Hero;
