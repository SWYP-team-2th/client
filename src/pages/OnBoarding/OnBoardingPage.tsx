import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import LoginButton from '@/components/login/button/LoginButton';
import { onBoardingSlides } from '@/constants/onboarding';

export default function OnBoardingPage() {
  return (
    <div className="flex flex-col justify-between w-full h-screen px-7 relative">
      <div className="flex-1 flex items-center min-h-0">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {onBoardingSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="h-full flex flex-col items-center text-center">
                <span className="text-h1 whitespace-pre-line mt-[120px] mb-[12px]">
                  {slide.title}
                </span>

                <span className="text-title-small whitespace-pre-line mb-[18px]">
                  {slide.subtitle}
                </span>
                <img src={slide.image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="py-6">
        <LoginButton />
      </div>
    </div>
  );
}
