import Head from "next/head";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.css";
import { GetBucketObjects } from "../util/GetBucketObjects";
import { GetBucketObjectURL } from "../util/GetBucketObjectURL";
import Gallery from "./Gallery";
import ButtonBack from "../components/ButtonBack";
import ButtonToTop from "../components/ButtonToTop";
import ButtonRefresh from "../components/ButtonRefresh";

// from https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const S3GalleryPage = async (props) => {
  const ITEMS_TO_SHOW = 40;

  const imageObjects = await GetBucketObjects(props.category.bucket_prefix);
  // console.log("imageObjects", imageObjects.length);
  let imageFilenames = [];
  imageObjects.map((object) => {
    imageFilenames.push(GetBucketObjectURL(object.Key));
  });
  shuffle(imageFilenames);
  if (imageFilenames.length > ITEMS_TO_SHOW)
    imageFilenames = imageFilenames.slice(0, ITEMS_TO_SHOW);
  // console.log("imageFilenames", imageFilenames);

  return (
    <div className={styles.body}>
      <div className={styles.all}>
        <div className={styles.container}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Inter"
              rel="stylesheet"
            />
          </Head>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ButtonBack to="/" text="Back" />
            <div className={styles.row}>
              <Title Name={props.category.title} Title={""} />
              <ButtonRefresh slug={props.category.slug} />
            </div>
            <p className={styles.description}>Displaying 40 random items</p>

            <Gallery images={imageFilenames} />
            <ButtonToTop />
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = ({ Name, Title }) => {
  return (
    <h1 className={styles.title}>
      {Name} {Title}
    </h1>
  );
};

export default S3GalleryPage;
