import { GetBucketNumberOfObjects } from "./GetBucketObjects";
import { GetRevalidateVersion } from "./RevalidateVersion";
import { cache } from "react";

// key: slug
// bucket_prefix: folder name in s3, folder name on local
// title: display name
export const CATEGORY_MAPPING = {
  photography: {
    bucket_prefix: "photog",
    title: "Photography",
    hidden: false,
    shortDescription: "Film or digital",
    portfolio: false,
  },
  uxdesign: {
    bucket_prefix: "design-ux",
    title: "UX Design",
    hidden: false,
    shortDescription: "User interfaces are meant to be beautiful",
    portfolio: false,
  },
  graphicdesign: {
    bucket_prefix: "design-graphic",
    title: "Graphic Design",
    hidden: false,
    shortDescription: "Typography, pretty shapes, pretty textures",
    portfolio: false,
  },
  artdesign: {
    bucket_prefix: "design-art",
    title: "Design Art",
    hidden: false,
    shortDescription: "Graphic design that is a little too abstract",
    portfolio: false,
  },
  scifiart: {
    bucket_prefix: "scifi-art",
    title: "Art",
    hidden: false,
    shortDescription: "Specifically not graphic design. Mostly scifi topics",
    portfolio: false,
  },
  pixelart: {
    bucket_prefix: "game-art-pixel",
    title: "Game and Pixel Art",
    hidden: false,
    shortDescription: "Low res is better than high res change my mind",
    portfolio: false,
  },
  battlestation: {
    bucket_prefix: "battlestation",
    title: "Battlestations",
    hidden: false,
    shortDescription: "Computer setups. Sometimes RGB is ok",
    portfolio: false,
  },
  minecraft: {
    bucket_prefix: "minecraft",
    title: "Minecraft Builds",
    hidden: false,
    shortDescription: "For the two week Minecraft phase",
    portfolio: false,
  },
  meme: {
    bucket_prefix: "meme",
    title: "Memes",
    hidden: true,
    shortDescription: "hidden",
    portfolio: false,
  },
};

export const getCategories = cache(async () => {
  const version = GetRevalidateVersion();
  const func = async (version) => {
    let categories = [];
    for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
      // console.log(`${key}: ${value}`);
      if (value.hidden === false && value.portfolio === false) {
        categories.push({
          slug: key,
          prefix: value.bucket_prefix,
          title: value.title,
          count: await GetBucketNumberOfObjects(value.bucket_prefix),
          hidden: value.hidden,
          shortDescription: value.shortDescription,
        });
      }
    }
    return categories;
  };

  return await func(version);
});

export const getPortfolioCategories = cache(async () => {
  const version = GetRevalidateVersion();
  const func = async (version) => {
    let categories = [];
    for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
      // console.log(`${key}: ${value}`);
      if (value.hidden === false && value.portfolio === true) {
        categories.push({
          slug: key,
          prefix: value.bucket_prefix,
          title: value.title,
          count: await GetBucketNumberOfObjects(value.bucket_prefix),
          hidden: value.hidden,
          shortDescription: value.shortDescription,
        });
      }
    }
    return categories;
  };

  return await func(version);
});
