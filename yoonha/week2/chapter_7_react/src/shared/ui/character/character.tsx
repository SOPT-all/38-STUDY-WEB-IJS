import { useEffect, useRef } from "react";
import "./Character.css";

const Character = () => {
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLElement>(null);
  const leftPupilRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const updateEye = (
        eye: HTMLDivElement | null,
        pupil: HTMLElement | null,
      ) => {
        if (!eye || !pupil) return;
        const { left, top, width, height } = eye.getBoundingClientRect();
        const eyeCenterX = left + width / 2;
        const eyeCenterY = top + height / 2;
        const angle = Math.atan2(
          e.clientY - eyeCenterY,
          e.clientX - eyeCenterX,
        );

        const scaleFactor = 4;
        const maxDistance = eye.offsetWidth / scaleFactor;
        const distance = Math.min(
          maxDistance,
          Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY),
        );

        pupil.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
      };

      updateEye(rightEyeRef.current, rightPupilRef.current);
      updateEye(leftEyeRef.current, leftPupilRef.current);
    };

    addEventListener("mousemove", handleMouseMove);
    return () => removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="character">
      <div className="eye right" ref={rightEyeRef}>
        <i className="pupil" ref={rightPupilRef}></i>
      </div>
      <div className="eye left" ref={leftEyeRef}>
        <i className="pupil" ref={leftPupilRef}></i>
      </div>
      <div className="mouth"></div>
    </div>
  );
};

export default Character;
