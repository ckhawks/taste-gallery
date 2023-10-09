// import { GetBucketObjects } from "../../../util/GetBucketObjects";

import { revalidatePath } from "next/cache";
import {
  GetRevalidateVersion,
  UpdateRevalidateVersion,
} from "../../../../util/RevalidateVersion";

export async function GET() {
  // await revalidatePath("/gallery");
  UpdateRevalidateVersion();

  return Response.json({
    status: "ok",
    revalidateVersion: GetRevalidateVersion(),
  });
}
