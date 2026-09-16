export function initLiquidChrome(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return null;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_baseColor;
      
      const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
      float hash( vec2 p ) {
          float h = dot(p,vec2(127.1,311.7));
          return fract(sin(h)*43758.5453123);
      }
      float noise( in vec2 p ) {
          vec2 i = floor( p );
          vec2 f = fract( p );
          vec2 u = f*f*(3.0-2.0*f);
          return mix( mix( hash( i + vec2(0.0,0.0) ), hash( i + vec2(1.0,0.0) ), u.x),
                      mix( hash( i + vec2(0.0,1.0) ), hash( i + vec2(1.0,1.0) ), u.x), u.y);
      }
      float fbm( vec2 p ) {
          float f = 0.0;
          f += 0.5000*noise( p ); p = m*p*2.02;
          f += 0.2500*noise( p ); p = m*p*2.03;
          f += 0.1250*noise( p ); p = m*p*2.01;
          f += 0.0625*noise( p );
          return f/0.9375;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = -1.0 + 2.0 * uv;
        if (u_resolution.y > 0.0) {
            p.x *= u_resolution.x / u_resolution.y;
        }
        vec2 mouse = (u_mouse - 0.5) * 2.0;
        if (u_resolution.y > 0.0) {
            mouse.x *= u_resolution.x / u_resolution.y;
        }
        vec2 diff = p - mouse;
        float dist = length(diff);
        vec2 distortion = vec2(0.0);
        if (dist > 0.0) {
            distortion = (diff / dist) * exp(-dist * 3.0) * 0.1;
        }
        p += distortion;
        float time = u_time * 0.4;
        vec2 q = vec2(0.0);
        q.x = fbm(p + vec2(0.0, 0.0) + time * 0.1);
        q.y = fbm(p + vec2(5.2, 1.3) + time * 0.15);
        vec2 r = vec2(0.0);
        r.x = fbm(p + 4.0 * q + vec2(1.7, 9.2) + time * 0.2);
        r.y = fbm(p + 4.0 * q + vec2(8.3, 2.8) + time * 0.25);
        float f = fbm(p + r * 4.0 * 0.6);
        
        vec3 col = u_baseColor;
        float highlight = smoothstep(0.4, 0.6, f);
        float highlight2 = smoothstep(0.6, 0.8, f);
        float dark = smoothstep(0.1, 0.3, f);
        
        col = mix(col, vec3(0.0), 1.0 - dark);
        col = mix(col, vec3(0.1, 0.1, 0.12), highlight);
        col = mix(col, vec3(0.2, 0.3, 0.35), highlight2);
        
        float v = 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        col *= 0.5 + 0.5 * pow(max(0.0, v), 0.2);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compileShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uBaseColor = gl.getUniformLocation(program, 'u_baseColor');

    const baseColor = options.baseColor || [0.03, 0.03, 0.04];
    gl.uniform3f(uBaseColor, baseColor[0], baseColor[1], baseColor[2]);

    let targetMouse = { x: 0.5, y: 0.5 }, currentMouse = { x: 0.5, y: 0.5 };
    let startTime = performance.now();
    let animationFrameId;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const render = () => {
        if (prefersReducedMotion.matches) return;
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
        
        gl.uniform2f(uMouse, currentMouse.x, currentMouse.y);
        gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        raf = requestAnimationFrame(render);
    };

    let raf = requestAnimationFrame(render);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
    };
}
