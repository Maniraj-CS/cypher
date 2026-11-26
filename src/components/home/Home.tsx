import React, { useEffect } from 'react'
import gsap from 'gsap'

import { useGSAP } from "@gsap/react"
import { motion } from "motion/react"
import ImgEffectContainer from '../../effects/ImgEffectContainer'


import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger ,  useGSAP)


function Home() {

	const h1Ref = React.useRef<HTMLHeadingElement>(null)
	const h3Ref = React.useRef<HTMLHeadingElement>(null)
	const text = "CYPHERS";
	const containerRef = React.useRef<HTMLDivElement>(null);
	const lettersRef = React.useRef<(HTMLSpanElement | null)[]>([]);
	const centerImage = React.useRef<HTMLDivElement>(null);
	const shadowRef = React.useRef<HTMLImageElement>(null);
	const parent = React.useRef<HTMLDivElement>(null);

	
	useGSAP(() => {

		const middle = Math.floor(text.length / 2);

		const orderedLettersIn = lettersRef.current.map((letter, index) => {
			return ({
				element: letter,
				distance: Math.abs(index - middle)
			})
		}).sort((a, b) => a.distance - b.distance)


		const entryAnim = gsap.timeline();
		entryAnim.fromTo(
			orderedLettersIn.map((l) => l.element),
			{
				y: -100,
				opacity:0
			},
			{
				y: 0,
				delay: 6,
				opacity:1,
				stagger: {
					each: 0.5,
					ease: "linear"
				},
			}
		)

		ScrollTrigger.create({
			trigger: containerRef.current,
			start: "top 0%",
			end: "bottom 100%",
			scrub: 1,
			onUpdate: (self) => {
				const progress = self.progress;

				const customOrder = [
					[0, 6],
					[1, 5],
					[2, 4],
					[3]
				]

				customOrder.forEach((group, groupIndex) => {
					group.forEach((i) => {
						const element = lettersRef.current[i]
						gsap.to(element, {
							y: -progress * 2000,
							duration: 0.2,
							ease: "easeIn",
							delay: groupIndex * 0.05
						})
					})

				})


			},

		})

	})

	useEffect(() => {
		const moveElements = (e: MouseEvent) => {
			const rect = parent.current?.getBoundingClientRect();

			if (!rect?.left || !rect.height) return;

			const relX = e.clientX - rect?.left;
			const relY = e.clientY - rect?.top

			const xPercent = (relX / rect?.width - 0.05) * 2
			const yPercent = (relY / rect?.height - 0.05) * 2

			gsap.to(centerImage.current, {
				x: xPercent * 50,
				y: yPercent * 0,
				duration: 0.8,
				ease: "power1.out"
			})

			gsap.to(shadowRef.current, {
				x: xPercent * 50,
				y: yPercent * 0,
				duration: 0.8,
				ease: "power1.out"
			})

			gsap.to(h1Ref.current, {
				x: xPercent * 20,
				y: yPercent * 17,
				duration: 1,
				ease: "power1.out"
			})

			gsap.to(h3Ref.current, {
				x: xPercent * 20,
				y: yPercent * 17,
				duration: 1,
				ease: "power1.out"
			})

		}


		const parentElm = parent.current
		parentElm?.addEventListener("mousemove", moveElements)

		return () => {
			parentElm?.removeEventListener("mousemove", moveElements)
		}

	}, []);




	return (
		<div ref={parent} className='h-screen w-full'>
			<div className="relative h-full w-full flex flex-col items-center lg:justify-center">
				<div ref={h1Ref} className="mt-[20vh] lg:mt-0 relative w-fit h-fit">
					<h1 className="text-[14vw] leading-[13vw] uppercase text-[#9D2117]
             font-[Minecraft] tracking-[1.5vw]">
						{text.split("").map((letter, index) => (
							<span
								key={index}
								ref={(el) => {lettersRef.current[index] = el}}
								className="inline-block "
							>
								{letter}
							</span>
						))}
					</h1>
					<motion.img
						src="./imgs/home/star.png"
						alt=""
						className="absolute right-0 lg:right-5 h-10 lg:h-auto top-0 -translate-y-1/2 
                        -translate-x-1/2"
						animate={{ rotate: -360 }}
						transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
						style={{ originX: 0.5, originY: 0.5 }}
					/>
				</div>

				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full lg:w-[70%] 
        h-full overflow-y-hidden flex items-center justify-center">
					<div ref={centerImage}
						className='h-full lg:h-[100%] w-full hidden lg:block'>
						<ImgEffectContainer img={`./imgs/home/model.png`} />
					</div>
					<img src="./imgs/home/model.png" alt=""
						className='w-[95%] sm:w-[70%] h-fit object-cover lg:hidden' />
					<img
						ref={shadowRef}
						src='./imgs/home/shadow.png'
						alt=''
						className='absolute bottom-0 top-1/2 -translate-y-1/2 lg:w-screen w-[140vw] lg:h-[130vh] z-[-2]'
					></img>
				</div>

				<h2 className='hidden lg:block absolute top-40 left-30 font-[Aux-Mono] text-sm font-light tracking-wider'>
					Project: Final <br />
					Round Cyphers
				</h2>

				<h2 className='hidden lg:block absolute bottom-40 right-30 font-[Aux-Mono] text-sm font-light tracking-wider'>
					North: 23.2599 N, <br />
					East: 77.4126 E
				</h2>

				<h3 ref={h3Ref}
					className='lg:absolute text-[2.5vw] lg:text-xl font-[Aux-Mono]  text-center uppercase w-full top-1/2 left-1/2
        lg:-translate-x-1/2 lg:mt-15 pointer-events-none'>
					Creative Web. Motion Magic. Pixel Precision.
				</h3>
			</div>

			<div className='absolute left-0 bottom-0 p-6 font-[Minecraft]'>
				<h1 className='relative group mb-2 overflow-hidden'>
					<span className='block transition-all duration-300 group-hover:translate-y-[100%]'>
						LINKEDIN
					</span>
					<span className='absolute top-0 left-0 text-[#9D2117] transition-all duration-300
            translate-y-full group-hover:translate-y-0'>
						LINKEDIN
					</span>
					<div className='h-[2px] w-full bg-[#9D2117] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100' />
				</h1>
				<h1 className='relative group mb-2 overflow-hidden'>
					<span className='block transition-all duration-300 group-hover:translate-y-[100%]'>
						INSTAGRAM
					</span>
					<span className='absolute top-0 left-0 text-[#9D2117] transition-all duration-300
            translate-y-full group-hover:translate-y-0'>
						INSTAGRAM
					</span>
					<div className='h-[2px] w-full bg-[#9D2117] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100' />
				</h1>
				<h1 className='relative group mb-2 overflow-hidden'>
					<span className='block transition-all duration-300 group-hover:translate-y-[100%]'>
						TWITTER
					</span>
					<span className='absolute top-0 left-0 text-[#9D2117] transition-all duration-300
            translate-y-full group-hover:translate-y-0'>
						TWITTER
					</span>
					<div className='h-[2px] w-full bg-[#9D2117] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100' />
				</h1>
			</div>

			<div className='absolute right-1/2 translate-x-1/2 lg:-translate-x top-[27%] sm:top-[31%] lg:right-24
             lg:top-0 p-6 '>
				
				<button className="relative px-8 py-3 border-none text-[#9D2117] font-[Minecraft] uppercase cursor-pointer [clip-path:polygon(0%_0%,95%_0%,100%_20%,100%_100%,5%_100%,0%_80%)] text-base group overflow-hidden">
					<span className="relative z-10 transition-colors duration-300 group-hover:text-white">
						Explore
					</span>

					{/* Animated circle background */}
					<div className="absolute inset-0 z-0">
						<span
							className="absolute h-0 w-0 rounded-full bg-[#9D2117] opacity-0 
                            group-hover:h-[400%] group-hover:w-[400%] group-hover:opacity-100 
                             transition-all duration-500 ease-out"
							style={{
								left: "var(--mouse-x)",
								top: "var(--mouse-y)",
								transform: "translate(-50%, -50%)",
							}}
						></span>
					</div>

					{/* Border */}
					<svg
						className="absolute inset-0 w-full h-full pointer-events-none"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						<polygon
							points="0,0 95,0 100,20 100,100 5,100 0,80"
							fill="none"
							stroke="#9D2117"
							strokeWidth="2"
							vectorEffect="non-scaling-stroke"
							className="transition-colors duration-300 group-hover:stroke-[#8b5f5f]"
						/>
					</svg>

					{/* Mouse position tracker */}
					<script
						dangerouslySetInnerHTML={{
							__html: `
      document.querySelector('button').addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        this.style.setProperty('--mouse-x', e.clientX - rect.left + 'px');
        this.style.setProperty('--mouse-y', e.clientY - rect.top + 'px');
      });
    `,
						}}
					/>
				</button>
			</div>
		</div>
	)
}

export default Home
