import RSS from 'rss';
import { getContentfulClient, enhanceContentfulItem } from "../../enhancers/helpers"

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Turbo Tutorials',
    generator: 'Turbo Tutorials',
    description: 'You can find short instructional videos at Turbo Tutorials that teach you the most common things in modern JavaScript and its meta frameworks.',
    site_url: 'https://turbo-tutorials.dev/',
    feed_url: `https://turbo-tutorials.dev/rss.xml`,
    image_url: 'https://res.cloudinary.com/dwfcofnrd/image/upload/w_1200,q_auto,f_auto/Turbo%20Tutorials/share-image.png',
    language: 'en',
  });

  const ctfClient = getContentfulClient();
  const tutorialData = await ctfClient.getEntries({
    content_type: "turboTutorial",
  });

  const tutorials = tutorialData.items.map((tut) => {
    const tutorial = enhanceContentfulItem(tut)
    return {
      url: `/tutorials/${tutorial.slug}/`,
      title: tutorial.title,
      date: tutorial.publicationDate,
      description: tutorial.description,
      categories: tutorial.tags,
      complexity: tutorial.complexity
    }
  })

  tutorials.forEach(tutorial => {
    feed.item({
      title: tutorial.title ?? '-',
      url: `https://turbo-tutorials.dev${tutorial.url}/`,
      date: tutorial.date,
      description: tutorial.description,
      categories: tutorial.categories,
      author: 'Tim Benniks',
      custom_elements: [
        { 'complexity': tutorial.complexity }
      ]
    });
  });

  const feedString = feed.xml({ indent: true });
  event.res.setHeader('content-type', 'text/xml');
  event.res.end(feedString);
});