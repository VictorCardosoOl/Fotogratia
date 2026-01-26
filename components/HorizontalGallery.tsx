import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHOTOS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Filter portrait images for better horizontal flow
    const galleryPhotos = PHOTOS.slice(0, 6);

    useGSAP(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        // Force a refresh to ensure start/end points are calculated correctly 
        // especially after DOM shifts or lazy loading.
        ScrollTrigger.refresh();

        const totalWidth = sectionRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xMovement = -(totalWidth - viewportWidth);

        const anim = gsap.fromTo(sectionRef.current, 
            { x: 0 },
            {
                x: xMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${totalWidth}`, 
                    pin: true,
                    scrub: 1, 
                    invalidateOnRefresh: true,
                }
            }
        );

        // Additional safety for first load calculation
        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
        return () => clearTimeout(timer);

    }, { scope: triggerRef, dependencies: [] }); // Explicit dependencies

    return (
        <div ref={triggerRef} className="overflow-hidden bg-background relative">
             {/* Title overlay */}
            <div className="absolute top-10 left-10 md:left-20 z-20 pointer-events-none mix-blend-difference">
                <span className="text-secondary text-xs tracking-[0.3em] uppercase block mb-2">Continuum</span>
                <h3 className="text-4xl font-serif italic text-white">Visual Flow</h3>
            </div>

            <div 
                ref={sectionRef} 
                className="flex items-center h-screen w-fit px-[10vw] gap-[5vw] will-change-transform"
            >
                {galleryPhotos.map((photo, index) => (
                    <div 
                        key={photo.id} 
                        className={`relative flex-shrink-0 group overflow-hidden ${
                            index % 2 === 0 ? 'w-[40vh] h-[50vh] mt-20' : 'w-[50vh] h-[65vh] mb-20'
                        }`}
                    >
                        <img 
                            src={photo.url} 
                            alt={photo.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-primary/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <p className="text-white font-serif italic text-lg">{photo.title}</p>
                        </div>
                    </div>
                ))}
                
                {/* Final spacer with CTA */}
                <div className="w-[30vw] h-[50vh] flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                        <p className="text-secondary text-sm mb-4">Explore Full Archive</p>
                        <div className="h-px w-20 bg-accent mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalGallery;