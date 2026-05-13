"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const follower = followerRef.current;
    if (!cursor || !dot || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animateFollower = () => {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;

      followerX += dx * 0.12;
      followerY += dy * 0.12;

      follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      requestAnimationFrame(animateFollower);
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleLinkHover = () => {
      follower.style.width = "60px";
      follower.style.height = "60px";
      follower.style.borderColor = "rgba(0, 209, 178, 0.6)";
      follower.style.transform = `translate(${followerX - 30}px, ${followerY - 30}px)`;
    };

    const handleLinkLeave = () => {
      follower.style.width = "40px";
      follower.style.height = "40px";
      follower.style.borderColor = "rgba(0, 209, 178, 0.3)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    const animationId = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden lg:block"
      style={{ opacity: 0 }}
    >
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[10000] w-2 h-2 rounded-full bg-[#00D1B2] pointer-events-none"
        style={{ transition: "transform 0.1s ease" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-[rgba(0,209,178,0.3)] pointer-events-none"
        style={{
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </div>
  );
}
