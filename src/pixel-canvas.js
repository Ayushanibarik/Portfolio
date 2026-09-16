export function initPixelCanvas(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;

    const gap = options.gap || 6;
    const speed = options.speed || 0.02;
    const colors = options.colors || ["#e879f9", "#a78bfa", "#38bdf8", "#22d3ee"];
    
    let cols = 0, rows = 0;
    const pixelSize = Math.max(gap, 4);
    let pixels = [];
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId;

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    };
    
    const parsedColors = colors.map(hexToRgb).filter(Boolean);

    const lerpColor = (c1, c2, t) => {
        const r = Math.round(c1.r + (c2.r - c1.r) * t);
        const g = Math.round(c1.g + (c2.g - c1.g) * t);
        const b = Math.round(c1.b + (c2.b - c1.b) * t);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const getColor = (intensity, phase) => {
        const t = (phase + intensity) % 1;
        const index = Math.floor(t * (parsedColors.length - 1));
        const nextIndex = Math.min(index + 1, parsedColors.length - 1);
        const localT = (t * (parsedColors.length - 1)) % 1;
        return lerpColor(parsedColors[index], parsedColors[nextIndex], localT);
    };

    const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
        
        cols = Math.ceil(rect.width / pixelSize);
        rows = Math.ceil(rect.height / pixelSize);
        
        pixels = [];
        for (let i = 0; i < cols; i++) {
            let row = [];
            for (let j = 0; j < rows; j++) {
                row.push({
                    x: i * pixelSize,
                    y: j * pixelSize,
                    intensity: 0,
                    colorPhase: Math.random()
                });
            }
            pixels.push(row);
        }
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const render = () => {
        if (prefersReducedMotion.matches) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const p = pixels[i][j];
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let targetIntensity = 0;
                if (dist < 100) {
                    targetIntensity = 1 - (dist / 100);
                }
                
                p.intensity += (targetIntensity - p.intensity) * 0.1;
                if (targetIntensity === 0) {
                    p.intensity = Math.max(0, p.intensity - speed);
                }
                
                if (p.intensity > 0.01) {
                    ctx.fillStyle = getColor(p.intensity, p.colorPhase);
                    ctx.globalAlpha = p.intensity;
                    ctx.fillRect(p.x, p.y, pixelSize - 1, pixelSize - 1);
                }
            }
        }
        ctx.globalAlpha = 1.0;
        raf = requestAnimationFrame(render);
    };

    let raf = requestAnimationFrame(render);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
    };
}
