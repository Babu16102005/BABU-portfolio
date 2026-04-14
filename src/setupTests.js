import '@testing-library/jest-dom/vitest';

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }

  observe(element) {
    this.callback([{ isIntersecting: true, target: element }], this);
  }

  unobserve() {}

  disconnect() {}
}

window.IntersectionObserver = IntersectionObserverMock;
global.IntersectionObserver = IntersectionObserverMock;

window.requestAnimationFrame = (callback) => window.setTimeout(() => callback(Date.now()), 16);
window.cancelAnimationFrame = (id) => window.clearTimeout(id);
global.requestAnimationFrame = window.requestAnimationFrame;
global.cancelAnimationFrame = window.cancelAnimationFrame;

window.matchMedia = window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

global.matchMedia = window.matchMedia;

HTMLCanvasElement.prototype.getContext = function getContext(contextType) {
  if (contextType === 'webgl') {
    return {
      VERTEX_SHADER: 0x8b31,
      FRAGMENT_SHADER: 0x8b30,
      COMPILE_STATUS: 0x8b81,
      LINK_STATUS: 0x8b82,
      ARRAY_BUFFER: 0x8892,
      STATIC_DRAW: 0x88e4,
      TRIANGLE_STRIP: 0x0005,
      FLOAT: 0x1406,
      DEPTH_TEST: 0x0b71,
      CULL_FACE: 0x0b44,
      BLEND: 0x0be2,
      DITHER: 0x0bd0,
      createShader: vi.fn(() => ({})),
      shaderSource: vi.fn(),
      compileShader: vi.fn(),
      getShaderParameter: vi.fn(() => true),
      getShaderInfoLog: vi.fn(() => ''),
      deleteShader: vi.fn(),
      createProgram: vi.fn(() => ({})),
      attachShader: vi.fn(),
      linkProgram: vi.fn(),
      getProgramParameter: vi.fn(() => true),
      getProgramInfoLog: vi.fn(() => ''),
      useProgram: vi.fn(),
      disable: vi.fn(),
      createBuffer: vi.fn(() => ({})),
      bindBuffer: vi.fn(),
      bufferData: vi.fn(),
      getAttribLocation: vi.fn(() => 0),
      enableVertexAttribArray: vi.fn(),
      vertexAttribPointer: vi.fn(),
      getUniformLocation: vi.fn((_program, name) => ({ name })),
      uniform3f: vi.fn(),
      uniform2f: vi.fn(),
      uniform1f: vi.fn(),
      viewport: vi.fn(),
      drawArrays: vi.fn(),
      deleteProgram: vi.fn(),
      deleteBuffer: vi.fn(),
    };
  }

  if (contextType !== '2d') {
    return null;
  }

  return {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    set fillStyle(_value) {},
    set strokeStyle(_value) {},
  };
};

HTMLCanvasElement.prototype.toDataURL = function toDataURL() {
  return 'data:image/png;base64,test-mask';
};
