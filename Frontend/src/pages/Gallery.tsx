import { useEffect, useState } from "react";
import Category_navbar from "@/components/category_navbar";
import { Card } from "@/components/ui/card";
import { getGallery } from "@/services/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  useEffect(() => {
    getGallery()
      .then((data) => setGalleryItems(data))
      .catch((error) => console.error("Error fetching gallery items:", error));
  }, []);

  useEffect(() => {
    galleryItems.slice(0, 4).forEach(item => {
      const img = new Image();
      img.src = item.img_url;
    });
  }, [galleryItems]);
  
  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="relative pt-[4.75rem] pb-4 md:py-32 bg-gradient-to-br from-[#252D6F] to-[#4676E6] text-white overflow-hidden">
        {/* Animated floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-16 w-10 h-10 bg-[#4676E6]/70 rounded-full animate-bounce-slow blur-md"></div>
          <div className="absolute top-36 right-12 w-6 h-6 bg-[#FFD54F]/80 rounded-full animate-pulse blur-md"></div>
          <div className="absolute bottom-16 left-1/4 w-20 h-20 border-4 border-white/30 rounded-full animate-spin-slow"></div>
          <div className="absolute top-1/2 right-40 w-16 h-8 bg-[#B16FFF]/70 rounded-3xl animate-bounce-x blur-md"></div>
          <div className="absolute top-16 md:top-8 right-2 w-5 h-5 bg-[#F56060]/80 rounded-full animate-bounce"></div>
          <div className="absolute bottom-8 left-8 w-5 h-5 bg-[#36C2A3]/70 rounded-full animate-bounce"></div>
        </div>

        {/* Centered content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-4 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 shadow-sm mb-6 tracking-widest animate-fade-in">
            Highlights
          </span>
          <h1 className="text-6xl md:auto font-extrabold pb-3 mb-8 animate-fade-in-up bg-gradient-to-r from-[#FFD54F] via-white to-[#4676E6] bg-clip-text text-transparent drop-shadow-xl">
            Event Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Relive the{" "}
            <span className="font-semibold text-[#FFD54F]">
              excitement and innovation{" "}
            </span>
            of our previous{" "}
            <span className="font-semibold text-[#d746ffff]">Events</span>{" "}
            through our highlights.
          </p>
          <br />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-b from-blue-50 via-blue-100 to-gray-200 justify-center items-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug mb-6 justify-center text-center mx-auto items-center">
            Past Events
          </h2>
          <Category_navbar galleryItems={galleryItems} />
        </div>
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug mb-6 justify-center text-center mx-auto items-center">
            Upcoming Events
          </h2>
          <Card className="p-8 w-[80vw] max-w-2xl border-primary/20 flex justify-center items-center content-center mx-auto">
            <p className="text-gray-500 text-md md:text-xl font-medium">
              Events will be announced soon! 🚀
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
