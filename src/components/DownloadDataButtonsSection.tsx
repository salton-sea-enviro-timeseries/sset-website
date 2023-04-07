import { Box, Button } from "@material-ui/core";
import DownloadIcon from "@material-ui/icons/CloudDownload";

import { useAppContext } from "components/AppContext";
import { getContent } from "util/getContent";
import WithLoading from "./WithLoading";

interface DownloadDataButtonsSectionProps {
  isLoading: boolean;
}

const DownloadDataButtonsSection = ({
  isLoading
}: DownloadDataButtonsSectionProps) => {
  // @ts-ignore
  const { language } = useAppContext();

  return (
    <>
      <Box pr={0.5}>
        <WithLoading
          isLoading={isLoading}
          variant="rect"
          height={30}
          width="130px"
        >
          <Button
            startIcon={<DownloadIcon />}
            size="small"
            variant="contained"
            href="/api/download?range=nutrients&filename=nutrients-data.csv"
            download
          >
            {getContent(
              `pages.dashboard.${language}.content.download_nutrients_data_button`
            )}
          </Button>
        </WithLoading>
      </Box>
      <Box pl={0.5}>
        <WithLoading
          isLoading={isLoading}
          variant="rect"
          height={30}
          width="130px"
        >
          <Button
            startIcon={<DownloadIcon />}
            size="small"
            variant="contained"
            href="/api/download?range=YSI_probe&filename=probe-data.csv"
            download
          >
            {getContent(
              `pages.dashboard.${language}.content.download_sensor_data_button`
            )}
          </Button>
        </WithLoading>
      </Box>
      <Box pl={1} pr={0.5}>
        <WithLoading
          isLoading={isLoading}
          variant="rect"
          height={30}
          width="130px"
        >
          <Button
            startIcon={<DownloadIcon />}
            size="small"
            variant="contained"
            href="/SSET_readme.txt"
            download
          >
            {getContent(
              `pages.dashboard.${language}.content.download_readme_button`
            )}
          </Button>
        </WithLoading>
      </Box>
    </>
  );
};

export default DownloadDataButtonsSection;
