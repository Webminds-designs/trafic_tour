import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedTextGSAP = ({ text = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!text) return; // Exit if text is empty

    // Select all .word elements inside containerRef
    const words = containerRef.current?.querySelectorAll(".word");

    if (!words || words.length === 0) return; // Prevent errors if no words are found

    // Set initial opacity
    gsap.set(words, { opacity: 0.2 });

    // Animate words as they scroll into view
    gsap.to(words, {
      opacity: 1,
      ease: "power1.out",
      stagger: 0.5, // Adjust delay between words
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
  }, [text]);

  return (
    <div ref={containerRef} className="p-8 bg-white text-gray-800">
      <p className="w-full text-left md:text-4xl text-xl leading-relaxed">
        {/* Split text by spaces to get words */}
        {text.split(" ").map((word, index) => (
          <span key={index} className="word inline-block mr-2">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};

export default AnimatedTextGSAP;
