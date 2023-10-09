import { GetBucketNumberOfObjects } from "./GetBucketObjects";

// url name to users : prefix name in s3
export const CATEGORY_MAPPING = {
  photography: { bucket_prefix: "photog", title: "Photography" },
  battlestation: { bucket_prefix: "battlestation", title: "Battlestations" },
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
