"use client";

import { useEffect, useRef } from "react";

export default function MorphingBlobs() {
  const blob1Ref = useRef<SVGSVGElement>(null);
  const blob2Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate SVG path morphing with GSAP
    const animateBlob = async () => {
      const gsap = (await import("gsap")).default;

      const paths1 = [
        "M440,320Q430,430,320,450Q210,470,150,380Q90,290,130,190Q170,90,280,80Q390,70,430,170Q470,270,440,320Z",
        "M450,310Q440,420,330,440Q220,460,160,370Q100,280,140,180Q180,80,290,70Q400,60,440,160Q480,260,450,310Z",
        "M420,330Q400,440,290,460Q180,480,120,380Q60,280,110,180Q160,80,270,80Q380,80,420,180Q460,280,420,330Z",
        "M460,300Q450,420,340,440Q230,460,170,370Q110,280,140,170Q170,60,290,70Q410,80,450,180Q490,280,460,300Z",
      ];

      const paths2 = [
        "M400,300Q390,410,280,430Q170,450,120,350Q70,250,110,150Q150,50,270,60Q390,70,420,180Q450,290,400,300Z",
        "M430,310Q410,420,300,440Q190,460,130,360Q70,260,120,160Q170,60,280,70Q390,80,430,180Q470,280,430,310Z",
        "M410,320Q380,430,270,440Q160,450,110,350Q60,250,100,150Q140,50,260,60Q380,70,420,170Q460,270,410,320Z",
      ];

      if (blob1Ref.current) {
        const pathEl1 = blob1Ref.current.querySelector("path");
        if (pathEl1) {
          let idx1 = 0;
          setInterval(() => {
            idx1 = (idx1 + 1) % paths1.length;
            gsap.to(pathEl1, {
              attr: { d: paths1[idx1] },
              duration: 4,
              ease: "sine.inOut",
            });
          }, 4000);
        }
      }

      if (blob2Ref.current) {
        const pathEl2 = blob2Ref.current.querySelector("path");
        if (pathEl2) {
          let idx2 = 0;
          setInterval(() => {
            idx2 = (idx2 + 1) % paths2.length;
            gsap.to(pathEl2, {
              attr: { d: paths2[idx2] },
              duration: 5,
              ease: "sine.inOut",
            });
          }, 5000);
        }
      }
    };

    animateBlob();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blob 1 — top right */}
      <svg
        ref={blob1Ref}
        viewBox="0 0 500 500"
        className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.035]"
      >
        <path
          d="M440,320Q430,430,320,450Q210,470,150,380Q90,290,130,190Q170,90,280,80Q390,70,430,170Q470,270,440,320Z"
          fill="#00D1B2"
        />
      </svg>

      {/* Blob 2 — bottom left */}
      <svg
        ref={blob2Ref}
        viewBox="0 0 500 500"
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.03]"
      >
        <path
          d="M400,300Q390,410,280,430Q170,450,120,350Q70,250,110,150Q150,50,270,60Q390,70,420,180Q450,290,400,300Z"
          fill="#6FFFE9"
        />
      </svg>
    </div>
  );
}
