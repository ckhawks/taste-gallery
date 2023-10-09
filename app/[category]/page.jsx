import { CATEGORY_MAPPING } from "../../util/GetCategories";
import S3GalleryPage from "../S3GalleryPage";

export async function generateMetadata({ params, searchParams }, parent) {
  // // read route params
  // const id = params.id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  if (!(params.category in CATEGORY_MAPPING)) {
    return { title: "404 — stlr.cx" };
  }

  return { title: `${CATEGORY_MAPPING[params.category].title} — stlr.cx` };
}

const GalleryCategoryPage = ({ params }) => {
  if (!(params.category in CATEGORY_MAPPING)) {
    return (
      <div>
        404: <b>{params.category}</b> is not a valid category.
      </div>
    );
  }

  return <S3GalleryPage category={CATEGORY_MAPPING[params.category]} />;
};

export default GalleryCategoryPage;
