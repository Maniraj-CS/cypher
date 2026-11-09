
export const vertex = `
uniform float uTime;
varying vec2 vUv;
varying float vMovement;

void main() {
    vec3 newPosition = position;
    float PI = 3.141;

    float time = uTime * 2.0;
    float movement = sin(uv.x * 1.9 * PI + time) * 0.5;
    newPosition.z -= movement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
    vMovement = movement;
}
`

export const fragment = `
uniform sampler2D uTexture;
uniform float uAlpha;
varying vec2 vUv;
varying float vMovement;

void main() {
    // vec4 image = texture2D(uTexture, vUv);
    // gl_FragColor = image;
    vec3 image = texture2D(uTexture, vUv).rgb;
    vec3 black = vec3(0.0, 0.0, 0.0);

    vec3 finalColor = mix(image, black, vMovement);

    gl_FragColor = vec4(finalColor, uAlpha);
    // gl_FragColor = vec4(image, 1.0);
}
`
