import React from "react";
import AnimatedTextGSAP from "./AnimatedTextGSAP";
const Description = () => {
  const text = `
  Travel isn't just about ticking off destinations or capturing moments—it's about forging connections 
  that transcend borders and cultures. It doesn't change who we are, but it enriches our understanding of the world, 
  deepening our perspective. Those who embrace the beauty of both the familiar and the unknown discover a journey 
  far greater than the miles they travel.`;

  return (
    <div className="w-full py-24 px-4 bg-white text-gray-800">
      <AnimatedTextGSAP text={text} />
    </div>
  );
};

export default Description;
