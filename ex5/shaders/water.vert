attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D waterMap;
uniform sampler2D waterTex;
varying vec2 vTextureCoord;

uniform float timeFactor;

void main() {
	vec3 offset = vec3(0.0, 0.0, 0.0);
	vTextureCoord = aTextureCoord;
	vec4 watermap = texture2D(waterMap, vTextureCoord);
	if(watermap.b < 0.5)
		offset = aVertexNormal*0.05*watermap.b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}