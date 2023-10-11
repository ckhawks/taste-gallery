// import { GetBucketObjects } from "../../../util/GetBucketObjects";

import { GetNumberOfBucketObjectsRandom } from "../../../../util/GetBucketObjects";

const NUM_ITEMS_TO_SHOW = 3;

export async function GET(request) {
  // const requestBody = request.json();
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix");
  if (!prefix) return Response.json({ status: "no" });
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // console.log(requestBody);
  // await revalidatePath("/gallery");
  // UpdateRevalidateVersion();

  const items = await GetNumberOfBucketObjectsRandom(prefix, NUM_ITEMS_TO_SHOW);

  return Response.json({
    items: items,
  });
}
