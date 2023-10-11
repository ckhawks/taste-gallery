"use client";

import { useContext, useEffect, useState } from "react";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.css";
import Link from "next/link";
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
import { HoverContext } from "./HoverProvider";

const categoryIcons = {
  photography: faCameraRetro,
  battlestation: faComputer,
  uxdesign: faObjectGroup,
  graphicdesign: faPenRuler,
  scifiart: faMeteor,
  minecraft: faHammer,
  artdesign: faMarker,
};

const CategoryLink = (props) => {
  const { hoveredCategory, setHoveredCategory } = useContext(HoverContext);

  const category = props.category;

  const [hover, setHover] = useState(false);

  useEffect(() => {
    console.log(`${category.prefix}: ${hover}`);
    setHoveredCategory(hover ? category.prefix : null);
  }, [hover]);

  return (
    <Link
      className={styles.categoryLink}
      href={`/${category.slug}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <FontAwesomeIcon icon={categoryIcons[category.slug]} />
      <div className={styles.categoryLabels}>
        <span className={styles.categoryTitle}>{category.title}</span>
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
};

export default CategoryLink;
