import Lottie from "lottie-react";
import peacockAnimation from "../assets/peaclock_animation_final.json";

const AnimatedPeaClock = () => {
  return (
    // <div
    //   onMouseMove={(e) => {
    //     const svg = e.currentTarget.querySelector("svg");
    //     if (!svg) return;

    //     const box = svg.getBoundingClientRect();
    //     const centerX = box.left + box.width / 2;
    //     const offset = ((e.clientX - centerX) / box.width) * 10;
    //     svg.style.setProperty("transform", `rotateY(${offset}deg)`);
    //   }}
    //   onMouseLeave={(e) => {
    //     const svg = e.currentTarget.querySelector("svg");
    //     svg?.style.setProperty("transform", `rotateY(0deg)`);
    //   }}
    //   style={{
    //     width: "180px",
    //     margin: "auto",
    //     cursor: "pointer",
    //   }}
    // >
    <Lottie
      animationData={peacockAnimation}
      loop
      autoplay
      style={{ width: "70px", height: "70px" }}
    />
    //</div>
  );
};

export default AnimatedPeaClock;
