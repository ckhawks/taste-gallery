import { useEffect, useState } from "react";
import styles from "./ImageDisplay.module.css";

const ImageDisplay = (props) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [showingOverlay, setShowingOverlay] = useState(false);
  const [overlayOpacitied, setOverlayOpacitied] = useState(false);
  const [imageOpacitied, setImageOpacitied] = useState(false);

  useEffect(() => {
    overlayOpen && (document.body.style.overflow = "hidden");
    !overlayOpen && (document.body.style.overflow = "unset");
  }, [overlayOpen]);

  useEffect(() => {
    if (overlayOpen) {
      setShowingOverlay(true);
      setTimeout(() => {
        setOverlayOpacitied(true);
        setImageOpacitied(true);
        setTimeout(() => {}, 0);
      }, 30);
    } else {
      setTimeout(() => {
        setOverlayOpacitied(false);
        setTimeout(() => {
          setImageOpacitied(false);
          setShowingOverlay(false);
        }, 200);
      }, 10);

      // setShowingOverlay(false);
    }
  }, [overlayOpen]);

  return (
    <div className={styles["image-display"]}>
      <img
        loading="lazy"
        width={350}
        className={styles["gallery-image"]}
        alt={"alt"}
        // src={`/gallery1/${props.image}`}
        src={`${props.image}`}
        key={props.image}
        onClick={() => {
          setOverlayOpen(!overlayOpen);
        }}
      />
      {showingOverlay && (
        <div
          className={`${styles["overlay"]} ${
            overlayOpacitied ? styles["opacity-1"] : ""
          }`}
          onClick={() => {
            setOverlayOpen(!overlayOpen);
          }}
        >
          <img
            className={`${styles["overlay-image"]} ${
              imageOpacitied ? styles["opacity-1"] : ""
            }`}
            // width={350}
            alt={"alt"}
            // src={`/gallery1/${props.image}`}
            src={`${props.image}`}
          />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
