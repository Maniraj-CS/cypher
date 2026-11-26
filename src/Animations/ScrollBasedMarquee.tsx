import React from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

interface IScrollBasedMarquee {
    speed: number
    className: string,
    reverse: boolean
}

const ScrollBasedMarquee : React.FC<IScrollBasedMarquee> = ({
  speed,
  className,
  reverse
}) => {




   const marqueeRef = React.useRef<HTMLDivElement>(null)
   const animationRef = React.useRef<gsap.core.Tween | null>(null)
   const lastScrollPos = React.useRef(0)
   const directionRef = React.useRef(1)


   React.useEffect(() => {

    if(!marqueeRef.current) return;

    gsap.set(marqueeRef.current, {xPercent: -50})

    const createAnimation = (dir = 1) => {
       animationRef.current?.kill()
       
       const effectiveDir = reverse ? -dir : dir;
       const xChange = effectiveDir > 0 ? "-=100" : "+=100"


       animationRef.current = gsap.to(marqueeRef.current,{
        xPercent: xChange,
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100,0),
        }
       })
    }
    
    createAnimation(directionRef.current)

    const handleScroll = () => {

        const currentScroll = window.scrollY;
        const scrollDiff = currentScroll - lastScrollPos.current;


        if(Math.abs(scrollDiff) > 5){
          if(scrollDiff < 0 && directionRef.current !== -1){
            directionRef.current = -1;
            createAnimation(-1);
          }else if(scrollDiff > 0 && directionRef.current !== 1){
            directionRef.current = 1;
            createAnimation(1)
          }
        }

        lastScrollPos.current = currentScroll;
    }

    window.addEventListener("scroll" , handleScroll , {passive: true});

    return () => {
      window.removeEventListener("scroll" , handleScroll)
      animationRef.current?.kill()
    }


   },[speed,reverse])



  return (
    <div className={`overflow-hidden w-full whitespace-nowrap ${className}`}>
      <div className="flex gap-8 w-fit" ref={marqueeRef}>
        {
          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((block) => (
            <div className='flex gap-8' key={block}>
                {
                  [...Array(3)].map((_ , i) => (
                    <h1 
                    key={`${block}-${i}`}
                    className="text-xl lg:text-2xl leading-none font-[Minecraft]">
                      <span className='inline-block mt-2 mx-3'>TRENDING</span>
                      <span className='inline-block mt-2 mx-3'>CONFIDENTIAL</span>
                        <span className='inline-block mt-2 mx-3'>CREATIVITY</span>
                      
                    </h1>
                  )) 
                }
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default ScrollBasedMarquee
