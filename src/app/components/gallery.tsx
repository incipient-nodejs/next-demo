// import type { ImagesResults } from "@/models/images";
import fetchImages from "@/lib/fetchImages";
import ImgContainer from "./imgContainer";
import addBlurredDataUrls from "@/lib/base64";

type Props = {
  topic?: string | undefined;
};
export default async function Gallery({ topic }: Props) {
  const url = topic
    ? `https://api.pexels.com/v1/search?query=${topic}&per_page=${50}`
    : `https://api.pexels.com/v1/curated?per_page=${50}`;
  const images = await fetchImages(url);

  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images found</h2>;

    const photosWithBlur = await addBlurredDataUrls(images)
  return (
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {photosWithBlur.map((photo) => (
        <ImgContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}
