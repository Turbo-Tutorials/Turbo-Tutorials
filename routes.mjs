import fs from "fs";
import dotenv from "dotenv";
import contentful from 'contentful'

dotenv.config();

async function getRoutes() {
  const ctfClient = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
  });

  const tutorials = await ctfClient.getEntries({
    content_type: "turboTutorial",
  });

  const routes = tutorials.items.map((tutorial) => {
    return `/tutorials/${tutorial.fields.slug}/`
  })

  const result = ['/', '/about/', '/pwyw/', '/personalization-profile/', '/privacy-policy/', '/rss.xml', '/tutorials/', ...routes]

  fs.writeFile(
    "./data/routes.json",
    JSON.stringify(result, "", 2),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  console.log("routes file written");
}

getRoutes();
