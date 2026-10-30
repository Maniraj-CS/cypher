import React from "react";
import { motion } from "framer-motion";
import DecryptedText from "../Animations/DecryptedText";

const Footer = () => {
  return (

    <div className='relative min-h-[55vh] lg:min-h-[100vh] '
      style={{
        clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'
      }}>
      <div className='fixed h-[55vh] lg:h-[100vh] w-full bottom-0'>
        <div className="font-[Minecraft] relative h-[55vh] sm:h-screen w-full overflow-hidden">
          {/* Background Image - Hidden on mobile */}
          <img
            className="absolute top-0 left-0 w-full h-full object-cover md:block hidden"
            src="/imgs/Footer/Dot Grid.png"
            alt=""
          />

          <div className="relative flex justify-center md:justify-start md:items-end h-[95%] sm:h-[92%] w-full">
            {/* Main Content */}
            <img
              className="absolute z-[6] bottom-0 left-1/2 translate-x-[-50%] h-auto w-[65%] sm:w-[53%] lg:w-[33%]"
              src="/imgs/Footer/image.png"
              alt=""
            />
            <div className="absolute bottom-[16%] sm:bottom-[12%] lg:bottom-[16%] -ml-2 z-[7] left-1/2 translate-x-[-50%] w-[90%] sm:w-[78%] lg:w-[50%]  ">
              <img
                className="h-auto w-full object-cover "
                src="/imgs/Footer/Ellipse 91.png"
                alt=""
              />

              {/* Rotating Star - Hidden on mobile */}
              <motion.img
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                style={{ originX: 0.5, originY: 0.5 }}
                className="absolute scale-[100%] sm:scale-[140%] z-[8] top-0 right-0 lg:right-10 translate-y-[-50%]"
                src="/imgs/home/star.png"
                alt=""
              />
            </div>

            {/* Group Image - Hidden on mobile */}
            <img
              className="h-[17%] top-[30%] left-[9%] absolute md:block hidden"
              src="/imgs/Footer/Group 43.png"
              alt=""
            />

            {/* Tagline - Adjusted for mobile */}
            <h1 className="uppercase text-lg hidden lg:block md:text-2xl tracking-wider px-4 md:px-15 font-[Aux-mono] absolute w-full bottom-3 left-0 z-[5] ">
              Creative Web. Motion Magic. Pixel Precision.
            </h1>

            <h1 className="font-[Aux-mono] top-25 left-20 absolute  hidden lg:block">
              C:
              <br />
              \Hacathon\Team-
              <br />
              cyphers\FinalRo
              <br />
              und
            </h1>

            <h1 className="font-[Aux-mono] text-xs top-2 sm:top-10 left-3 lg:hidden absolute ">
              C:\Hacathon\Team-
              <br />
              cyphers\FinalRound
            </h1>

            <h1 className="font-[Aux-mono] top-45 left-80 absolute hidden lg:block">
              Project: Final
              <br />
              Round Cyphers
            </h1>

            <h1 className="font-[Aux-mono] text-xs top-2 sm:top-10 right-3 lg:text-base lg:top-25 lg:right-20 absolute ">
              North: 23.2599° N,
              <br />
              East: 77.4126° E
            </h1>

            {/* Navigation Links - Stacked on mobile */}
            <div className="absolute hidden lg:flex bottom-10 right-20 text-lg md:text-xl flex-col w-full md:w-fit items-center md:items-start">
              <h1 className="hover:text-[#9D2117] cursor-pointer duration-300 mb-2 md:mb-0">
                About
              </h1>
              <h1 className="hover:text-[#9D2117] cursor-pointer duration-300 mb-2 md:mb-0">
                Contact
              </h1>
              <h1 className="hover:text-[#9D2117] cursor-pointer duration-300">
                Services
              </h1>
            </div>

            {/* Main Heading - Adjusted size for mobile */}
            <h1 className="uppercase px-4 mt-16 sm:mt-26 lg:mt-0 md:px-15 text-[#9D2117] text-6xl sm:text-7xl md:text-[15vw]">
              <DecryptedText
                text="Cyphers"
                speed={50}
                revealDirection="center"
                maxIterations={100}
                animateOn="view"
              />
            </h1>
          </div>

          {/* Bottom Bar */}
          <div className="w-full h-[5%] sm:h-[8%] border-t-1 border-white flex items-center justify-center">
            <div className="w-[25%] border-r-1 border-white h-full"></div>
            <div className="w-[50%] flex items-center uppercase justify-center font-[Aux-mono] h-full text-sm md:text-base">
              created by Cyphers
            </div>
            <div className="w-[25%] border-l-1 border-white h-full"></div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Footer;