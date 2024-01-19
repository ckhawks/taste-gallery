import Head from "next/head";
import React from "react";

import "inter-ui/inter.css";
import styles from "../page.module.css";
import { getPortfolioCategories } from "../../util/GetCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faSignature,
  faFeatherPointed,
} from "@fortawesome/free-solid-svg-icons";
import CategoryList from "../CategoryList";
import PreviewSidebar from "../PreviewSidebar";
import ButtonBack from "../../components/ButtonBack";
import ButtonSwap from "../../components/ButtonSwap";

const categories = await getPortfolioCategories();

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
          <div className={styles.rowColumns}>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: "1",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Title Name="Portfolio" Title={""} />
                <ButtonSwap to={"/"} text={"Switch to Taste"} />
              </div>

              <p className={styles.description}>
                A collection of my photography work. I hope you{" "}
                <span className={styles.script}>enjoy</span>.{" "}
                <FontAwesomeIcon className={styles.icon} icon={faAsterisk} />
              </p>
              <CategoryList categories={categories} />
              {/* <p className={styles.footer}>
                <FontAwesomeIcon
                  icon={faFeatherPointed}
                  style={{
                    marginRight: "8px",
                    height: "12px",
                    width: "12px",
                    color: "rgb(177, 177, 177)",
                  }}
                />
                stellaric
              </p> */}
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
