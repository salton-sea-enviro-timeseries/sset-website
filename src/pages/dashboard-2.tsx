import { Box } from "@material-ui/core";
import Script from "next/script";
import Layout from "components/Layout";

const Dashboard2 = () => {
  return (
    <Layout>
      <Box px={2}>
        <div
          className="tableauPlaceholder"
          id="viz1636752754740"
          style={{
            position: "relative"
          }}
        >
          <noscript>
            <a href="#">
              <img
                alt="Dashboard 1 "
                src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ys&#47;ysiphotometerdata&#47;Dashboard1&#47;1_rss.png"
                style={{
                  border: "none"
                }}
              />
            </a>
          </noscript>
          <object
            className="tableauViz"
            style={{
              display: "none"
            }}
          >
            <param
              name="host_url"
              value="https%3A%2F%2Fpublic.tableau.com%2F"
            />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="ysiphotometerdata&#47;Dashboard1" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param
              name="static_image"
              value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ys&#47;ysiphotometerdata&#47;Dashboard1&#47;1.png"
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-US" />
            <param name="filter" value="publish=yes" />
          </object>
        </div>
        <Script
          id="tableu-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
    var divElement = document.getElementById('viz1636752754740');                    
    var vizElement = divElement.getElementsByTagName('object')[0];
    if ( divElement.offsetWidth > 800 ) { 
        vizElement.style.minWidth='100%';
        vizElement.style.maxWidth='100%';
        vizElement.style.minHeight='587px';
        vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';
    } 
    else if ( divElement.offsetWidth > 500 ) { 
        vizElement.style.minWidth='420px';
        vizElement.style.maxWidth='100%';
        vizElement.style.minHeight='587px';
        vizElement.style.maxHeight=(divElement.offsetWidth*0.75)+'px';} 
        else { 
            vizElement.style.width='100%';vizElement.style.height='727px';
        }                     
        var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement); 
  `
          }}
        />
      </Box>
    </Layout>
  );
};

export default Dashboard2;
