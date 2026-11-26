// vertexShader.glsl
precision highp float;

uniform float uTime;
uniform float uHoverStrength;

varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Multi-axis displacement
    float wave1 = sin(pos.y * 0.6 + uTime * 2.0) * 0.15 * uHoverStrength;
    float wave2 = cos(pos.x * 0.6 + uTime * 2.0) * 0.1 * uHoverStrength;
    pos.z += wave1 + wave2;
    pos.x += sin(pos.y * 1.2 + uTime * 2.0) * 0.05 * uHoverStrength;
    
    // Subtle scale effect
    pos.xyz += normal * uHoverStrength * 0.08;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}