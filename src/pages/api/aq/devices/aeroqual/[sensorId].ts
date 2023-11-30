import {
  OriginalData,
  TransformedData,
  getAeroqualDeviceData
} from "lib/aeroqual";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCookies } from "util/getCookies";
import { loginAndGetCookies } from "util/loginAndGetCookies";
function transformData(originalData: OriginalData): TransformedData[] {
  if (!originalData.Instruments || originalData.Instruments.length === 0) {
    return [];
  }
  return originalData.Instruments.flatMap((instrument) =>
    instrument.Data.map((dataPoint) => ({
      sn: instrument.Serial,
      timestamp_local: dataPoint.Time,
      ...dataPoint.Data
    }))
  );
}
const COOKIE_DOMAIN = process.env.AEROQUAL_COOKIE_DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  if (method !== "GET")
    return res.status(405).end(`Method ${method} Not Allowed`);
  try {
    let cookies = req.headers.cookie || "";
    if (!cookies) {
      cookies = await loginAndGetCookies();
    }
    // const cookies = await getCookies(req, "aq_auth");
    const cookieRegex = new RegExp(`aq_auth=([^;]+)`, "i");
    const cookieMatch = cookies.match(cookieRegex);
    if (cookieMatch && cookieMatch[1] && COOKIE_DOMAIN) {
      const cookieString = `aq_auth=${cookieMatch[1]}; Path=/; Secure; HttpOnly; SameSite=None`;
      res.setHeader("set-cookie", cookieString);
    }
    // let cookieString = `${cookies}; Path=/; Secure; HttpOnly; SameSite=None`;
    // if (COOKIE_DOMAIN) {
    //   cookieString += `;Domain=${COOKIE_DOMAIN}`;
    // }
    // res.setHeader("set-cookie", cookieString);
    const data = await getAeroqualDeviceData({
      sensorId: query.sensorId as string,
      startDate: query.startDate as string,
      endDate: query.endDate as string,
      cookies
    });
    const reformatData = transformData(data);
    return res.status(200).json(reformatData);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    } else {
      console.error("An unexpected error occurred:", err);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method, query } = req;
//   if (method !== "GET")
//     return res.status(405).end(`Method ${method} Not Allowed`);
//   try {
//     const cookies = await getCookies(req, "aq_auth");
//     let cookieString = `${cookies}; Path=/; Secure; HttpOnly; SameSite=None`;
//     if (COOKIE_DOMAIN) {
//       cookieString += `;Domain=${COOKIE_DOMAIN}`;
//     }
//     res.setHeader("set-cookie", cookieString);
//     const data = await getAeroqualDeviceData({
//       sensorId: query.sensorId as string,
//       startDate: query.startDate as string,
//       endDate: query.endDate as string,
//       cookies
//     });
//     const reformatData = transformData(data);
//     return res.status(200).json(reformatData);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err);
//       return res.status(500).json({ message: err.message });
//     } else {
//       console.error("An unexpected error occurred:", err);
//       return res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// }
