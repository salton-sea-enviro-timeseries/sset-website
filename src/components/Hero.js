import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
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
      {props.cta && (
        <Box py={5} display="flex" justifyContent="center" alignItems="center">
          {props.cta}
        </Box>
      )}
    </Section>
  );
}

export default Hero;
