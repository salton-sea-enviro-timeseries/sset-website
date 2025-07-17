import { Box, Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import WithLoading from "../WithLoading";
import useSWR from "swr";
import { useCallback } from "react";
import { saveAs } from "file-saver";

interface DownloadDataButtonsSectionProps {
  isLoading: boolean;
  nutrientButtonText?: string;
  sensorButtonText?: string;
  readMeSrc?: string;
}
const fetcher = (url: string) => fetch(url).then((r) => r.blob());
const DownloadDataButtonsSection = ({
  isLoading,
  nutrientButtonText,
  sensorButtonText,
  readMeSrc
}: DownloadDataButtonsSectionProps) => {
  const { data, error } = useSWR(readMeSrc, fetcher);
  const handleDownload = useCallback(() => {
    if (data) {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "SSET_readme.txt");
    }
  }, [data]);
  if (error)
    console.log("Error: There was an error downloading readMe.txt file");
  return (
    <>
      <Box pr={0.5}>
        <WithLoading
          isLoading={isLoading}
          variant="rectangular"
          height={30}
          width="130px"
        >
          <Button
            sx={{ backgroundColor: "#e0e0e0", color: "black" }}
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
          variant="rectangular"
          height={30}
          width="130px"
        >
          <Button
            sx={{ backgroundColor: "#e0e0e0", color: "black" }}
            startIcon={<DownloadIcon />}
            size="small"
            variant="contained"
            href="/api/download?range=probe_surface&filename=probe-surface.csv"
            download
          >
            {sensorButtonText}
          </Button>
        </WithLoading>
      </Box>
      <Box pl={1} pr={0.5}>
        <WithLoading
          isLoading={isLoading}
          variant="rectangular"
          height={30}
          width="130px"
        >
          <Tooltip
            title={
              error ? "There was an error downloading the readme file." : ""
            }
          >
            <span>
              <Button
                sx={{ backgroundColor: "#e0e0e0", color: "black" }}
                startIcon={<DownloadIcon />}
                size="small"
                variant="contained"
                onClick={handleDownload}
                disabled={error ? true : false}
              >
                readMe
              </Button>
            </span>
          </Tooltip>
        </WithLoading>
      </Box>
    </>
  );
};

export default DownloadDataButtonsSection;
