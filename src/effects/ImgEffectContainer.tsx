import { Canvas } from '@react-three/fiber'
import React from 'react'
import ImgEffect from './ImgEffect'


interface IImgEffectContainer {
  img: string
}
const ImgEffectContainer : React.FC<IImgEffectContainer> = ({img}) => {
  return (
    <div className='relative h-full w-full'>
      <Canvas orthographic camera={{ zoom: 100 , position: [0,0,10]}}>
           <ImgEffect img={img}></ImgEffect>
      </Canvas>
    </div>
  )
}

export default ImgEffectContainer
