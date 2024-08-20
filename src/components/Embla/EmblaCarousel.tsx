import styles from "./Embla.module.css";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { images } from "../imageSlides/images";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      speed: 1
      // startDelay: 300
    })
  ]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map(({ src, alt }, index) => (
            <div className={styles.embla__slide} key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.embla__slide__img} src={src} alt={alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
