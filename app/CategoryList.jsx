"use client";

import { useEffect, useState } from "react";
import React from "react";

import "inter-ui/inter.css";
import styles from "./page.module.css";

import CategoryLink from "./CategoryLink";

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  return (
    <div className={styles.categoryList}>
      {categories &&
        categories.map((category) => {
          console.log(category);
          return <CategoryLink category={category} key={category.slug} />;
        })}
    </div>
  );
};

export default CategoryList;
