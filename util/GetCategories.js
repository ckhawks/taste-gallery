import { GetBucketNumberOfObjects } from "./GetBucketObjects";

// key: slug
// bucket_prefix: folder name in s3, folder name on local
// title: display name
export const CATEGORY_MAPPING = {
  photography: {
    bucket_prefix: "photog",
    title: "Photography",
    hidden: false,
    shortDescription: "Film or digital",
  },
  uxdesign: {
    bucket_prefix: "design-ux",
    title: "UX Design",
    hidden: false,
    shortDescription: "User interfaces are meant to be beautiful",
  },
  graphicdesign: {
    bucket_prefix: "design-graphic",
    title: "Graphic Design",
    hidden: false,
    shortDescription: "Typography, pretty shapes, pretty textures",
  },
  artdesign: {
    bucket_prefix: "design-art",
    title: "Design Art",
    hidden: false,
    shortDescription: "Graphic design that is a little too abstract",
  },
  scifiart: {
    bucket_prefix: "scifi-art",
    title: "Art",
    hidden: false,
    shortDescription: "Specifically not graphic design. Mostly scifi topics",
  },
  battlestation: {
    bucket_prefix: "battlestation",
    title: "Battlestations",
    hidden: false,
    shortDescription: "Computer setups. Sometimes RGB is ok",
  },
  minecraft: {
    bucket_prefix: "minecraft",
    title: "Minecraft Builds",
    hidden: false,
    shortDescription: "For the two week Minecraft phase",
  },
  meme: {
    bucket_prefix: "meme",
    title: "Memes",
    hidden: true,
    shortDescription: "hidden",
  },
};

export const getCategories = async () => {
  let categories = [];
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    // console.log(`${key}: ${value}`);
    if (value.hidden === false) {
      categories.push({
        slug: key,
        title: value.title,
        count: await GetBucketNumberOfObjects(value.bucket_prefix),
        hidden: value.hidden,
        shortDescription: value.shortDescription,
      });
    }
  }
  return categories;
};
