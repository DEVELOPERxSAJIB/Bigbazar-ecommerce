import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBanner } from "../../../features/banner/bannerApiSlice";

const HomeSlider = () => {

  const disptach = useDispatch();
  const { banners } = useSelector((state) => state?.banner);

  useEffect(() => {
    disptach(getAllBanner());
  }, [disptach]);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 5000,
          }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners?.map((banner) => (
          <>
            <SwiperSlide key={banner?._id}>
              <a href={banner?.productLink}>
                <img
                  style={{
                    maxHeight: "500px",
                    width: "100vw",
                    objectFit: "cover",
                  }}
                  src={banner?.photo?.url}
                  alt=""
                />
              </a>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};

export default HomeSlider;
