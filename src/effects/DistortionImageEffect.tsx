import React from 'react'
import { Canvas } from '@react-three/fiber'
import ImageDistortion from './ImageDistortion'


export interface IDistortionImageEffect {
    img1: string
    img2: string
    disp: string
}

const DistortionImageEffect : React.FC<IDistortionImageEffect> = ({img1, img2, disp}) => {

  const [isDesktop , setIsDesktop] = React.useState(true)


  React.useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 768)
      handleResize();

      window.addEventListener("resize" , handleResize);
      return () => window.removeEventListener("resize",handleResize)
  },[])



  return (
    <div className='relative h-full w-full'>
      {
        isDesktop ? (
          <Canvas orthographic camera={{zoom:100 , position:[0,0,100]}}>
             <ImageDistortion img1={img2} img2={img2} disp={disp}></ImageDistortion>
          </Canvas>
        ) :(
           <img src={img1} alt="img" className='w-full h-full object-cover'/>
        )
      }
    </div>
  )
}

export default DistortionImageEffect
