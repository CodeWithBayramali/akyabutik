'use client'
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function MainCarousel() {
  return (
    <Splide
      options={{
        autoplay: true,
        type: 'loop',
        rewind: true,
        pauseOnHover: true,
        resetProgress: true,
        speed:300,
        pagination:false,
        arrows:false
      }}
      hasTrack={true}
      aria-label="My Favorite Images"
    >
      <SplideSlide>
        <img src="https://media.womanmagazine.co.nz/wp-content/uploads/2022/10/Main-image-Make-clothes-last-forever-scaled-1.jpg?strip=all&lossy=1&quality=88&webp=85&sharp=1&ssl=1" className="w-full sm:h-[300px] md:h-[700px]" alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
        <img src="https://media.womanmagazine.co.nz/wp-content/uploads/2022/10/Main-image-Make-clothes-last-forever-scaled-1.jpg?strip=all&lossy=1&quality=88&webp=85&sharp=1&ssl=1" className="w-full sm:h-[300px] md:h-[700px]" alt="Image 1" />
      </SplideSlide>
    </Splide>
  );
}