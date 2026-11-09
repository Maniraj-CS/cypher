import React from 'react'
import { Canvas } from "@react-three/fiber"
import Model from './Model'


interface IScene {
    activeMenu: number  | null
}
const Scene : React.FC<IScene> = ({activeMenu}) => {
  return (
    <div className='fixed top-0 z-99 w-full h-screen'>
       <Canvas>
        <Model activeMenu={activeMenu}></Model>
       </Canvas>
    </div>
  )
}

export default Scene
