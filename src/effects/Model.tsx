import React from 'react'
import { useThree , useFrame } from '@react-three/fiber'
import { useAspect, useTexture } from '@react-three/drei';
import { animate } from "framer-motion"
import { content } from "./data"
import useMouse from "./useMouse"
import { fragment , vertex } from './Shader';

interface IModel {
    activeMenu: number  | null
}

const Model : React.FC<IModel> = ({ activeMenu }) => {

    const { viewport } = useThree();
    const mouse = useMouse();
    const meshRef = React.useRef<any>(null);


    const textures = useTexture(content.map((elem) => elem.src))

    const image = textures[0]?.image as { width: number , height: number}
    const width = image?.width ?? 1
    const height = image?.height ?? 1

    const scale = useAspect(width * 1.1 , height * 0.7 , 0.165);

    const uniforms = React.useRef({
        uTexture: { value : textures[0]},
        uDelta: { value : { x: 0 , y: 0 } },
        uTime: { value : 0},
        uAlpha: { value: 0}
    })

    React.useEffect(() => {
        if(!meshRef.current) return;

        if(activeMenu !== null && textures[activeMenu]) {
            meshRef.current.material.uniforms.uTexture.value = textures[activeMenu]
            animate(
                meshRef.current.material.uniforms.uAlpha,
                { value: 1},
                {
                    duration: 0.3,
                    ease: "easeOut"
                }
            )
        } else {
            animate(
                meshRef.current.material.uniforms.uAlpha,
                { value: 0},
                {
                    duration: 0.3,
                    ease: "easeOut"
                }
            )
        }
    } , [activeMenu , textures])


    useFrame(({clock}) => {
        if(!meshRef.current) return;

        const x = 
            ( mouse.x.get() / window.innerWidth) * viewport.width - viewport.width / 2;

        const y = 
            -(mouse.y.get() / window.innerHeight) * viewport.height + viewport.height / 2;

        meshRef.current.position.x += (x - meshRef.current.position.x) * 0.1;
        meshRef.current.position.y += (y - meshRef.current.position.y) * 0.1;

        meshRef.current.material.uniforms.uDelta.value = {
            x: (x - meshRef.current.position.x) * 0.4,
            y: (y - meshRef.current.position.y) * 0.4,
        }

        meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime()

    })
  return (
   <mesh scale={scale} ref={meshRef}>
        <planeGeometry args={[1, 1.5, 15, 15]}></planeGeometry>
        <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        transparent={true}
        uniforms={uniforms.current}
        />
   </mesh>
  )
}

export default Model
