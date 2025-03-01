import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import LoginButton from '@/components/login/button/LoginButton';
import { onBoardingSlides } from '@/constants/onboarding';

export default function OnBoardingPage() {
  return (
    <div className="flex flex-col justify-between w-full h-screen px-7 relative">
      <div className="flex-1 flex items-center">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {onBoardingSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="h-full flex flex-col items-center text-center">
                <span className="text-h1 whitespace-pre-line mt-[160px] mb-[20px]">
                  {slide.title}
                </span>

                <span className="text-title-medium whitespace-pre-line mb-[50px]">
                  {slide.subtitle}
                </span>
                <img src={slide.image} className="w-[310px] mb-14" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-16">
        <LoginButton />
      </div>
    </div>
  );
}
