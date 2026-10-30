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