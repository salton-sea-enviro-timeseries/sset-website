import useSWR, { mutate } from "swr";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { pollroseFetcher } from "util/pollroseFetcher";
import { Box, IconButton, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { CommonDeviceType, PollroseResponse, pollutantKey } from "types";
import { generatePollroseCSV } from "util/excelUtils";
import { getDateRangeFromSensor } from "util/getDateRangeFromSensor";
import { useMemo, useState } from "react";
import { addCacheBuster } from "util/addCacheBuster";
const FASTAPI_BASE_URL = "https://pollrose-fastapi.onrender.com";
type PollroseGeneratorProps = {
  pollroseData: CommonDeviceType[];
  sensorName: string;
  selectedPollutant: pollutantKey;
};
const ALLOWED_POLLUTANTS = ["H2S", "NO2"] as const;
type AllowedPollutant = (typeof ALLOWED_POLLUTANTS)[number];
//typescript safe gaurd
function isAllowedPollutant(p: string): p is AllowedPollutant {
  return ALLOWED_POLLUTANTS.includes(p as AllowedPollutant);
}
const PollroseGenerator = ({
  pollroseData,
  sensorName,
  selectedPollutant
}: PollroseGeneratorProps) => {
  const [lastValidData, setLastValidData] = useState<PollroseResponse | null>(
    null
  );
  const isValidPollutant = isAllowedPollutant(selectedPollutant);
  const { bdate, edate } = useMemo(
    () => getDateRangeFromSensor(pollroseData),
    [pollroseData]
  );
  const csvString = useMemo(() => {
    return generatePollroseCSV(pollroseData, selectedPollutant);
  }, [pollroseData, selectedPollutant]);

  const swrKey =
    isValidPollutant && csvString
      ? ([
          "/api/generate-pollrose",
          {
            site: sensorName,
            bdate: bdate,
            edate: edate,
            pollv: selectedPollutant,
            csvFile: csvString
          }
        ] as const)
      : null;
  const { data, error, isLoading, isValidating } = useSWR(
    swrKey,
    ([url, params]) => pollroseFetcher(url, params),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
      onSuccess: (newData) => setLastValidData(newData)
    }
  );

  const pollroseFigure = data || lastValidData;
  if (error) return <div>Error fetching windrose plot</div>;
  return (
    <div>
      <Box
        position="relative"
        width={350}
        height={350}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isValidating ? (
          <CircularProgress />
        ) : pollroseFigure?.image ? (
          <>
            {/* Extracted image URL with cache buster */}
            {(() => {
              const imageUrl = addCacheBuster(
                `${FASTAPI_BASE_URL}/${pollroseFigure.image}`
              );
              return (
                <>
                  <a
                    href={imageUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      size="small"
                      aria-label="download"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        zIndex: 1,
                        backgroundColor: "white",
                        boxShadow: 1,
                        "&:hover": {
                          backgroundColor: "#f0f0f0"
                        }
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </a>

                  <Image
                    src={imageUrl}
                    alt="Pollrose Plot"
                    fill
                    sizes="350px"
                    style={{ objectFit: "contain" }}
                  />
                </>
              );
            })()}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No figure available.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default PollroseGenerator;
