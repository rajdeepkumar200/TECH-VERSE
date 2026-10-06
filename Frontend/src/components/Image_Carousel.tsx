import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ClassNames from "embla-carousel-class-names";
import DOMPurify from "dompurify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface GalleryItem {
  _id: string;
  name: string;
  img_url: string;
  description?: string;
  date?: string;
  category: string;
}

export default function ImageCarousel({
  galleryItems,
}: {
  galleryItems: GalleryItem[];
}) {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, slidesToScroll: 1 },
    [autoplay, WheelGesturesPlugin(), ClassNames({ snapped: "is-snapped" })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      autoplay.stop();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      autoplay.stop();
    }
  }, [emblaApi]);

  const getOptimizedCloudinaryUrl = (
    url: string,
    width = 800
  ) => {
    if (!url.includes("/upload/")) return url;
  
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,w_${width}/`
    );
  };
  

  useEffect(() => {
    if (!emblaApi) return;

    let resumeTimeout: NodeJS.Timeout;

    const handleUserInteraction = () => {
      autoplay.stop();
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => autoplay.play(), 5000);
    };

    emblaApi.on("pointerDown", handleUserInteraction);
    emblaApi.on("scroll", handleUserInteraction);
    emblaApi.on("select", handleUserInteraction);

    return () => {
      emblaApi.off("pointerDown", handleUserInteraction);
      emblaApi.off("scroll", handleUserInteraction);
      emblaApi.off("select", handleUserInteraction);
      clearTimeout(resumeTimeout);
    };
  }, [emblaApi, autoplay]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      emblaApi.reInit();
    }
  }, [galleryItems, emblaApi]);

  const Description =
    galleryItems.find((item) => item.description)?.description || "";
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="embla">
      <div className="embla__viewport w-[90vw] sm:w-[90vw]" ref={emblaRef}>
        <div className="embla__container">
          {galleryItems.map((item) => (
            <div
              className="embla__slide relative shrink-0 grow-0 basis-full md:basis-1/3 flex items-center justify-center "
              key={item._id}
            >
              <div className="aspect-[3/2] w-full bg-gray-200 rounded-xl overflow-hidden">
              <LazyLoadImage
                className="embla__slide__img w-[100%] h-auto object-cover rounded-xl overflow-hidden"
                src={getOptimizedCloudinaryUrl(item.img_url)}
                srcSet={`
                  ${getOptimizedCloudinaryUrl(item.img_url, 400)} 400w,
                  ${getOptimizedCloudinaryUrl(item.img_url, 800)} 800w,
                  ${getOptimizedCloudinaryUrl(item.img_url, 1200)} 1200w
                `}
                placeholderSrc={getOptimizedCloudinaryUrl(item.img_url, 20)}
                sizes="(max-width: 768px) 100vw, 33vw"
                alt={item.name}
                effect="blur"
              />
            </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-4 ">
        <button
          className="embla__prev border rounded-full bg-gradient-to-br from-[#252D6F] to-[#4676E6] text-white w-10 h-10 flex items-center justify-center"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </button>
        <button
          className="embla__next border rounded-full bg-gradient-to-br from-[#252D6F] to-[#4676E6] text-white w-10 h-10 flex items-center justify-center"
          onClick={scrollNext}
        >
          <ChevronRight />
        </button>
      </div>
      {Description && (
        <div className="mt-3 text-justify text-black-200 text-sm md:text-base w-[65vw]">
          <p
            className={`${
              showFull ? "line-clamp-none" : "line-clamp-6 md:line-clamp-4"
            } whitespace-pre-line`}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(Description),
            }}
          ></p>
          <button
            className="mt-1 text-blue-400 hover:text-blue-300 underline"
            onClick={() => setShowFull((prev) => !prev)}
          >
            {showFull ? "Show less" : "Know more"}
          </button>
        </div>
      )}
    </div>
  );
}
