
import { AnimatePresence, motion } from 'motion/react';
import React from 'react'
import Scene from "../../effects/Scene"
import { content } from '../../effects/data';
import { h1 } from 'framer-motion/client';

const Navebar = () => {

	const [isOpen, setIsOpen] = React.useState(false);
	const logoRef = React.useRef<HTMLDivElement>(null);


	const [activeMenu, setActiveMenu] = React.useState<number | null>(null);

	const handleMenuClick = () => {
		setIsOpen(() => !isOpen);
	};


	return (
		<div
			className="w-full fixed z-[999]">
			<div
				ref={logoRef}
				onClick={handleMenuClick}
				className='absolute top-5 left-5 z-[992]'
			>

				{isOpen ? (
					<i
						className="ri-close-line text-4xl text-[#9D2117] transition-all duration-300 scale-100 opacity-100"
						key="close"
					/>
				) : (
					<i
						className="ri-menu-2-line text-3xl text-[#9D2117] transition-all duration-300 scale-100 opacity-100"
						key="menu"
					/>
				)}
			</div>
			<div className="absolute md:left-1/2 md:-translate-x-1/2 w-fit top-6 right-4">
				<img
					className='w-[10vw] md:w-[3vw]'
					src="/imgs/home/Group 40.svg"
					alt="logo"
				>
				</img>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0 }}
						animate={{ height: "100vh" }}
						exit={{ height: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						className='nav-details absolute z-[99] w-full h-screen top-0 backdrop-blur-lg bg-black/10 flex overflow-hidden'
					>
						<div className="hidden xl:block">
							<Scene activeMenu={activeMenu}></Scene>
						</div>

						<div className="left relative h-full w-full text-2xl lg:text-4xl xl:text-7xl font-bold uppercase flex flex-col gap-2 items-center justify-center
       text-white font-[Minecraft] tracking-wider pointer-events-auto">
							<div
								onMouseLeave={() => setActiveMenu(null)}
								className='w-[80%] relative'
							>
								{content.map((elem, id) => {
									return (
										<h1 key={id}
											onMouseEnter={() => {
												setActiveMenu(id);
											}}
											className='hover:text-[#9D2117] cursor-pointer pt-10 pb-3 border-b-2 border-[#9D2117]
           relative z-[100] transition-all duration-300 '
										>
											{elem.title}
										</h1>
									)
								})}

								<div className="absolute -bottom-22 right-0 font-normal text-base normal-case">
									<div className="flex justify-center items-center gap-6">
										<a href="#">
											<i className='ri-linkedin-fill text-2xl'></i>
										</a>
										<a href="#">
											<i className='ri-instagram-fill text-2xl'></i>
										</a>
										<a href="#">
											<i className='ri-twitter-fill text-2xl'></i>
										</a>
									</div>

									<h3 className='text-end text-xs mt-2 font-light font-[Minecraft] tracking-wider'>
										OUR SOCIAL MEDIA <br /> SITES
									</h3>

								</div>

							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

		</div>
	)
}

export default Navebar
