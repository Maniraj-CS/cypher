import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// Shader
export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 0.5,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  // Vertex
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment
  `
  varying vec2 vUv;

  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;

  void main() {
    vec4 disp = texture2D(disp, vUv);
    vec2 distortedPosition = vec2(vUv.x + dispFactor * (disp.r * effectFactor), vUv.y);
    vec2 distortedPosition2 = vec2(vUv.x - (1.0 - dispFactor) * (disp.r * effectFactor), vUv.y);
    vec4 _texture = texture2D(tex, distortedPosition);
    vec4 _texture2 = texture2D(tex2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    gl_FragColor = vec4(finalTexture.rgb, 1.0);
  }
  `
);

extend({ ImageFadeMaterial });

const ImgDistortion = ({ img1, img2, disp }) => {
  const ref = useRef();
  const meshRef = useRef();
  const { viewport } = useThree();
  const [hovered, setHover] = useState(false);
  const [texSize, setTexSize] = useState([1, 1]);

  const [texture1, texture2, dispTexture] = useTexture([img1, img2, disp]);

  // Animate distortion
  useFrame(() => {
    if (ref.current) {
      ref.current.dispFactor = THREE.MathUtils.lerp(
        ref.current.dispFactor,
        hovered ? 1 : 0,
        0.075
      );
    }
  });

  // Wait for texture to load and get size
  useEffect(() => {
    if (texture1.image) {
      setTexSize([texture1.image.width, texture1.image.height]);
    }
  }, [texture1]);

  // Calculate plane size to preserve aspect ratio (like object-cover)
  const planeSize = useMemo(() => {
    const [imgW, imgH] = texSize;
    const imgRatio = imgW / imgH;
    const viewRatio = viewport.width / viewport.height;

    if (imgRatio > viewRatio) {
      // Wider image – height = viewport height, width scaled
      return [viewport.height * imgRatio, viewport.height];
    } else {
      // Taller image – width = viewport width, height scaled
      return [viewport.width, viewport.width / imgRatio];
    }
  }, [texSize, viewport]);

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={planeSize} />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
};

export default ImgDistortion;