import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function getEnrichments() {
  const result = await fetch(
    `https://uniform.app/api/v1/enrichments?projectId=${process.env.UNIFORM_PROJECT_ID}`,
    {
      method: "get",
      headers: {
        "x-api-key": process.env.UNIFORM_API_KEY,
      },
    }
  );

  const data = await result.json();

  fs.writeFile(
    "./data/enrichments.json",
    JSON.stringify(data.enrichments, "", 2),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  console.log("enrichments file written");
}

getEnrichments();
