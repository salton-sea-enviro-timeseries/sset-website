import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { fetchAeroqualDeviceData } from "@/lib/data-pipeline/aq/aeroqual";

// {
//     "site": "AQS1 04072024-2724: Offshore North",
//     "value": "aeroqual",
//     "sensorId": "AQS1 04072024-2724",
//     "latitude": 33.475697,
//     "longitude": -116.04686,
//     "color": "rgb(255, 172, 28)",
//     "location": "Offshore North"
//   },

async function run() {
  const data = await fetchAeroqualDeviceData({
    sensorId: "AQS1 04072024-2724",
    startDate: "2026-04-01",
    endDate: "2026-04-02"
  });

  console.log(JSON.stringify(data, null, 2));
}

run();
