import type { InferGetStaticPropsType } from "next";
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

import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Layout from "@/components/Layout";
import Meta from "@/components/Meta";
import { useAppContext } from "@/components/AppContext";
import { getCmsContent } from "@/util/getCmsContent";
import { ContactPage, LocaleOption } from "@/types";
// TODO: Refactor
const ContactUsPage = ({
  contactPageContent
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // @ts-ignore
  const { language } = useAppContext();

  const currentLocale = language === "en" ? "en-US" : "es";

  // ================== cms start ==================
  const contactFields = contactPageContent?.fields;

  const title =
    contactFields?.title?.[currentLocale as keyof LocaleOption<string>];

  const body =
    contactFields?.body?.[currentLocale as keyof LocaleOption<string>];

  const callToAction =
    contactFields?.callToAction?.[currentLocale as keyof LocaleOption<string>];

  const applyLink = contactFields?.applyLink?.["en-US"];

  const metaTitle =
    contactFields?.metadata?.metadata?.["en-US"]?.fields?.site_title?.[
      "en-US"
    ] ||
    title ||
    "Contact Us | Salton Sea Environmental Timeseries";

  const members = contactFields?.members?.["en-US"] || [];

  const contactMembers = members.map(({ fields }: any) => {
    const name =
      fields.name?.[currentLocale as keyof LocaleOption<string>] ||
      fields.name?.["en-US"] ||
      "";

    const email =
      fields.email?.[currentLocale as keyof LocaleOption<string>] ||
      fields.email?.["en-US"] ||
      "";

    const website = fields.website?.["en-US"] || "";

    const affiliationImage =
      fields.affiliation?.["en-US"]?.fields?.file?.["en-US"]?.url;

    const affiliationTitle =
      fields.affiliation?.["en-US"]?.fields?.title?.["en-US"] || "";

    return {
      name,
      email,
      website,
      affiliationImage,
      affiliationTitle
    };
  });
  // ================== cms end ==================

  return (
    <Layout>
      <Meta title={metaTitle} />

      <Hero bgColor="secondary" size="medium" title={title} />

      <Section>
        <Container maxWidth="sm" sx={{ top: "-6rem", position: "relative" }}>
          <StyledCard>
            {contactMembers.map((member) => (
              <Box
                key={member.email || member.name}
                width="100%"
                display="flex"
              >
                <StyledDetails>
                  <StyledContent>
                    <List dense>
                      {member.email && (
                        <ListItemButton
                          dense
                          component="a"
                          href={`mailto:${member.email}`}
                        >
                          <ListItemText
                            primary={member.name}
                            secondary={member.email}
                          />
                        </ListItemButton>
                      )}

                      {!member.email && <ListItemText primary={member.name} />}

                      {member.website && (
                        <ListItemButton
                          dense
                          component="a"
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ListItemText primary={member.website} />
                        </ListItemButton>
                      )}
                    </List>
                  </StyledContent>
                </StyledDetails>

                {member.affiliationImage && (
                  <StyledCover
                    image={`https:${member.affiliationImage}`}
                    title={member.affiliationTitle}
                  />
                )}
              </Box>
            ))}
          </StyledCard>

          <Card>
            <CardContent>
              {body && (
                <Box
                  textAlign="center"
                  component="p"
                  sx={{
                    fontSize: "1.25rem",
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {body}
                </Box>
              )}

              {callToAction && applyLink && (
                <Box pt={3} display="flex" justifyContent="center">
                  <Button
                    href={applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    {callToAction}
                  </Button>
                </Box>
              )}
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
  backgroundSize: "70%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
});

export default ContactUsPage;

export const getStaticProps = async () => {
  let contactPageContent;

  try {
    contactPageContent = await getCmsContent<ContactPage>("contactPage");
  } catch (error) {
    console.error("Error while fetching contact page content: ", error);
  }

  return {
    props: {
      contactPageContent
    }
  };
};
