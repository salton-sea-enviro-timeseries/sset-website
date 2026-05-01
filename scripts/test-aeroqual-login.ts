import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const response = await fetch("https://api.cloud.aeroqual.com/v2/login", {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Username: process.env.AEROQUAL_USERNAME,
      Password: process.env.AEROQUAL_PASSWORD,
      RememberMe: true
    })
  });

  console.log("Login status:", response.status);

  const setCookie = response.headers.get("set-cookie");
  console.log("Set-Cookie:", setCookie);

  const body = await response.text();
  console.log("Body:", body);
}

run();
