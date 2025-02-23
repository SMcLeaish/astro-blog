import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIContext } from "astro";

export const GET = async (context: APIContext) => {
  const posts = await getCollection("blog");
  if (!context.site) {
    return new Response("Site URL is missing", { status: 500 });
  }
  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    site: context.site,
    items: posts.map((post: CollectionEntry<"blog">) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
};
