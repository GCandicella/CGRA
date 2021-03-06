#ifdef GL_ES
precision mediump float;
#endif

varying vec4 coords;
uniform int drops;

void main() {
    float edge = -0.6 + (1.2 / 5.0) * float(drops);

    if (coords.x > edge)
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1);
    else {
        gl_FragColor.rgb =  vec3(1.0 - (0.6 + coords.x / 0.6), 0.6 + coords.x / 0.6, 0);
        gl_FragColor.a = 1.0;
    }
}