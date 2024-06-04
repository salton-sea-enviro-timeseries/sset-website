import { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from "embla-carousel";
import styles from "./Embla.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "./EmblaCarouselArrowButtons";
import { Thumb } from "./EmblaCarouselThumbsButton";
import { Container } from "@material-ui/core";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  });
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );
  //   const tweenFactor = useRef(0);
  //   const tweenNodes = useRef<HTMLElement[]>([]);
  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi, setSelectedIndex]);

  //   const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //     useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  //   const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
  //     tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
  //       return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
  //     });
  //   }, []);

  //   const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
  //     tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  //   }, []);

  //   const tweenParallax = useCallback(
  //     (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
  //       const engine = emblaApi.internalEngine();
  //       const scrollProgress = emblaApi.scrollProgress();
  //       const slidesInView = emblaApi.slidesInView();
  //       const isScrollEvent = eventName === "scroll";

  //       emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
  //         let diffToTarget = scrollSnap - scrollProgress;
  //         const slidesInSnap = engine.slideRegistry[snapIndex];

  //         slidesInSnap.forEach((slideIndex) => {
  //           if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

  //           if (engine.options.loop) {
  //             engine.slideLooper.loopPoints.forEach((loopItem) => {
  //               const target = loopItem.target();

  //               if (slideIndex === loopItem.index && target !== 0) {
  //                 const sign = Math.sign(target);

  //                 if (sign === -1) {
  //                   diffToTarget = scrollSnap - (1 + scrollProgress);
  //                 }
  //                 if (sign === 1) {
  //                   diffToTarget = scrollSnap + (1 - scrollProgress);
  //                 }
  //               }
  //             });
  //           }

  //           const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
  //           const tweenNode = tweenNodes.current[slideIndex];
  //           //   console.log("TweenNode: ", tweenNode);
  //           //TODO: Fix parallax
  //           if (tweenNode) {
  //             tweenNode.style.transform = `translateX(${translate}%)`;
  //           }
  //         });
  //       });
  //     },
  //     []
  //   );

  //   useEffect(() => {
  //     if (!emblaApi) return;

  //     setTweenNodes(emblaApi);
  //     setTweenFactor(emblaApi);
  //     tweenParallax(emblaApi);

  //     emblaApi
  //       .on("reInit", setTweenNodes)
  //       .on("reInit", setTweenFactor)
  //       .on("reInit", tweenParallax)
  //       .on("scroll", tweenParallax)
  //       .on("slideFocus", tweenParallax);
  //   }, [emblaApi, tweenParallax]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();

    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const getDotClassName = (index: number): string => {
    const baseClass = styles.embla__dot;
    const selectedClass =
      index === selectedIndex ? styles["embla__dot--selected"] : "";
    return `${baseClass} ${selectedClass}`;
  };
  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__parallax}>
                <div className={styles.embla__parallax__layer}>
                  {/* eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    className={`${styles.embla__slide__img} ${styles.embla__parallax__img}`}
                    src={`https://picsum.photos/600/350?v=${index}`}
                    alt="Your alt text"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["embla-thumbs"]}>
        <div className={styles["embla-thumbs__viewport"]} ref={emblaThumbsRef}>
          <div className={styles["embla-thumbs__container"]}>
            {slides.map((index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={getDotClassName(index)}
              //   className={"embla__dot".concat(
              //     index === selectedIndex ? " embla__dot--selected" : ""
              //   )}
            />
          ))}
        </div>

      </div> */}
    </div>
  );
};

export default EmblaCarousel;
