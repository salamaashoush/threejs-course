import { CANVAS } from "../common";
import vertexShaderSource from "./shaders/vertex.glsl";
import fragmentShaderSource from "./shaders/fragment.glsl";

const gl = CANVAS.getContext("webgl2");

if (!gl) {
  throw new Error("Your browser does not support WebGL2");
}

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
if (!vertexShader) {
  throw new Error("Could not create vertex shader");
}

const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);
if (!fragmentShader) {
  throw new Error("Could not create fragment shader");
}

const program = createProgram(gl, vertexShader, fragmentShader);
if (!program) {
  throw new Error("Could not create gl program");
}

// get the location of position attribute from the GPU
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

// create a buffer to hold position data
const positionBuffer = gl.createBuffer();
// bind the buffer to gpu bind point
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// set the position buffer data
//three 2d points
const positions = [0, 0, 0, 0.5, 0.7, 0];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// vertex array
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);
const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);
// set webgl viewport,
/*
this tells webgl how to convert from world space to screen space, so this will tell webgl tpo convert -1,+1 (clip space) value to 0,canvas.width (screen space)
 clip space      screen space
   0, 0       ->   200, 150
   0, 0.5     ->   200, 225
  0.7, 0       ->   340, 150
 */
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
gl.useProgram(program);
// Bind the attribute/buffer set we want.
gl.bindVertexArray(vao);

const primitiveType = gl.TRIANGLES;
const start = 0;
const count = 3;

gl.drawArrays(primitiveType, start, count);

// Try to change the color
// Animate the color
