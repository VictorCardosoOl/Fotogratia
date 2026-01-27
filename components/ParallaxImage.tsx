import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // 1 = normal, >1 faster, <1 slower (parallax)
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = "aspect-[3/4]",
  speed = 0.5 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imgRef.current) return;

    // A imagem precisa ser maior que o container para o parallax funcionar sem cortar
    // Calculamos o movimento baseado na altura
    gsap.fromTo(imgRef.current, 
      {
        yPercent: -15
      },
      {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // quando o topo do container entra na parte de baixo da tela
          end: "bottom top",   // quando o fundo do container sai da parte de cima da tela
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full bg-muted ${containerClassName}`}>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full h-[130%] -top-[15%] object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default ParallaxImage;