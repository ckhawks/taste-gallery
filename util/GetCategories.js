import { GetBucketNumberOfObjects } from "./GetBucketObjects";

// key: slug
// bucket_prefix: folder name in s3, folder name on local
// title: display name
export const CATEGORY_MAPPING = {
  photography: { bucket_prefix: "photog", title: "Photography" },
  uxdesign: { bucket_prefix: "design-ux", title: "UX Design" },
  graphicdesign: { bucket_prefix: "design-graphic", title: "Graphic Design" },
  artdesign: { bucket_prefix: "design-art", title: "Design Art" },
  scifiart: { bucket_prefix: "scifi-art", title: "Art (Mostly Scifi)" },
  battlestation: { bucket_prefix: "battlestation", title: "Battlestations" },
  minecraft: { bucket_prefix: "minecraft", title: "Minecraft Builds" },
};

export const getCategories = async () => {
  let categories = [];
  for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
    // console.log(`${key}: ${value}`);
    categories.push({
      slug: key,
      title: value.title,
      count: await GetBucketNumberOfObjects(value.bucket_prefix),
    });
  }
  return categories;
};
