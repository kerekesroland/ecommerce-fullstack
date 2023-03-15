import "./Slider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const slides: Array<string> = [
  require("/Users/roland/work/ecommerce/client/src/images/girl_2-min-02.jpg"),
  require("/Users/roland/work/ecommerce/client/src/images/girl_3-min-02.jpg"),
  require("/Users/roland/work/ecommerce/client/src/images/man_1-min-02.jpg"),
];

const Slider = () => {
  const [slide, setSlide] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const prevSlide = () => {
    setSlide(slide === 0 ? 2 : (prev) => prev - 1);
  };

  const nextSlide = useCallback(() => {
    setSlide(slide === 2 ? 0 : (prev) => prev + 1);
  }, [slide]);

  // Auto slider every 5 seconds if the image is in view
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [inView, nextSlide, slide]);

  return (
    <div className="slider" ref={ref}>
      <motion.div
        key={"slider"}
        className="container"
        initial={{ x: 0 }}
        transition={{
          duration: 0.6,
          type: "tween",
        }}
        animate={{
          x: `-${slide * 100}vw`,
        }}
      >
        <img src={slides[0]} alt="" />
        <img src={slides[1]} alt="" />
        <img src={slides[2]} alt="" />
      </motion.div>
      <div className="icons">
        <div className="icon">
          <ArrowBackIosIcon
            onClick={prevSlide}
            sx={{ fill: "#fff", fontSize: "5rem", marginLeft: "1rem" }}
          />
        </div>
        <div className="icon">
          <ArrowForwardIosIcon
            onClick={nextSlide}
            sx={{ fill: "#fff", fontSize: "5rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
