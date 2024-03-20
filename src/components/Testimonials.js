import { useEffect, useState } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Grid,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../pages/loading";

SwiperCore.use([Pagination, Navigation, EffectFade, Autoplay, Grid]);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_DB_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setTestimonials(data.user.testimonials); // Corrected typo
      } catch (error) {
        setError(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Always set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  const props = {
    loop: true,
    spaceBetween: 70,
    slidesPerView: 2,
    autoplay: {
      delay: 6000,
    },
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    breakpoints: {
      720: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 70,
      },
    },
  };

  return (
    <div className="section testimonials" id="section-testimonials">
      <div className="content">
        {/* title */}
        <div className="title">
          <div className="title_inner">Testimonials</div>
        </div>

        {/* testimonials items */}
        <div className="reviews-carousel">
          {isLoading ? (
            <Loading/>
          ) : error ? (
            <div className="error-message">Error: {error}</div>
          ) : (
            <Swiper {...props} className="swiper-container">
              <div className="swiper-wrapper">
                {testimonials.map((testimonial) => (
                  testimonial.enabled && (
                    <SwiperSlide key={testimonial._id} className="swiper-slide">
                    <div className="reviews-item content-box">
                      <div className="image">
                        <img src={testimonial?.image?.url} alt="" />
                      </div>
                      <div className="info">
                        <div className="name">{testimonial.name}</div>
                        <div className="company">{testimonial.position}</div>
                      </div>
                      <div className="text">
                        {testimonial.review}
                      </div>
                    </div>
                  </SwiperSlide>
                  )
                ))}
              </div>
            </Swiper>
          )}

          {/* navigation */}
          <div className="swiper-nav">
            <a className="prev swiper-button-prev fas fa-long-arrow-alt-left" />
            <a className="next swiper-button-next fas fa-long-arrow-alt-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
