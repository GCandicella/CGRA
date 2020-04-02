#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D waterMap;
uniform sampler2D waterTex;
uniform float timeFactor;

#define VELOCIDADE_FACTOR 0.01
void main() {

	vec4 color = texture2D(waterTex, vTextureCoord + timeFactor*VELOCIDADE_FACTOR);   //move the color
	vec4 map   = texture2D(waterMap, vec2(0.0,0.1) + vTextureCoord + timeFactor*VELOCIDADE_FACTOR);

	map *= 0.2; // mais suave

	vec4 frag = vec4(color.r - map.r, color.g - map.g, color.b - map.b, 1.0);

	gl_FragColor = frag;
}