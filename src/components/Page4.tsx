import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

function Page4() {

    const [windowWidth , setWindowWidth] = useState(window.innerWidth)


    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        };

        window.addEventListener("resize" , handleResize);
        return () => window.removeEventListener("resize" , handleResize)
    },[]);

    const works = [
    {
      sno: "01",
      name: "REBELLION",
      text: "A Next.js automotive configurator with 3D model rendering using React Three Fiber. Features real-time customization, AR previews, and GSAP animations for immersive UX.",
      vid: "/imgs/page3/Rebellion01.mp4",
    },
    {
      sno: "02",
      name: "CREEEDS",
      text: "Interactive design system built with React 18, Storybook and Framer Motion. Micro-interactions powered by CSS Houdini and WebGL shaders for next-gen UI experiences.",
      vid: "/imgs/page3/miranda.mp4",
    },
    {
      sno: "03",
      name: "MARSHALL",
      text: "React-based audio dashboard using Web Audio API and D3.js. Implements real-time waveform visualization with custom React hooks for performance optimization.",
      vid: "/imgs/page3/modern muses.mp4",
    },
    {
      sno: "04",
      name: "ISRO 07",
      text: "Space data portal with React Suspense and Server Components. Features ISRO API integration, WebGL star maps, and GSAP-powered scroll animations.",
      vid: "/imgs/page3/Work03.mp4",
    },
  ];


  useEffect(() => {
    if(windowWidth > 768){
        let yValue: number;

        if(windowWidth > 1440){
            yValue = 420;
        }else if(windowWidth > 1305){
            yValue = 270;
        }else{
            yValue = 240;
        }

        gsap.utils.toArray<HTMLDivElement>(".work-item").forEach((item, i) => {
            gsap.set(item , {zIndex: works.length - i})

            gsap.to(item, {
                y: yValue * i,
                rotate: 0,
                opacity: 1,
                ease: "power1.out",
                scrollTrigger:{
                    trigger: item,
                    start: "top 50%",
                    end: "bottom 20%",
                    scrub: 0.3
                },
            })
        });

        ScrollTrigger.refresh()
    }
  },[windowWidth])
  return (
    <div className='w-full lg:h-[200vh] 2xl:h-[250vh] relative font-[Aux-mono] min-h-screen
    text-white pb-2 lg:p-10 overflow-hidden'
    >
      <h1 className='lg:text-center px-4 uppercase text-[#9D2117] text-3xl lg:text-5xl font-[Minecraft]
      tracking-wider'>
        our <span>unparalleled</span> legacy
      </h1>

      <div className="w-full mt-10 lg:mt-20 rounded-2xl duration-300 flex flex-col gap-5 lg:gap-10">
        {
            works.map((work , idx) => (
                <div 
                key={idx}
                className={`work-item w-full ${windowWidth > 768 ? "rotate-[-5deg] absolute" : "static"} 
                    border-b-[1.5px] lg:mt-5 px-4 lg:px-5 pb-4 border-[#9D2117] rounded-xl h-auto lg:h-[35vh]
                    2xl:h-[20%] flex flex-col lg:flex-row bg-[#111010] left-0`}
                style={{
                    transformOrigin: "center",
                    marginBottom: windowWidth <= 768 ? "1.5rem" : "0"
                }}
                >

                    <div className="w-full lg:w-[5%] text-start lg:text-end text-xl lg:text-3xl">
                        {work.sno}
                    </div>
                     <div className="w-full lg:w-[25%] lg:p-5 text-2xl  lg:text-5xl">
                        {work.name}
                    </div>
                     <div className="w-full lg:w-[40%] py-2 pb-5 lg:p-5  text-sm lg:text-lg text-[#9D2117]">
                        {work.text}
                    </div>
                     <div className="w-full lg:w-[30%] py-0 lg:py-2 lg:p-0 h-40 sm:h-[40vh] lg:h-full
                     2xl:h-auto">
                       <video 
                       className='h-full w-full object-cover'
                       autoPlay
                       loop
                       muted
                       playsInline
                       >
                        <source src={work.vid} type='video/mp4'></source>
                       </video>
                    </div>

                </div>
            ))
        }
      </div>

    </div>
  )
}

export default Page4
