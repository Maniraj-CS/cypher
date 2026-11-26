import React from 'react'

class Sparkle {
    x: number;
    y: number;
    color: string;
    alpha: number;
    size: number;
    dx: number;
    dy: number;

    constructor(x: number, y: number, getRandomShade: () => string) {
        this.x = x;
        this.y = y;
        this.color = getRandomShade();
        this.alpha = 1;
        this.size = Math.random() * 4 + 2;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.02;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }

    isVisible() {
        return this.alpha > 0;
    }
}

const ClickCursor = () => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sparklesRef = React.useRef<Sparkle[]>([]);
    const animationRef = React.useRef<number | null>(null);
    const [cursorPos, setCursorPos] = React.useState({ x: -100, y: -100 });

    React.useEffect(() => {
       const canvas = canvasRef.current;
       const ctx = canvas?.getContext('2d');

       if(!canvas || !ctx) return;

       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;

       const getRandomShade = () => {
          const variation = Math.floor(Math.random() * 40) - 20;
          const clamp = (val: number) => Math.max(0 , Math.min(255,val));
          const r = clamp(157 + variation)
          const g = clamp(33 + variation)
          const b = clamp(23 + variation)
          return `rgb(${r},${g},${b})`
       }

       const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const nextSparkles: Sparkle[] = []

          for(let p of sparklesRef.current){
            if(p){
              p.update();
              p.draw(ctx);
              if(p.isVisible()){
                nextSparkles.push(p);
              }
            }
         }

          sparklesRef.current = nextSparkles;
          animationRef.current = requestAnimationFrame(animate)
    }


    const handleClick = (e : MouseEvent) => {
        for(let i = 0 ; i < 20 ; ++i){
          sparklesRef.current.push(new Sparkle(e.clientX , e.clientY, getRandomShade))
        }
    }

    const handleMouseMove = (e : MouseEvent) => {
        setCursorPos({ x: e.clientX , y: e.clientY})
    }

    window.addEventListener("click" , handleClick)
    window.addEventListener("mousemove" , handleMouseMove)

    animate()
    
    return () => {
      window.removeEventListener("click" , handleClick)
      window.removeEventListener("mousemove" , handleMouseMove)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    } , [])


  return (
    <>
     <style>{`body {cursor: none;}`}</style>

     <canvas
     ref={canvasRef}
     className='fixed top-0 left-0 w-full h-full pointer-events-none z-[999]'
     >
     </canvas>

     <div
     className='fixed z-[999] pointer-events-none transition-transform duration-75 ease-linear'
     style={{
      left: cursorPos.x,
      top: cursorPos.y,
      transform: "translate(-50%,-50%)"
     }}
     >
         <div className='w-6 h-6 rounded-full'
         style={{
          background:"radial-gradient(circle , #9D2117 , #5a1210)",
          boxShadow:
            "0 0 20px #9D2117, 0 0 40px #7A1A14, 0 0 60px #5a1210, 0 0 80px rgb(157,33,23,0.85)",
          
          animation: "spin 2s linear infinite"
         }}
         />

     </div>

     <style>
      { `
      @keyframes spin{
       0% { transform: rotate(0deg)}
       100% { transform: rotate(360deg)}
      }
      `}
     </style>
    </>
  )
}

export default ClickCursor
