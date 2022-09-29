import { Box, Button } from "@material-ui/core";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import WithLoading from "./WithLoading";

interface DownloadDataButtonsSectionProps {
  isLoading: boolean;
  nutrientButtonText: string;
  sensorButtonText: string;
}

const DownloadDataButtonsSection = ({
  isLoading,
  nutrientButtonText,
  sensorButtonText
}: DownloadDataButtonsSectionProps) => {
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
            {nutrientButtonText}
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
            href="/api/download?range=probe_surface&filename=probe-data.csv"
            download
          >
            {sensorButtonText}
          </Button>
        </WithLoading>
      </Box>
    </>
  );
};

export default DownloadDataButtonsSection;
