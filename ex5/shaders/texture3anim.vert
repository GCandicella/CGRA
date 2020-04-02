
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	vec3 intensidade_translacao = vec3(2, 0, 0); // 2 em x, 0 em y e 0 em z
	vec3 translacao = intensidade_translacao*normScale*0.1*sin(timeFactor);
	
	vTextureCoord = aTextureCoord;

	if (texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord).b > 0.5)
		offset=aVertexNormal*normScale*0.1*sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset + translacao, 1.0);
}

