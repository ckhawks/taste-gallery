import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

import {
  S3Client,
  // This command supersedes the ListObjectsCommand and is the recommended way to list objects.
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const GetBucketNumberOfObjects = cache(async (prefix) => {
  return (await GetBucketObjects(prefix)).length; // dont be silly wrap your await
});

export const GetBucketObjects = cache(async (prefix) => {
  console.log("bucket_prefix", prefix);
  const command = new ListObjectsV2Command({
    Bucket: "taste-images.stlr.cx",
    Prefix: prefix || "",
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 1000,
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n");
    let contents = "";

    let objects = [];
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      Contents.map((object) => {
        if (object.Key === `${prefix}/`) return;
        objects.push(object);
      });
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents.slice(0, 200));
    return objects;
  } catch (err) {
    console.error(err);
  }
});
