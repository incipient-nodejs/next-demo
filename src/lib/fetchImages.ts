import type { ImagesResults } from "@/models/images";
import { ImageSchemaWithPhotos } from "@/models/images";
import { env } from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("Fetch Images error!\n");
    const imagesResults: ImagesResults = await res.json();
    // console.log({imagesResults});
    const parsedData = ImageSchemaWithPhotos.parse(imagesResults);
    if (parsedData.total_results === 0) return undefined;
    return parsedData;
  } catch (err) {
    console.log((err as Error).message);
  }
}
