uniform sampler2D uTexture;
varying vec2 vUv;
varying float vMovement;

void main() {
    // vec4 image = texture2D(uTexture, vUv);
    // gl_FragColor = image;
    vec3 image = texture2D(uTexture, vUv).rgb;
    vec3 black = vec3(0.0, 0.0, 0.0);

    vec3 finalColor = mix(image, black, vMovement);

    gl_FragColor = vec4(finalColor, 1.0);
    // gl_FragColor = vec4(image, 1.0);
}