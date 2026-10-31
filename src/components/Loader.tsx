import { gsap } from "gsap"
import React, { useEffect } from "react";
import "./Loader.css"

const Loader = () => {

	const [progress, setProgress] = React.useState(0);
	const loaderRef = React.useRef<HTMLDivElement>(null);


	useEffect(() => {
		const duration = 5; // Duration of the loading animation in seconds
		const interval = 50;
		const increment = 50 / (duration * (500 / interval)); // Calculate the increment based on duration and interval

		const intervalId = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 100) {
					clearInterval(intervalId);
					return 100;
				}
				return prevProgress + increment;
			})
		}, interval);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (progress >= 100 && loaderRef.current) {
			gsap.to(loaderRef.current, {
				opacity: 0,
				duration: 1,
				ease: "power2.inOut",
				onComplete: () => {
					if (loaderRef.current) {
						loaderRef.current.style.display = "none"; // Hide the loader after the animation completes
					}
				},

			})
		}
	}, [progress]);

	return (
		<div ref={loaderRef}
			className="loader-container flex justify-center items-center h-screen w-screen absolute top-0 left-0"
		>
			<div className="h-[20vw] w-[60vw] flex justify-center items-center">
				<img
					src="./imgs/home/shadow.png"
					className="absolute z-9 opacity-50"
				/>
				<div className="logo-overlay z-[10]">
					<div className="h-[15vh] w-[20vw] flex items-center justify-center">
						<img className="h-[15vh]" src="./imgs/Loader/Group 40.svg"></img>
					</div>

					<div className="flex justify-between items-center w-[20vw] mt-[1vw]">
						<h1 className="text-[0.8vw] font-[Minecraft] text-white">
							Loading....
						</h1>
						<p className="text-[0.8vw] font-[Minecraft] text-white">
							{Math.round(progress)}%
						</p>
					</div>

					<div className="loading-line">
						<div
							className="loading-progress"
							style={{ width: `${progress}%` }}
						>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loader
