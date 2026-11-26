import React from 'react'
import gsap from 'gsap';


const RightNave = () => {

    const [isMusicActive, setIsMusicActive] = React.useState(false);
    const barsRef = React.useRef<(HTMLDivElement | null)[]>([]);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const playSound = () => {
        const audio  = new Audio('imgs/page3/hover-effect-dich.mp3');
        audio.play();
        audio.volume = 1;
    };

    React.useEffect(() => {
        barsRef.current.forEach((bar, index: number) => {
            if(isMusicActive) {
                gsap.to(bar,{
                  scaleY: () => 0.2 + Math.random() * 1.5,
                  repeat: -1,
                  yoyo: true,
                  duration: 0.3 + Math.random() * 0.7,
                  delay: index * 0.1,
                  transformOrigin: 'bottom center',
                })
            }else {
                gsap.killTweensOf(bar);
                gsap.to(bar,{
                    scaleY: 1,
                    duration: 0.5,
                    ease:"elastic.out(1, 0.5)",
                })
            }
              
        })
    } , [isMusicActive]);


    const toggleAudio = () => {
        const audio = audioRef.current;
        if(!audio) return;

        if(isMusicActive) {
            audio.pause();
        }else {
            audio.volume = 1;
            audio.play().catch((error) => console.error('Error playing audio:', error));
        }

        setIsMusicActive(!isMusicActive);
     }

  return (
    <div className='right-nav fixed z-[99] bottom-0 right-0 h-fit w-fit flex items-center pb-6 pr-6 gap-6'>
      <audio 
      src="imgs/home/Music.ogg"
      ref={audioRef}
      loop
      preload='auto'
      ></audio>

      <div
      onClick={() => {
        playSound();

        toggleAudio();
      }}

      className='flex items-center h-10 px-2 scale-[130%] font-[Minecraft] cursor-pointer 
      rounded-md gap-1 text-[#9D2117] hover:opacity-80 transition-opacity'
      >
           { isMusicActive ? <h1 className='text-xs mt-1 w-6 mr-1'>
            OFF
           </h1>: <h1 className='text-xs mt-1 w-6 mr-1'>
            ON
        </h1>}

        { Array.from({length:8}).map((_ , i) => {
            return <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            className='w-[2px] bg-[#9D2117] transition-all'
            style={{ height: "50%"}}
            >

            </div>
        })}
      </div>
    </div>
  )
}

export default RightNave
