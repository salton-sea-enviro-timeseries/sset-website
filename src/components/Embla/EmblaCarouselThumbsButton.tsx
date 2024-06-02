import React from "react";
import styles from "./Embla.module.css";
type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props;

  return (
    <div
      className={`${styles["embla-thumbs__slide"]} ${
        selected ? styles["embla-thumbs__slide--selected"] : ""
      }`}
      //   className={'embla-thumbs__slide'.concat(
      //     selected ? ' embla-thumbs__slide--selected' : ''
      //   )}
    >
      <button
        onClick={onClick}
        type="button"
        className={styles["embla-thumbs__slide__number"]}
      >
        {index + 1}
      </button>
    </div>
  );
};
