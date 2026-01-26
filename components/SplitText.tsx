import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  delay?: number;
  threshold?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  tag: Tag = 'div',
  delay = 0,
  threshold = 0.1
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // 1. Split text into chars/words/lines
    const text = new SplitType(elementRef.current, {
      types: 'lines, words, chars',
      tagName: 'span'
    });

    // 2. Initial styles for heavy, cinematic reveal
    // Using will-change to hint the browser for optimization
    gsap.set(text.lines, { overflow: 'hidden' });
    gsap.set(text.chars, { 
      yPercent: 130, 
      opacity: 0,
      rotateZ: 2, // Slight rotation for texture, settling to 0
      transformOrigin: '0% 100%',
      willChange: 'transform, opacity'
    });

    // 3. Animation with physical weight
    const ctx = gsap.context(() => {
      gsap.to(text.chars, {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.8, // Slower duration for perceived weight
        stagger: { amount: 0.5, from: "start" }, // Flowing stagger
        delay: delay,
        ease: "power4.out", // Strong deceleration
        scrollTrigger: {
          trigger: elementRef.current,
          start: `top ${100 - (threshold * 100)}%`, 
          toggleActions: "play none none reverse"
        }
      });
    }, elementRef);

    return () => {
      ctx.revert();
      text.revert();
    };
  }, [children, delay, threshold]);

  return (
    <Tag ref={elementRef} className={className}>
      {children}
    </Tag>
  );
};

export default React.memo(SplitText);