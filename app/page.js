import Head from "next/head";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.css";
import Link from "next/link";
import { getCategories } from "../util/GetCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCameraRetro,
  faComputer,
  faHammer,
  faMarker,
  faMeteor,
  faObjectGroup,
  faPenRuler,
} from "@fortawesome/free-solid-svg-icons";

const categories = await getCategories();

const categoryIcons = {
  photography: faCameraRetro,
  battlestation: faComputer,
  uxdesign: faObjectGroup,
  graphicdesign: faPenRuler,
  scifiart: faMeteor,
  minecraft: faHammer,
  artdesign: faMarker,
};

// using process.cwd() to get the path
// fs.readdir to get all files in directory
const GalleryListingPage = async () => {
  return (
    <div className={styles.body}>
      <div className={styles.all}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Inter"
            rel="stylesheet"
          />
        </Head>
        <div className={styles.container}>
          {/* <div style={{ margin: "0px 20px" }}> */}
          <Title Name="Taste" Title={""} />
          <p className={styles.description}>
            My personal collection of inspirational media. I do not own anything
            in this section of the site. I share this in hope to help inspire.
          </p>
          <div className={styles.categoryList}>
            {categories &&
              categories.map((category) => {
                console.log(category);
                return (
                  <Link
                    className={styles.categoryLink}
                    href={`/${category.slug}`}
                    key={category.slug}
                  >
                    <FontAwesomeIcon icon={categoryIcons[category.slug]} />
                    <div className={styles.categoryLabels}>
                      <span className={styles.categoryTitle}>
                        {category.title}
                      </span>
                      <span className={styles.categoryShortDescription}>
                        {category.shortDescription}
                      </span>
                    </div>

                    <div className={styles.categoryEnd}>
                      <span className={styles.categoryPopulation}>
                        {category.count} items
                      </span>
                      <span className={styles.categoryCTA}>
                        Enter <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            {/* </div> */}
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

export default GalleryListingPage;
