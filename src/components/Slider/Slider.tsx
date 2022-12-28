import "./Slider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import girl2 from "../../images/girl_2.jpg";
import girl3 from "../../images/girl_3.jpg";
import man1 from "../../images/man_1.jpg";
import { useEffect, useState } from "react";

type Props = {};

const slides: Array<string> = [girl2, girl3, man1];

const Slider = (props: Props) => {
  const [slide, setSlide] = useState<number>(0);

  const prevSlide = () => {
    setSlide(slide === 0 ? 2 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setSlide(slide === 2 ? 0 : (prev) => prev + 1);
  };

  // Auto slider every 3 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  return (
    <div className="slider">
      <div
        className="container"
        style={{
          transitionDuration: "1000ms",
          transform: `translateX(-${slide * 100}vw)`,
        }}
      >
        <img src={slides[0]} alt="" />
        <img src={slides[1]} alt="" />
        <img src={slides[2]} alt="" />
      </div>
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
