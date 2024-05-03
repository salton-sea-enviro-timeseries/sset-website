import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hero from "components/Hero";
import Layout from "components/Layout";
import Meta from "components/Meta";
import Translation from "components/Translation";

const AboutUs = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Meta title="About Us | Salton Sea Environmental Timeseries" />
      <Translation
        path="site.language.navLinks.about"
        propsToTranslate={{
          title: "site.language.navLinks.about"
        }}
      >
        <Hero bgColor="secondary" size="medium" />
      </Translation>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: `inset 0 -5px 0 ${theme.palette.secondary.light}`
  }
}));
export default AboutUs;
