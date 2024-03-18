import { CATEGORY_MAPPING } from "../../util/GetCategories";
import S3GalleryPage from "../S3GalleryPage";

export async function generateMetadata({ params }, parent) {
  // // read route params
  // const id = params.id

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  if (!(params.category[0] in CATEGORY_MAPPING)) {
    return { title: "404 — stlr.cx" };
  }

  return { title: `${CATEGORY_MAPPING[params.category[0]].title} — stlr.cx` };
}

const GalleryCategoryPage = ({ params }) => {
  if (!(params.category[0] in CATEGORY_MAPPING)) {
    return (
      <div>
        404: <b>{params.category[0]}</b> is not a valid category.
      </div>
    );
  }

  return (
    <S3GalleryPage
      category={CATEGORY_MAPPING[params.category[0]]}
      ordering={params.category[1]}
      view={params.category[2]}
      page={params.category[3]}
    />
  );
};

export default GalleryCategoryPage;
