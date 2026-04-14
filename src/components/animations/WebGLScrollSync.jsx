import React, { useEffect, useRef } from 'react';

const WebGLScrollSync = () => {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const programRef = useRef(null);
    const uniformsRef = useRef({});
    
    const vs = `
        attribute vec2 a;
        void main() {
            gl_Position = vec4(a, 0.0, 1.0);
        }
    `;

    const fs = `
        precision highp float;
        uniform vec2  uR;
        uniform float uT, uS, uSc, uBl;
        uniform vec3  uBg;
        #define PI 3.14159265359
        #define MARCH_STEPS 22
        #define REFINE_STEPS 5

        float sat(float x) { return clamp(x, 0.0, 1.0); }
        float smoother(float x) {
            x = sat(x);
            return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
        }

        vec3 sCol(vec3 c0, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
            int si = int(uSc);
            vec3 a = c0; vec3 b = c1;
            if (si == 1) { a = c1; b = c2; }
            else if (si == 2) { a = c2; b = c3; }
            else if (si == 3) { a = c3; b = c4; }
            return mix(a, b, uBl);
        }

        float sF(float c0, float c1, float c2, float c3, float c4) {
            int si = int(uSc);
            float a = c0; float b = c1;
            if (si == 1) { a = c1; b = c2; }
            else if (si == 2) { a = c2; b = c3; }
            else if (si == 3) { a = c3; b = c4; }
            return mix(a, b, uBl);
        }

        mat2 rot(float a) {
            float c = cos(a); float s = sin(a);
            return mat2(c, -s, s, c);
        }

        float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float waveH(vec2 p, float t, float amp, float storm) {
            float h = 0.0;
            vec2 swell1 = normalize(vec2(1.0, 0.28));
            vec2 swell2 = normalize(vec2(-0.48, 0.88));
            vec2 swell3 = normalize(vec2(0.82, -0.16));
            swell2 = rot(storm * 0.18) * swell2;
            swell3 = rot(-storm * 0.14) * swell3;
            float d1 = dot(p, swell1);
            float d2 = dot(p, swell2);
            float d3 = dot(p, swell3);
            h += amp * 0.66 * sin(d1 * 0.42 + t * 0.38);
            h += amp * 0.22 * sin(d1 * 0.94 - t * 0.62);
            h += amp * 0.14 * sin(d2 * 1.18 - t * 0.82);
            h += amp * 0.09 * sin(d3 * 1.82 + t * 1.04);
            h += amp * (0.11 + storm * 0.07) * sin(p.x * 1.45 - t * 0.76 + p.y * 0.66);
            h += amp * (0.07 + storm * 0.05) * sin(p.x * 2.85 + t * 1.06 - p.y * 0.52);
            h += amp * (0.04 + storm * 0.03) * sin(p.x * 4.60 - t * 1.50 + p.y * 1.02);
            float micro = noise(p * 14.0 + vec2(t * 0.18, t * 0.06)) - 0.5;
            h += micro * amp * (0.010 + storm * 0.008);
            return h;
        }

        vec3 waveNorm(vec2 p, float t, float amp, float storm) {
            float e = 0.018;
            float hL = waveH(p - vec2(e, 0.0), t, amp, storm);
            float hR = waveH(p + vec2(e, 0.0), t, amp, storm);
            float hD = waveH(p - vec2(0.0, e), t, amp, storm);
            float hU = waveH(p + vec2(0.0, e), t, amp, storm);
            return normalize(vec3(-(hR - hL) / (2.0 * e), 1.0, -(hU - hD) / (2.0 * e)));
        }

        float starField(vec2 uv) {
            vec2 gv = floor(uv); vec2 lv = fract(uv) - 0.5;
            float h = hash(gv);
            float size = mix(0.012, 0.0025, h);
            float d = length(lv + vec2(hash(gv + 3.1) - 0.5, hash(gv + 7.3) - 0.5) * 0.25);
            float star = smoothstep(size, 0.0, d);
            star *= smoothstep(0.82, 1.0, h);
            return star;
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - uR * 0.5) / uR.y;
            float s = smoother(uS);
            float camY = mix(1.14, 1.03, s); camY += sin(s * PI * 1.4) * 0.028;
            float camZ = mix(0.08, -0.18, s); float pitch = mix(0.115, 0.088, s);
            vec3 ro = vec3(0.0, camY, camZ); vec3 rd = normalize(vec3(uv.x, uv.y - pitch, -1.4));
            float storm = smoothstep(0.80, 1.0, s);
            vec3 skyTop = sCol(vec3(0.18, 0.06, 0.24), vec3(0.05, 0.24, 0.68), vec3(0.26, 0.06, 0.04), vec3(0.01, 0.01, 0.05), vec3(0.04, 0.05, 0.09));
            vec3 skyHori = sCol(vec3(0.92, 0.48, 0.18), vec3(0.42, 0.62, 0.90), vec3(0.88, 0.32, 0.04), vec3(0.03, 0.05, 0.14), vec3(0.15, 0.17, 0.23));
            vec3 sunCol = sCol(vec3(1.0, 0.62, 0.22), vec3(1.0, 0.96, 0.80), vec3(1.0, 0.38, 0.05), vec3(0.70, 0.75, 0.94), vec3(0.26, 0.28, 0.34));
            vec3 seaDeep = sCol(vec3(0.08,0.05,0.12), vec3(0.03,0.14,0.34), vec3(0.10,0.06,0.04), vec3(0.00,0.01,0.03), vec3(0.03,0.04,0.07));
            vec3 seaShlo = sCol(vec3(0.28,0.17,0.24), vec3(0.09,0.38,0.60), vec3(0.24,0.13,0.06), vec3(0.04,0.06,0.16), vec3(0.07,0.10,0.14));
            vec3 fogCol = sCol(vec3(0.80,0.50,0.30), vec3(0.58,0.72,0.90), vec3(0.70,0.28,0.05), vec3(0.02,0.03,0.08), vec3(0.12,0.14,0.18));
            
            float sunProgress = clamp(s / 0.58, 0.0, 1.0); float sunAngle = sunProgress * PI;
            float sunArcX = cos(sunAngle) * -0.75; float sunArcY = sin(sunAngle) * 0.38 - 0.08;
            vec3 sunDir = normalize(vec3(sunArcX, sunArcY, -1.0));
            float waveAmp = sF(0.082, 0.070, 0.100, 0.054, 0.30); waveAmp += storm * 0.020;
            float fogDen = sF(0.020, 0.010, 0.022, 0.034, 0.046);
            vec3 col;
            if (rd.y < 0.0) {
                float tFlat = ro.y / (-rd.y); float stepSize = tFlat / float(MARCH_STEPS); float t = stepSize;
                for (int i = 0; i < MARCH_STEPS; i++) {
                    vec2 wpTest = ro.xz + rd.xz * t; float wy = ro.y + rd.y * t;
                    if (wy < waveH(wpTest, uT, waveAmp, storm)) break; t += stepSize;
                }
                float ta = t - stepSize; float tb = t;
                for (int i = 0; i < REFINE_STEPS; i++) {
                    float tm = (ta + tb) * 0.5; vec2 wpm = ro.xz + rd.xz * tm;
                    if (ro.y + rd.y * tm < waveH(wpm, uT, waveAmp, storm)) tb = tm; else ta = tm;
                }
                t = (ta + tb) * 0.5; vec2 wp = ro.xz + rd.xz * t; vec3 n = waveNorm(wp, uT, waveAmp, storm);
                float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 4.0);
                vec3 refl = reflect(rd, n); float rh = clamp(refl.y, 0.0, 1.0);
                vec3 reflSky = mix(skyHori, skyTop, pow(rh, 0.42));
                float rSun = max(dot(refl, sunDir), 0.0); reflSky += sunCol * pow(rSun, 120.0) * 2.0 * smoothstep(-0.10, 0.06, sunDir.y);
                float depth = exp(-t * 0.40); vec3 waterC = mix(seaDeep, seaShlo, depth * 0.5);
                col = mix(waterC, reflSky, 0.15 + fres * 0.34);
                float spec = pow(max(dot(reflect(-sunDir, n), -rd), 0.0), 200.0); col += sunCol * spec * 1.10 * step(0.0, sunDir.y);
                float fog = 1.0 - exp(-t * fogDen * 1.65); col = mix(col, fogCol, fog);
            } else {
                float h = clamp(rd.y, 0.0, 1.0); col = mix(skyHori, skyTop, pow(h, 0.38));
                float sd = max(dot(rd, sunDir), 0.0); col += sunCol * pow(sd, 380.0) * 6.8 * smoothstep(-0.10, 0.06, sunDir.y);
                float sunDisk = smoothstep(0.99925, 0.99995, dot(rd, sunDir)); col += sunCol * sunDisk * 2.6;
            }
            gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
        }
    `;

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        glRef.current = gl;

        const mkShader = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const program = gl.createProgram();
        gl.attachShader(program, mkShader(gl.VERTEX_SHADER, vs));
        gl.attachShader(program, mkShader(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(program);
        gl.useProgram(program);
        programRef.current = program;

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const ap = gl.getAttribLocation(program, "a");
        gl.enableVertexAttribArray(ap);
        gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

        uniformsRef.current = {
            uR: gl.getUniformLocation(program, "uR"),
            uT: gl.getUniformLocation(program, "uT"),
            uS: gl.getUniformLocation(program, "uS"),
            uSc: gl.getUniformLocation(program, "uSc"),
            uBl: gl.getUniformLocation(program, "uBl"),
            uBg: gl.getUniformLocation(program, "uBg"),
        };

        let rafId;
        let smoothScroll = 0;
        const startTime = performance.now();

        const render = (now) => {
            const time = (now - startTime) / 1000;
            const scroll = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTarget = maxScroll > 0 ? scroll / maxScroll : 0;
            
            smoothScroll += (scrollTarget - smoothScroll) * 0.1;
            
            const N = 5;
            const raw = smoothScroll * (N - 1);
            const si = Math.min(Math.floor(raw), N - 2);
            const bl = raw - si;

            gl.clearColor(0,0,0,1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            gl.uniform2f(uniformsRef.current.uR, canvas.width, canvas.height);
            gl.uniform1f(uniformsRef.current.uT, time);
            gl.uniform1f(uniformsRef.current.uS, smoothScroll);
            gl.uniform1f(uniformsRef.current.uSc, si);
            gl.uniform1f(uniformsRef.current.uBl, bl);
            gl.uniform3f(uniformsRef.current.uBg, 0.04, 0.04, 0.06);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            rafId = requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: -1,
                pointerEvents: 'none'
            }} 
        />
    );
};

export default WebGLScrollSync;
