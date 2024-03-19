"use client";

import { useContext, useEffect, useState } from "react";
import { GetBucketObjectURL } from "../util/GetBucketObjectURL";
import { HoverContext } from "./HoverProvider";
import ImageDisplay from "./ImageDisplay";
import styles from "./page.module.scss";

import useSWR from "swr";

// used by the useSWR hook
const fetchPreviewObjectsByPrefix = async (url, prefix) => {
  if (prefix === undefined) return;

  return await fetch(`${url}?prefix=${prefix}`, {
    method: "GET",
    // body: JSON.stringify({
    //   userId: userSelected?.userId,
    // }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const PreviewSidebar = (props) => {
  const { hoveredCategory, _setHoveredCategory } = useContext(HoverContext);

  const [category, setCategory] = useState(null);

  const [previewedItems, setPreviewedItems] = useState([]);

  // fetch the images
  const { data, error, mutate, isLoading } = useSWR(
    [`/api/objects/preview`, category],
    ([url, category]) => fetchPreviewObjectsByPrefix(url, category),
    {
      // do not revalidate stuff because we don't want it to refetch
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // to change our local state category when the ContextProvider's hoveredCategory state changes
  useEffect(() => {
    setCategory(hoveredCategory);
  }, [hoveredCategory]);

  // useEffect to update `imageFilenames` when swr's `data` changes
  useEffect(() => {
    if (data === undefined) return;

    const updateImageFilenames = async () => {
      const items = data.items;

      const imageFilenames = [];
      items.map((item) => {
        imageFilenames.push(GetBucketObjectURL(item.Key));
      });

      await setPreviewedItems(imageFilenames);
    };

    updateImageFilenames();
  }, [data]);

  // used to test css without hover
  const sampleImages = [
    "https://taste-images.stlr.cx/photog/307463589_657615019119019_3267275799103054314_n.jpg",
    "https://taste-images.stlr.cx/photog/80435898_817852755345830_5962870579057920201_n.jpg",
    "https://taste-images.stlr.cx/photog/296600608_460350815648513_1874006103390979841_n.jpg",
  ];

  return (
    <div className={styles.previewSidebar}>
      {!!category &&
        !!previewedItems &&
        previewedItems.map((image) => {
          return <ImageDisplay image={image} key={image} overlay={false} />;
        })}

      {/* {sampleImages.map((image) => {
        return <ImageDisplay image={image} key={image} overlay={false} />;
      })} */}
    </div>
  );
};

export default PreviewSidebar;
