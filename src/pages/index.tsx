// import Head from "next/head";
import Layout from "components/Layout";
import Hero from "components/Hero";
import AboutSaltonSeaSection from "components/AboutSaltonSeaSection";
import AboutUsSection from "components/AboutUsSection";

const Home = () => {
  return (
    <Layout>
      <Hero
        bgColor="primary"
        size="large"
        bgImage="/hero.jpg"
        bgImageOpacity={0.75}
        title="Your landing page title here"
        subtitle="Some nice words here."
      />
      <AboutSaltonSeaSection />
      <AboutUsSection />
    </Layout>
  );
};

export default Home;
