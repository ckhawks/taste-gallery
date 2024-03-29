import Head from "next/head";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.scss";
import { GetBucketObjects } from "../util/GetBucketObjects";
import { GetBucketObjectURL } from "../util/GetBucketObjectURL";
import Gallery from "./Gallery";
import ButtonBack from "../components/ButtonBack";
import ButtonToTop from "../components/ButtonToTop";
import ButtonRefresh from "../components/ButtonRefresh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faArrowDownShortWide,
  faArrowLeft,
  faArrowRight,
  faCircle,
  faShuffle,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareFull } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import ColumnGallery from "./ColumnGallery";
import WidthForceColumn from "../components/WidthForceColumn";

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
  let ordering = props.ordering || "random";
  let view = props.view || "grid";
  let page = Number(props.page) || 1;

  if (ordering !== "random" && ordering !== "inorder") {
    ordering = "random";
    page = 1;
  }

  if (view !== "grid" && view !== "column") {
    view = "grid";
  }

  const ITEMS_TO_SHOW = 40;

  const imageObjects = await GetBucketObjects(props.category.bucket_prefix);
  console.log("imageObjects", imageObjects.length);
  let imageFilenames = [];
  imageObjects.map((object) => {
    imageFilenames.push(GetBucketObjectURL(object.Key));
  });
  if (ordering === "random") {
    shuffle(imageFilenames);
  }

  if (imageFilenames.length > ITEMS_TO_SHOW)
    imageFilenames = imageFilenames.slice(
      (page - 1) * ITEMS_TO_SHOW,
      page * ITEMS_TO_SHOW
    );
  // console.log("imageFilenames", imageFilenames);

  return (
    <div className={styles.body}>
      <WidthForceColumn
        categoryKey={props.category.key}
        ordering={ordering}
        page={page}
        view={view}
      />
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
            <div className={styles["controls-section"]}>
              <div className={styles["controls-group"]}>
                <div className={styles["controls-label"]}>Order</div>
                <div className={styles["controls-buttons"]}>
                  <Link
                    href={
                      "/" + props.category.key + "/" + "random" + "/" + view
                    }
                    className={`${styles["control-button"]} ${
                      ordering === "random" ? styles.active : ""
                    }`}
                    replace
                  >
                    <FontAwesomeIcon icon={faShuffle} /> Random
                    {ordering === "random" && (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={styles["circle"]}
                      />
                    )}
                  </Link>
                  <Link
                    href={
                      "/" + props.category.key + "/" + "inorder" + "/" + view
                    }
                    className={`${styles["control-button"]} ${
                      ordering === "inorder" ? styles.active : ""
                    }`}
                    replace
                  >
                    <FontAwesomeIcon icon={faArrowDownShortWide} /> In Order
                    {ordering === "inorder" && (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={styles["circle"]}
                      />
                    )}
                  </Link>
                </div>
              </div>
              <div
                className={`${styles["controls-group"]} ${styles["controls-view"]}`}
              >
                <div className={styles["controls-label"]}>View</div>
                <div className={styles["controls-buttons"]}>
                  <Link
                    href={
                      "/" +
                      props.category.key +
                      "/" +
                      ordering +
                      "/" +
                      "grid" +
                      "/" +
                      page
                    }
                    className={`${styles["control-button"]} ${
                      view === "grid" ? styles.active : ""
                    }`}
                    replace
                  >
                    <FontAwesomeIcon icon={faTableCells} /> Grid
                    {view === "grid" && (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={styles["circle"]}
                      />
                    )}
                  </Link>
                  <Link
                    href={
                      "/" +
                      props.category.key +
                      "/" +
                      ordering +
                      "/" +
                      "column" +
                      "/" +
                      page
                    }
                    className={`${styles["control-button"]} ${
                      view === "column" ? styles.active : ""
                    }`}
                    replace
                  >
                    <FontAwesomeIcon icon={faAlignJustify} /> Column
                    {view === "column" && (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={styles["circle"]}
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
            <div className={`${styles.description} ${styles["row-separate"]}`}>
              {ordering === "random" && (
                <>
                  <div>
                    Displaying 40 random items of {imageObjects.length} total
                  </div>
                </>
              )}
              {ordering === "inorder" && (
                <>
                  <div>
                    Displaying items {(page - 1) * ITEMS_TO_SHOW + 1} -{" "}
                    {page * ITEMS_TO_SHOW < imageObjects.length
                      ? page * ITEMS_TO_SHOW
                      : imageObjects.length}{" "}
                    of {imageObjects.length} total
                  </div>

                  <div className={styles["pagination-group"]}>
                    {page > 1 && (
                      <Link
                        className={styles["pagination-button"]}
                        href={
                          "/" +
                          props.category.key +
                          "/" +
                          ordering +
                          "/" +
                          view +
                          "/" +
                          (page - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </Link>
                    )}
                    <div className={styles["pagination-indicator"]}>
                      Page {page} of{" "}
                      {Math.round(imageObjects.length / ITEMS_TO_SHOW)}
                    </div>
                    {imageObjects.length > ITEMS_TO_SHOW * page && (
                      <Link
                        className={styles["pagination-button"]}
                        href={
                          "/" +
                          props.category.key +
                          "/" +
                          ordering +
                          "/" +
                          view +
                          "/" +
                          (page + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            {view === "grid" ? (
              <Gallery images={imageFilenames} />
            ) : (
              <ColumnGallery images={imageFilenames} />
            )}
            <div className={styles["pagination-bottom"]}>
              {ordering === "inorder" && (
                <>
                  <div className={styles["pagination-group"]}>
                    {page > 1 && (
                      <Link
                        className={styles["pagination-button"]}
                        href={
                          "/" +
                          props.category.key +
                          "/" +
                          ordering +
                          "/" +
                          view +
                          "/" +
                          (page - 1)
                        }
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </Link>
                    )}
                    <div className={styles["pagination-indicator"]}>
                      Page {page} of{" "}
                      {Math.round(imageObjects.length / ITEMS_TO_SHOW)}
                    </div>
                    {imageObjects.length > ITEMS_TO_SHOW * page && (
                      <Link
                        className={styles["pagination-button"]}
                        href={
                          "/" +
                          props.category.key +
                          "/" +
                          ordering +
                          "/" +
                          view +
                          "/" +
                          (page + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
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
