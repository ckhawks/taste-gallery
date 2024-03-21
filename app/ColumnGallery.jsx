"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import ImageDisplayFullWidth from "./ImageDisplayFullWidth";
import styles from "./page.module.scss";
import ImageDisplayStyles from "./ImageDisplayFullWidth.module.scss";

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

const scrollToCursor = (images, cursor) => {
  const imageElements = document.getElementsByClassName(
    ImageDisplayStyles["gallery-image"]
  );
  if (imageElements.length == images.length) {
    const elementToScrollTo = imageElements[cursor];
    elementToScrollTo.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
};

const ColumnGallery = ({ images }) => {
  const rightPress = useKeyPress("ArrowRight");
  const leftPress = useKeyPress("ArrowLeft");
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (images.length && rightPress) {
      let newCursorValue = cursor < images.length - 1 ? cursor + 1 : cursor;
      setCursor(newCursorValue);
      scrollToCursor(images, newCursorValue);
    }
  }, [rightPress]);
  useEffect(() => {
    if (images.length && leftPress) {
      let newCursorValue = cursor > 0 ? cursor - 1 : cursor;
      setCursor(newCursorValue);
      scrollToCursor(images, newCursorValue);
    }
  }, [leftPress]);

  return (
    <>
      <div className={styles.gallery}>
        <Masonry
          breakpointCols={{
            default: 1,
            500: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image) => (
            <ImageDisplayFullWidth image={image} key={image} overlay />
            // <img width={350} alt={"alt"} src={`/gallery1/${el}`} key={el} />
            // <img
            //   width={400}
            //   alt={"alt"}
            //   src={`../../../organizing/photog/${el}`}
            //   key={el}
            // />
            // phase 1: add the animate-out class to body
            //   use setTimeout() to wait until element is added before you add class
            // phase 2: add to not display to whats there
            // phase 3: add element to the dom with the appropriate incoming
            // phase 4: add class to bring it in the right way
            // prevent backdrop scroll: https://stackoverflow.com/a/58290739

            // add fullscreen element, setTimeout() delay
            // add class to animate opacity to cover background and become backdrop, setTimeout() delay
            // add image in, setTimeout() delay, add class to animate image in
            //
          ))}
        </Masonry>
      </div>
      <style jsx global>
        {`
          .gallery {
            margin: auto;
            max-width: 1210px;
          }
          .my-masonry-grid {
            display: -webkit-box; /* Not needed if autoprefixing */
            display: -ms-flexbox; /* Not needed if autoprefixing */
            display: flex;
            margin-left: -50px; /* gutter size offset */
            width: auto;
          }
          .my-masonry-grid_column {
            padding-left: 50px; /* gutter size */
            background-clip: padding-box;
          }

          /* Style your items */
          .my-masonry-grid_column > img {
            /* change div to reference your elements you put in <Masonry> */
          }
          @media screen and (max-width: 1280px) {
            .my-masonry-grid {
              margin-left: 0px;
            }

            .my-masonry-grid_column {
              padding-left: 0px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ColumnGallery;
