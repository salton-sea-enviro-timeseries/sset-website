import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Hero from "components/Hero";
import Section from "components/Section";
import Layout from "components/Layout";
import Translation from "components/Translation";
import Meta from "components/Meta";

const ContactUsPage = () => {
  return (
    <Layout>
      <Meta title="Contact Us | Salton Sea Environmental Timeseries" />
      <Translation
        path="pages.contact.language.content.title"
        propsToTranslate={{
          title: "pages.contact.language.content.title"
        }}
      >
        <Hero bgColor="secondary" size="medium" />
      </Translation>
      <Section>
        <Container maxWidth="sm" sx={{ top: "-6rem", position: "relative" }}>
          <StyledCard>
            <Box width="100%" display="flex">
              <StyledDetails>
                <StyledContent>
                  <List dense>
                    <ListItemButton
                      dense
                      component="a"
                      href="mailto:aydee@alianzacv.org"
                    >
                      <ListItemText
                        primary="Juliana Taboada"
                        secondary="juliana@alianzacv.org"
                      />
                    </ListItemButton>
                    <ListItemButton
                      dense
                      component="a"
                      href="https://www.alianzacv.org/"
                      target="_blank"
                    >
                      <ListItemText primary="www.alianzacv.org" />
                    </ListItemButton>
                  </List>
                </StyledContent>
              </StyledDetails>
              <StyledCover image="/alianzacv-logo.jpg" title="Alianza CV" />
            </Box>
            <Box width="100%" display="flex">
              <StyledDetails>
                <StyledContent>
                  <List>
                    <ListItemButton
                      dense
                      component="a"
                      href="mailto:rsinclair@llu.edu"
                    >
                      <ListItemText
                        primary="Dr. Ryan Sinclair"
                        secondary="rsinclair@llu.edu"
                      />
                    </ListItemButton>
                  </List>
                </StyledContent>
              </StyledDetails>
              <StyledCover
                image="/loma-linda-university.png"
                title="Loma Linda University"
              />
            </Box>
          </StyledCard>
          <Card>
            <CardContent>
              <Translation
                align="center"
                variant="h6"
                component="p"
                path="pages.contact.language.content.content"
              />
              <Box pt={3} display="flex" justifyContent="center">
                <Translation
                  path="pages.contact.language.content.apply_button_text"
                  propsToTranslate={{
                    href: "pages.contact.language.content.apply_button_link"
                  }}
                >
                  <Button
                    href=""
                    target="_blank"
                    size="large"
                    variant="contained"
                    color="primary"
                  />
                </Translation>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </Layout>
  );
};
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(2, 0)
}));

const StyledDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1 0 auto"
});

const StyledContent = styled(CardContent)({
  flex: "1 0 auto",
  padding: "8px"
});

const StyledCover = styled(CardMedia)({
  width: "50%",
  backgroundSize: "contain"
});
export default ContactUsPage;
