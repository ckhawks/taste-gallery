import Head from "next/head";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.css";
import { getCategories } from "../util/GetCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import CategoryList from "./CategoryList";
import PreviewSidebar from "./PreviewSidebar";

const categories = await getCategories();

// using process.cwd() to get the path
// fs.readdir to get all files in directory
const GalleryListingPage = async () => {
  return (
    <div className={`${styles.home} ${styles.body}`}>
      <div className={styles.all}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Inter"
            rel="stylesheet"
          />
        </Head>
        <div className={styles.container}>
          <div className={styles.row}>
            <div>
              <Title Name="Taste" Title={""} />
              <p className={styles.description}>
                My personal collection of{" "}
                <span className={styles.script}>inspirational</span> media. I do
                not own anything in this section of the site. I share this in
                hope to <span className={styles.script}>energize you</span>.{" "}
                <FontAwesomeIcon className={styles.icon} icon={faAsterisk} />
              </p>
              <CategoryList categories={categories} />
            </div>
            <PreviewSidebar />
            {/* <div style={{ margin: "0px 20px" }}> */}
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
