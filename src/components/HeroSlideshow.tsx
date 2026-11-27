"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/slides/slide1.jpg",
    alt: "Happy Indian students smiling together in school uniform",
  },
  {
    src: "/slides/slide2.jpg",
    alt: "College students studying together and reviewing coursework",
  },
  {
    src: "/slides/slide3.jpg",
    alt: "Graduates celebrating by tossing graduation caps into the sky",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-container aspect-square">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`slideshow-slide ${index === current ? "active" : ""}`}
            style={{
              opacity: index === current ? 1 : 0,
              transform: index === current ? "scale(1)" : "scale(1.05)",
              transition: "opacity 0.8s ease-in-out, transform 1.2s ease-out",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="slideshow-img"
            />
          </div>
        ))}

        {/* Gradient overlay for contrast */}
        <div className="slideshow-overlay" />

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="slideshow-nav-btn prev"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="slideshow-nav-btn next"
        >
          ›
        </button>

        {/* Dots */}
        <div className="slideshow-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`slideshow-dot ${i === current ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
