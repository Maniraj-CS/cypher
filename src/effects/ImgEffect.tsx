import React, { useMemo, useRef, useState } from 'react'
import { useFrame , useLoader } from "@react-three/fiber"
import { useAspect } from "@react-three/drei"
import  * as THREE from "three"
import vertexShader from "../shaders/imgVertexShader.glsl?raw"
import fragmentShader from "../shaders/imgFragShader.glsl?raw"

interface IImgEffect {
  img: string
}
const ImgEffect : React.FC<IImgEffect> = ({img}) => {

    const texture = useLoader(THREE.TextureLoader , img);
    const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null);
    const [ hovered , setHovered ] = useState(false);
    const [ targetMouse , setTargetMouse ] = useState(new THREE.Vector2(0.5 , 0.5));

    const scale = useAspect(texture.image.width , texture.image.height , 0.5)

    const uniforms = useMemo(() => {
        return ({
            uTexture:{ value: texture},
            uTime: { value: 0},
            uHoverStrength: { value: 0},
            uMouse: { value: new THREE.Vector2(0.5,0.5)}
        })
    } , [ texture ]);

    useFrame(({clock}) => {

        if(mesh.current){
            const material = mesh.current.material;
            const delta = clock.getElapsedTime();

            material.uniforms.uTime.value = delta;

            material.uniforms.uHoverStrength.value = THREE.MathUtils.lerp(
                material.uniforms.uHoverStrength.value,
                hovered ? 1.0 : 0.0,
                0.15
            );

            material.uniforms.uMouse.value.lerp(targetMouse , 0.1);
        }
    })




  return (
    <mesh
    ref={mesh}
    scale={scale}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    onPointerMove={(e ) => {
        const uv = e.uv
        if(uv) setTargetMouse(uv)
    }}
    >

        <planeGeometry args={[1,1,128,128]}></planeGeometry>
        <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        />
    </mesh>
  )
}

export default ImgEffect
