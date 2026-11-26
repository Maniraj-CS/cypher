import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'

import ScrollBasedMarquee from "../Animations/ScrollBasedMarquee"
import DistortionImageEffect from "../effects/DistortionImageEffect"




gsap.registerPlugin(ScrollTrigger)

function Page2() {
  
    const containerRef = React.useRef<HTMLDivElement>(null);
    const timelineRef = React.useRef<HTMLDivElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const circleRef = React.useRef<(HTMLDivElement | null)[]>([]);
    const contentRef = React.useRef<(HTMLDivElement | null)[]>([]);


    useGSAP(() => {
        if(window.innerWidth < 1024) return;

        if (progressRef.current) gsap.to(progressRef.current, {
                height:"100%",
                ease:"power2.inOut",
                scrollTrigger:{
                    trigger: timelineRef.current,
                    start:"top center",
                    end:"bottom center",
                    scrub:0.5,
                }
            });


        circleRef.current.forEach((circle) => {
            const dot = circle?.querySelector('.circle-dot-gray') as HTMLDivElement;

            gsap.timeline({
                scrollTrigger: {
                    trigger: circle,
                    start: "top center+=100",
                    end: "bottom center",
                    scrub: 0.8,
                    toggleActions: "play none none reverse",
                }
            })
            .to(circle , {
                borderColor: "#9D2117",
                boxShadow:"0 0 24px 6px rgba(157, 33, 23, 0.6)",
                scale:1.15,
                duration: 0.6,
                ease: "power2.out",
            })
            .to(dot , {
                backgroundColor: "#9D2117",
                boxShadow:"0 0 24px 6px rgba(157, 33, 23, 0.6)",
                scale:1.4,
                duration: 0.3,
                ease: "back.out(2)",
            }, "-=0.2")
            .to(circle , {
                boxShadow:"0 0 12px 2px rgba(157, 33, 23, 0.4)",
                scale:1.08,
                duration: 0.4,
                ease: "power1.inOut",
            },"-=0.2")
        });

        contentRef.current.forEach((content) => {
            gsap.from(content, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: content,
                    start: "top center+=100",
                    toggleActions: "play none none reverse",
                }
            })
        })

        gsap.to(timelineRef.current, {

            scrollTrigger:{
                trigger: timelineRef.current ,
                start:"top center",
                end:"bottom center",
                scrub:1,
            },
            boxShadow:"0 0 40px 10px rgba(157, 33, 23, 0.3)",
            ease:"sine.inOut",
        })
    },{ scope: containerRef})

  return (
    <div 
    className='font-[Minecraft] w-full relative overflow-hidden'
    >
      <div className='w-full absolute top-6 left-0 scale-[105%] bg-[#9D2117] rotate-2 py-4 z-10'>
         <ScrollBasedMarquee speed={300} className={""} reverse={false}></ScrollBasedMarquee>
      </div>
       <div className='w-full absolute top-6 left-0 scale-[105%] bg-[#9D2117] -rotate-2 py-4 z-10'>
         <ScrollBasedMarquee speed={300} className={""} reverse={false}></ScrollBasedMarquee>
      </div>

      <div className='mt-[15vh] lg:mt-[35vh] w-full' ref={containerRef}>
        <h1 className='lg:text-center px-4 uppercase text-[#9D2117] text-3xl lg:text-5xl
        tracking-wider mb-4'>
          What's <span className='text-white'>Exquisite</span> About us
        </h1>

        <div className="w-full relative h-fit mt-5 lg:mt-20">
            <div className='absolute top-1/2 left-1/2 -translate-full -translate-y-1/2 
            h-[70%] w-[0.08vw] bg-[#534F4F] backdrop-blur-sm'
            ref={timelineRef}>
                 <div ref={progressRef} className='h-0 w-full bg-[#9D2117] shadow-glow-red'/>
                 {[0,1,2].map((i) => (
                     <div
                     key={i}
                     ref={(e) => { circleRef.current[i] = e; }}
                     className={`w-6 h-6 lg:h-14 lg:w-14 rounded-full border-2 absolute flex 
                      items-center justify-center -translate-x-1/2 
                      ${ i == 0 ? "top-0 -translate-y-1/2 border-[#9D2117] "
                                : i == 1 
                                ? "top-1/2 -translate-y-1/2 border-[#534F4F]"
                                : "bottom-0 translate-y-1/2 border-[#534F4F]"
                       
                      }`}
                     >
                      <span className={`h-1 w-1 lg:h-3 lg:w-3 inline-block rounded-full
                        ${i == 0 ? "bg-[#9D2117]" : "bg-[#534F4F]"} circle-dot-gray`}/>
                     </div>
                 ))}
            </div>

            <div className="">
                <div ref={(el) => { contentRef.current[0] = el; }} 
                className="w-full h-[18vh] lg:h-[50vh] flex items-center justify-between
                mb-10 lg:mb-20 ">
                    <div className="w-[45%] h-fit pl-4 lg:pl-20">
                        <h1 className="text-[#9D2117] uppercase font-[Minecraft] text-sm 
                        lg:text-2xl tracking-wider">
                            Where Creativity Codes the Future
                        </h1>
                        <h3 className='font-[Aux-mono] text-xs lg:text-sm text-white mt-4 uppercase'>
                            We don't just follow trends --we craft tommorrow's digital stories with
                            code, motion, and imagination
                        </h3>
                    </div>
                    <div className="w-[40%] h-full flex items-center justify-center rounded-l-lg
                    bg-[#9D2117] group shadow-2xl">
                        <div className="w-full h-full rounded-l-lg group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-400 shadow-2xl overflow-hidden">
                            <DistortionImageEffect
                            img1="./imgs/page2/img11.png"
                            img2="./imgs/page2/img12.jpg"
                            disp="./imgs/displacement/image.png"
                            />
                        </div>
                    </div>
                </div>

                <div ref={(el) => { contentRef.current[1] = el; }} 
                className="w-full h-[18vh] lg:h-[50vh] flex items-center justify-between mb-10 lg:mb-20">
                    <div className="w-[40%] h-full flex items-center justify-center rounded-r-lg bg-[#9D2117]
                    group-shadow-2xl">
                         <div className="w-full h-full rounded-l-lg group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-400 shadow-2xl overflow-hidden">
                            <DistortionImageEffect
                            img1="./imgs/page2/img21.png"
                            img2="./imgs/page2/img22.jpg"
                            disp="./imgs/displacement/image.png"
                            />
                        </div>
                    </div>

                    <div className="w-[45%] h-fit pr-4 lg:pr-20">
                        <h1 className='text-[#9D2117] uppercase font-[Minecraft] text-sm lg:text-2xl tracking-wider'>
                            Creative Minds. Clean Code. Compelling Motion.
                        </h1>
                        <h3 className='font-[Aux-mono] text-xs lg:text-sm text-white mt-4 uppercase'>
                            Our secret formula: innovation-driven desine + smooth
                            animation + optimized performance.
                        </h3>
                    </div>
                </div>
  
                
            <div ref={(el) => { contentRef.current[2] = el; }} 
                className="w-full h-[18vh] lg:h-[50vh] flex items-center justify-between mb-10 lg:mb-20">
                   
                    <div className="w-[45%] h-fit pr-4 lg:pr-20">
                        <h1 className='text-[#9D2117] uppercase font-[Minecraft] text-sm lg:text-2xl tracking-wider'>
                            Exquisite in Motion
                        </h1>
                        <h3 className='font-[Aux-mono] text-xs lg:text-sm text-white mt-4 uppercase'>
                            We blend storytelling, 3D visuals, microinteractions, and
                            responsive design into one seamless web performance.
                        </h3>
                    </div>
                    
                    <div className="w-[40%] h-full flex items-center justify-center rounded-r-lg bg-[#9D2117]
                    group-shadow-2xl">
                         <div className="w-full h-full rounded-l-lg group-hover:translate-x-4 group-hover:-translate-y-4 
                         transition-all duration-400 shadow-2xl overflow-hidden">
                            <DistortionImageEffect
                            img1="./imgs/page2/img31.png"
                            img2="./imgs/page2/img32.png"
                            disp="./imgs/displacement/image.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page2
