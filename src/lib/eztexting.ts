const USERNAME = process.env.EZ_TEXTING_USERNAME as string;
const PASSWORD = process.env.EZ_TEXTING_PASSWORD as string;
const url = "https://a.eztexting.com/v1/contacts/";

function makeBaseAuth(username: string, password: string) {
  const tok = username + ":" + password;
  const base64String = Buffer.from(tok, "utf-8").toString("base64");
  return "Basic " + base64String;
}

export async function postContact(body: any) {
  const options = {
    method: "POST",
    headers: {
      Authorization: makeBaseAuth(USERNAME, PASSWORD),
      "Content-Type": "application/json"
    },
    body: body
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
