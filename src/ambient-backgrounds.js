// ============================================================
// AMBIENT BACKGROUNDS – Vanilla-JS ports of Componentry shaders
// Silk Aurora · Magnet Lines · Closing Plasma
// ============================================================

/* ── shared WebGL helpers ── */
function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function linkProgram(gl, vs, fs) {
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("Program link error:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function hexToRgb01(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function createFullscreenQuad(gl, program) {
  const pos = gl.getAttribLocation(program, "position");
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  return buf;
}

// ============================================================
// 1.  SILK AURORA  –  flowing silk ribbons with pointer glow
// ============================================================
const SILK_VERT = `attribute vec2 position;
void main(){ gl_Position=vec4(position,0.,1.); }`;

const SILK_FRAG = `precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_speed;
uniform float u_intensity;
uniform float u_grain;
uniform float u_vignette;
uniform float u_mouseInfluence;
uniform vec3 u_base;
uniform vec3 u_mid;
uniform vec3 u_sheen;
uniform vec3 u_accent;

float hash(vec2 p){return fract(sin(dot(p,vec2(41.93,289.17)))*43758.5453);}

float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 r=mat2(.82,.57,-.57,.82);
  for(int i=0;i<5;i++){v+=a*noise(p);p=r*p*2.03;a*=.5;}
  return v;
}

float ribbon(vec2 p,float off,float w,float s){
  float y=p.y+sin(p.x*1.8+off)*.18;
  y+=sin(p.x*4.2-off*.7)*.045;
  return smoothstep(w+s,w,abs(y));
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/max(u_res.y,1.);
  vec2 p=(uv-.5)*vec2(asp,1.);
  vec2 mouse=(u_mouse-.5)*vec2(asp,1.);
  float t=u_time*.12*u_speed;
  float pf=smoothstep(.72,0.,length(p-mouse));
  p+=(mouse-p)*pf*.05*u_mouseInfluence;

  vec2 silk=p;
  silk.x+=fbm(p*1.6+vec2(t*.8,-t*.35))*.16;
  silk.y+=fbm(p*2.2+vec2(-t*.25,t*.7))*.10;

  float vA=ribbon(silk+vec2(-.18,.08),t*2.1,.055,.22);
  float vB=ribbon(silk*vec2(.86,1.18)+vec2(.2,-.14),-t*2.8+1.7,.038,.18);
  float vC=ribbon(silk*vec2(1.18,.9)+vec2(-.08,.24),t*1.4-2.1,.03,.16);

  float atm=fbm(p*1.35+vec2(t*.22,-t*.1));
  float pearl=pow(max(0.,sin((p.x-p.y)*7.5+atm*4.-t*2.5)),5.);
  float glint=pow(max(0.,noise(gl_FragCoord.xy*.065+t*18.)-.72),5.);

  vec3 col=u_base;
  col=mix(col,u_mid,smoothstep(-.45,.75,p.y+atm*.75));
  col+=u_accent*vA*.72*u_intensity;
  col+=u_sheen*vB*.64*u_intensity;
  col+=mix(u_sheen,u_accent,.35)*vC*.42*u_intensity;
  col+=u_sheen*pearl*.075*u_intensity;
  col+=vec3(1.,.93,.82)*glint*.22*u_intensity;
  col+=u_sheen*pf*.08*u_mouseInfluence;

  float vig=smoothstep(1.25,.22,length(p));
  col*=mix(1.-u_vignette*.42,1.06,vig);

  float grain=(hash(gl_FragCoord.xy+t*90.)-.5)*.08*u_grain;
  col+=grain;

  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;

export function initSilkAurora(containerEl, opts = {}) {
  if (!containerEl) return null;
  const {
    baseColor = "#050507",
    midColor  = "#14151d",
    sheenColor = "#f4dfb8",
    accentColor = "#6ed6c9",
    speed = 1,
    intensity = 1,
    grain = 0.85,
    vignette = 1,
    mouseInfluence = 1,
  } = opts;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
  containerEl.style.position = "relative";
  containerEl.insertBefore(canvas, containerEl.firstChild);

  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) { canvas.remove(); return null; }

  const vs = compileShader(gl, gl.VERTEX_SHADER, SILK_VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, SILK_FRAG);
  if (!vs || !fs) { canvas.remove(); return null; }

  const prog = linkProgram(gl, vs, fs);
  if (!prog) { canvas.remove(); return null; }

  gl.useProgram(prog);
  const buf = createFullscreenQuad(gl, prog);

  const u = {};
  ["u_res","u_mouse","u_time","u_speed","u_intensity","u_grain",
   "u_vignette","u_mouseInfluence","u_base","u_mid","u_sheen","u_accent"
  ].forEach(n => { u[n] = gl.getUniformLocation(prog, n); });

  // colors
  const base = hexToRgb01(baseColor);
  const mid  = hexToRgb01(midColor);
  const sheen = hexToRgb01(sheenColor);
  const accent = hexToRgb01(accentColor);
  gl.uniform3f(u.u_base, ...base);
  gl.uniform3f(u.u_mid, ...mid);
  gl.uniform3f(u.u_sheen, ...sheen);
  gl.uniform3f(u.u_accent, ...accent);

  // mouse tracking
  const mouse = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  const onMove = (e) => {
    const r = containerEl.getBoundingClientRect();
    target.x = (e.clientX - r.left) / r.width;
    target.y = 1 - (e.clientY - r.top) / r.height;
  };
  const onLeave = () => { target.x = 0.5; target.y = 0.5; };
  containerEl.addEventListener("pointermove", onMove);
  containerEl.addEventListener("pointerleave", onLeave);

  // resize
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const { width, height } = containerEl.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.u_res, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(containerEl);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = performance.now();
  let raf = 0;

  const render = (now) => {
    mouse.x += (target.x - mouse.x) * 0.045;
    mouse.y += (target.y - mouse.y) * 0.045;

    const elapsed = reduced ? 8 : (now - start) / 1000;
    gl.uniform2f(u.u_mouse, mouse.x, mouse.y);
    gl.uniform1f(u.u_time, elapsed);
    gl.uniform1f(u.u_speed, reduced ? 0 : speed);
    gl.uniform1f(u.u_intensity, intensity);
    gl.uniform1f(u.u_grain, grain);
    gl.uniform1f(u.u_vignette, vignette);
    gl.uniform1f(u.u_mouseInfluence, reduced ? 0 : mouseInfluence);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(raf);
    containerEl.removeEventListener("pointermove", onMove);
    containerEl.removeEventListener("pointerleave", onLeave);
    ro.disconnect();
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    canvas.remove();
  };
}

// ============================================================
// 2.  MAGNET LINES  –  CSS grid of lines that rotate to cursor
// ============================================================
export function initMagnetLines(containerEl, opts = {}) {
  if (!containerEl) return null;
  const {
    rows = 9,
    columns = 9,
    lineColor = "rgba(255,255,255,0.12)",
    lineWidth = "1px",
    lineHeight = "28px",
    baseAngle = 0,
  } = opts;

  const wrapper = document.createElement("div");
  wrapper.className = "magnet-lines-bg";
  wrapper.style.cssText = `
    position:absolute;inset:0;z-index:0;pointer-events:none;
    display:grid;place-items:center;
    grid-template-columns:repeat(${columns},1fr);
    grid-template-rows:repeat(${rows},1fr);
    opacity:0.55;
  `;
  containerEl.style.position = "relative";
  containerEl.insertBefore(wrapper, containerEl.firstChild);

  const total = rows * columns;
  const lines = [];

  for (let i = 0; i < total; i++) {
    const line = document.createElement("div");
    line.style.cssText = `
      width:${lineWidth};height:${lineHeight};
      background:${lineColor};border-radius:1px;
      transform:rotate(${baseAngle}deg);
      transition:transform 0.18s cubic-bezier(.4,.0,.2,1);
      will-change:transform;
    `;
    wrapper.appendChild(line);
    lines.push(line);
  }

  const onMove = (e) => {
    for (const line of lines) {
      const rect = line.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      line.style.transform = `rotate(${angle + baseAngle}deg)`;
    }
  };

  const onLeave = () => {
    for (const line of lines) {
      line.style.transform = `rotate(${baseAngle}deg)`;
    }
  };

  // Use window-level pointer so lines react even when pointer-events:none
  window.addEventListener("mousemove", onMove, { passive: true });
  containerEl.addEventListener("mouseleave", onLeave);

  return () => {
    window.removeEventListener("mousemove", onMove);
    containerEl.removeEventListener("mouseleave", onLeave);
    wrapper.remove();
  };
}

// ============================================================
// 3.  CLOSING PLASMA  –  turbulent flow field with sparkle
// ============================================================
const PLASMA_VERT = `attribute vec2 position;
void main(){ gl_Position=vec4(position,0.,1.); }`;

const PLASMA_FRAG = `precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_mouseInfluence;
uniform float u_grain;
uniform float u_sparkle;
uniform float u_vignette;
uniform float u_opacity;
uniform vec3 u_colA;
uniform vec3 u_colB;
uniform vec3 u_colC;

vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289v2(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289v3(((x*34.)+1.)*x);}

float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
  i=mod289v2(i);
  vec3 p=permute(permute(i.y+vec3(0,i1.y,1.))+i.x+vec3(0,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-.5;
  vec3 ox=floor(x+.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

float fbm(vec2 p,float turb){
  float tot=0.,amp=.5,freq=1.;
  mat2 rot=mat2(cos(.45),sin(.45),-sin(.45),cos(.45));
  for(int i=0;i<5;i++){
    tot+=snoise(p*freq)*amp;
    p=rot*p;
    freq*=mix(1.85,2.35,clamp(turb,0.,2.)*.5);
    amp*=.5;
  }
  return tot;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/max(u_res.y,1.);
  vec2 p=(uv-.5)*vec2(asp,1.);
  float t=u_time*(.15*u_speed);

  vec2 mouse=(u_mouse-.5)*vec2(asp,1.);
  float dM=length(p-mouse);
  p+=(mouse-p)*.02*u_mouseInfluence*smoothstep(.45,0.,dM);

  vec2 flow=vec2(
    fbm(p+vec2(t*.2,t*.1),u_turbulence),
    fbm(p+vec2(-t*.1,t*.3),u_turbulence)
  );

  float n=fbm(p*2.+flow*1.45,u_turbulence);
  float ridges=1.-abs(snoise(p*4.+n)*2.);
  ridges=pow(ridges,3.);

  vec3 col=mix(u_colA,u_colB,smoothstep(-.5,.5,n));
  col=mix(col,u_colC,smoothstep(.25,1.,n*.52+ridges*.48));

  float sparkle=pow(max(0.,snoise(gl_FragCoord.xy*.2+t*2.)),18.)*.5*u_sparkle;
  col+=vec3(.8,.9,1.)*sparkle;

  float vig=1.-smoothstep(.5,1.55,length(p));
  col=mix(col,col*vig,u_vignette);

  float grain=(fract(sin(dot(gl_FragCoord.xy+t*50.,vec2(12.9898,78.233)))*43758.5453)-.5)*(.06*u_grain);
  col+=grain;

  gl_FragColor=vec4(clamp(col,0.,1.),u_opacity);
}`;

export function initClosingPlasma(containerEl, opts = {}) {
  if (!containerEl) return null;
  const {
    colorA = "#0d0d14",
    colorB = "#1f2540",
    colorC = "#4a6191",
    speed = 1,
    turbulence = 1,
    mouseInfluence = 1,
    grain = 1,
    sparkle = 1,
    vignette = 1,
    opacity = 0.75,
  } = opts;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
  containerEl.style.position = "relative";
  containerEl.insertBefore(canvas, containerEl.firstChild);

  const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
  if (!gl) { canvas.remove(); return null; }

  const vs = compileShader(gl, gl.VERTEX_SHADER, PLASMA_VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, PLASMA_FRAG);
  if (!vs || !fs) { canvas.remove(); return null; }

  const prog = linkProgram(gl, vs, fs);
  if (!prog) { canvas.remove(); return null; }

  gl.useProgram(prog);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  const buf = createFullscreenQuad(gl, prog);

  const u = {};
  ["u_res","u_time","u_mouse","u_speed","u_turbulence","u_mouseInfluence",
   "u_grain","u_sparkle","u_vignette","u_opacity","u_colA","u_colB","u_colC"
  ].forEach(n => { u[n] = gl.getUniformLocation(prog, n); });

  const cA = hexToRgb01(colorA);
  const cB = hexToRgb01(colorB);
  const cC = hexToRgb01(colorC);
  gl.uniform3f(u.u_colA, ...cA);
  gl.uniform3f(u.u_colB, ...cB);
  gl.uniform3f(u.u_colC, ...cC);

  const mouse = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  const onMove = (e) => {
    const r = containerEl.getBoundingClientRect();
    target.x = (e.clientX - r.left) / r.width;
    target.y = 1 - (e.clientY - r.top) / r.height;
  };
  const onLeave = () => { target.x = 0.5; target.y = 0.5; };
  containerEl.addEventListener("pointermove", onMove);
  containerEl.addEventListener("pointerleave", onLeave);

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const { width, height } = containerEl.getBoundingClientRect();
    canvas.width  = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.u_res, canvas.width, canvas.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(containerEl);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startT = performance.now();
  let raf = 0;

  const render = (now) => {
    mouse.x += (target.x - mouse.x) * 0.045;
    mouse.y += (target.y - mouse.y) * 0.045;

    const elapsed = reduced ? 8 : (now - startT) / 1000;
    gl.uniform2f(u.u_mouse, mouse.x, mouse.y);
    gl.uniform1f(u.u_time, elapsed);
    gl.uniform1f(u.u_speed, reduced ? 0 : speed);
    gl.uniform1f(u.u_turbulence, turbulence);
    gl.uniform1f(u.u_mouseInfluence, reduced ? 0 : mouseInfluence);
    gl.uniform1f(u.u_grain, grain);
    gl.uniform1f(u.u_sparkle, sparkle);
    gl.uniform1f(u.u_vignette, vignette);
    gl.uniform1f(u.u_opacity, opacity);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(raf);
    containerEl.removeEventListener("pointermove", onMove);
    containerEl.removeEventListener("pointerleave", onLeave);
    ro.disconnect();
    gl.deleteBuffer(buf);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    canvas.remove();
  };
}
