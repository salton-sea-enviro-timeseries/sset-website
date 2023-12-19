import { differenceInDays } from "date-fns";
import determineSourceOfData from "lib/determineSourceOfData";
import { useState } from "react";
import useSWR from "swr";
import { AirQualityDevices, CommonDeviceType } from "types";
import { fetchMultipleDeviceDetails } from "util/fetchMultipleDeviceDetails";

type UseSensorDataProps = {
  filterOutPurpleAirSensor: AirQualityDevices[];
  startDateRef: React.RefObject<HTMLInputElement>;
  endDateRef: React.RefObject<HTMLInputElement>;
};
export type FormErrorRange = {
  error: boolean;
  startDateErrorMsg: string | null;
  endDateErrorMsg: string | null;
};
type DateRange = {
  startDate?: string | null;
  endDate?: string | null;
};
type DataType = CommonDeviceType[];

function validateDateRange(startDate: Date, endDate: Date): string | null {
  if (startDate > endDate) return "Please enter a valid date range.";
  const today = new Date();
  if (startDate > today || endDate > today)
    return "Date cannot be in the future.";
  if (differenceInDays(endDate, startDate) > 120)
    return "Selected range should not exceed 4 months.";
  return null;
}
function useSensorData({
  filterOutPurpleAirSensor,
  startDateRef,
  endDateRef
}: UseSensorDataProps) {
  const sensorUrls = filterOutPurpleAirSensor.map(({ sensorId }) => {
    const sensorInfoArray = sensorId.split(":");
    return determineSourceOfData(sensorInfoArray[0]);
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });
  const [formError, setFormError] = useState<FormErrorRange>({
    error: false,
    startDateErrorMsg: "",
    endDateErrorMsg: ""
  });

  const {
    data: sensorData = [],
    error: fetchError,
    isValidating
  } = useSWR<DataType>([dateRange, ...sensorUrls], fetchMultipleDeviceDetails, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000
  });

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const startDateValue = startDateRef.current?.value;
    const endDateValue = endDateRef.current?.value;
    if (!startDateValue || !endDateValue) {
      setFormError((prevError) => ({
        ...prevError,
        error: true,
        startDateErrorMsg: !startDateValue
          ? "Please provide a start date."
          : "",
        endDateErrorMsg: !endDateValue ? "Please provide an end date." : ""
      }));

      return;
    }
    const startDateObj = new Date(startDateValue);
    const endDateObj = new Date(endDateValue);
    const dateError = validateDateRange(startDateObj, endDateObj);
    if (dateError) {
      setFormError({
        error: true,
        startDateErrorMsg: dateError,
        endDateErrorMsg: dateError
      });
      return;
    }
    setFormError((prevError) => ({
      ...prevError,
      error: false,
      startDateErrorMsg: "",
      endDateErrorMsg: ""
    }));
    setDateRange({
      startDate: startDateValue,
      endDate: endDateValue
    });
  };
  return {
    sensorData,
    fetchError,
    isValidating,
    dateRange,
    setDateRange,
    formError,
    handleFormSubmit
  };
}
export default useSensorData;
