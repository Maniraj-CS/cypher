// fragmentShader.glsl
precision highp float;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uHoverStrength;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    
    // Improved falloff with smoother transition
    float radius = 0.3;
    float effectStrength = (1.0 - smoothstep(0.0, radius, dist)) * uHoverStrength;
    
    // Multi-layered distortion
    uv.x += sin(uv.y * 8.0 + uTime * 2.0) * 0.015 * effectStrength;
    uv.y += cos(uv.x * 8.0 + uTime * 2.0) * 0.015 * effectStrength;
    uv.x += sin(uv.y * 15.0 + uTime * 3.0) * 0.008 * effectStrength;
    uv.y += cos(uv.x * 15.0 + uTime * 3.0) * 0.008 * effectStrength;
    
    // Subtle chromatic aberration
    vec4 colorR = texture2D(uTexture, uv + vec2(0.008 * effectStrength, 0.0));
    vec4 colorB = texture2D(uTexture, uv - vec2(0.008 * effectStrength, 0.0));
    vec4 color = texture2D(uTexture, uv);
    color.r = colorR.r;
    color.b = colorB.b;

    gl_FragColor = color;
}