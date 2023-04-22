import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./CustomSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProduct } from "../../models/IProduct";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

interface ISwiperProps {
  data: Array<IProduct>;
  handleSelectProduct: (product: IProduct) => void;
}

const CustomSwiper = ({ data, handleSelectProduct }: ISwiperProps) => {
  return (
    <Swiper
      style={{
        //@ts-ignore
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true, type: "progressbar" }}
      scrollbar={{ draggable: true }}
      navigation
      className={styles.swiper}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: { enabled: false },
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
          navigation: { enabled: true },
        },
        1750: {
          slidesPerView: 3,
          spaceBetween: 40,
          navigation: { enabled: true },
        },
      }}
    >
      {data?.map((child, index) => (
        <SwiperSlide
          className={styles.slider__container}
          key={index}
          color="#fff"
        >
          <div key={child.id} className={styles.image_container}>
            <img src={child?.image} alt={child?.title} />
          </div>
          <div className={styles.btn__container}>
            <button
              onClick={() => handleSelectProduct(child)}
              className={styles.choose_item}
            >
              Choose item
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
