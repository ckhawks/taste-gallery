"use client";

import { useContext, useEffect, useState } from "react";
import { GetBucketObjectURL } from "../util/GetBucketObjectURL";
import { HoverContext } from "./HoverProvider";
import ImageDisplay from "./ImageDisplay";
import styles from "./page.module.css";

const CLIENT_ID = getRandomInt(10000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const PreviewSidebar = (props) => {
  const { hoveredCategory, _setHoveredCategory } = useContext(HoverContext);

  const [category, setCategory] = useState("photog");

  const [previewedItems, setPreviewedItems] = useState([]);

  useEffect(() => {
    console.log(`detected hoveredCategory change to ${hoveredCategory}`);
    setCategory(hoveredCategory);
  }, [hoveredCategory]);

  useEffect(() => {
    console.log(`category1 ${category}`);
    const runMe = async () => {
      console.log(`category2 ${category}`);
      const randomItemsRequest = await fetch(
        `/api/objects/preview?prefix=${category}&client=${CLIENT_ID}`
      );
      const randomItemsJson = await randomItemsRequest.json();
      const randomItems = randomItemsJson.items;
      console.log("category3");
      const imageFilenames = [];
      randomItems.map((item) => {
        imageFilenames.push(GetBucketObjectURL(item.Key));
      });
      await setPreviewedItems(imageFilenames);
      console.log(imageFilenames);
    };

    const result = runMe();
  }, [category]);

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
