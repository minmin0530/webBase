attribute vec3 position;
attribute vec4 color;
attribute vec3 normal;

//varying   vec3 vEye;
varying   vec4 vColor;
varying   vec3 vNormal;
varying   vec3 vLightPosition;
varying   vec3 vPosition;
uniform   vec3 lightPosition;
uniform   mat4 mvp;

void main () {
//  vEye = eye;
  vNormal = normal;
  vLightPosition = lightPosition - position;
  float diffuse = clamp(dot(vNormal, vLightPosition), 0.0, 1.0);
  vColor = color * vec4(vec3(diffuse), 1.0);
  gl_Position = mvp * vec4(position, 1.0);
  vPosition = gl_Position.xyz;
}