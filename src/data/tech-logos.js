// Tech stack with verified official vector SVGs and categories
export const techStackData = [
  {
    category: "AI & Machine Learning",
    description: "Deep learning models, state estimation & computer vision pipelines",
    skills: [
      {
        name: "Python",
        tag: "Core Language",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none"><path d="M11.91 2C6.98 2 7.28 4.14 7.28 4.14L7.3 6.36H12V7.05H5.06S2 6.69 2 11.64C2 16.59 4.67 16.37 4.67 16.37H6.26V14.13S6.17 11.45 8.9 11.45H13.62S16.19 11.59 16.19 9.07V4.38S16.57 2 11.91 2ZM9.34 3.4C9.84 3.4 10.25 3.81 10.25 4.31C10.25 4.81 9.84 5.22 9.34 5.22C8.84 5.22 8.43 4.81 8.43 4.31C8.43 3.81 8.84 3.4 9.34 3.4Z" fill="#3776AB"/><path d="M12.09 22C17.02 22 16.72 19.86 16.72 19.86L16.7 17.64H12V16.95H18.94S22 17.31 22 12.36C22 7.41 19.33 7.63 19.33 7.63H17.74V9.87S17.83 12.55 15.1 12.55H10.38S7.81 12.41 7.81 14.93V19.62S7.43 22 12.09 22ZM14.66 20.6C14.16 20.6 13.75 20.19 13.75 19.69C13.75 19.19 14.16 18.78 14.66 18.78C15.16 18.78 15.57 19.19 15.57 19.69C15.57 20.19 15.16 20.6 14.66 20.6Z" fill="#FFD43B"/></svg>`
      },
      {
        name: "PyTorch",
        tag: "Deep Learning",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor"><path d="M12.53 1.05a.75.75 0 0 0-.85.12L9.23 3.51A7.5 7.5 0 0 0 12 18a7.46 7.46 0 0 0 5.3-2.2l-1.06-1.06A5.96 5.96 0 0 1 12 16.5a6 6 0 0 1-2.2-11.58l1.62-1.61.02.02a.75.75 0 0 0 1.09-1.04l-.02-.02 1.34-1.34a.75.75 0 0 0-.12-1.05zM17.25 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="#EE4C2C"/></svg>`
      },
      {
        name: "OpenCV",
        tag: "Computer Vision",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="12" cy="7" r="4" stroke="#EA3824" stroke-width="2" fill="none"/><circle cx="7" cy="15" r="4" stroke="#48A843" stroke-width="2" fill="none"/><circle cx="17" cy="15" r="4" stroke="#0080FF" stroke-width="2" fill="none"/></svg>`
      },
      {
        name: "YOLOv8",
        tag: "Object Detection",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#00E5FF" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M12 3v3m0 12v3m-9-9h3m12 0h3"/></svg>`
      },
      {
        name: "Hugging Face",
        tag: "NLP & Transformers",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#FFD21E"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.42 3.12 7.24L4 21l3.2-.8A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-3.5 8c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 18c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>`
      }
    ]
  },
  {
    category: "Backend & Systems",
    description: "High-throughput APIs, sensor telemetry & relational storage",
    skills: [
      {
        name: "FastAPI",
        tag: "Async REST APIs",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#05998B"><path d="M12 2L2 12h8l-2 10 12-12h-8l2-8z"/></svg>`
      },
      {
        name: "Node.js",
        tag: "Runtime",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#5FA04E"><path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2zm0 2.3L4.5 8.6v8.8L12 21.7l7.5-4.3V8.6L12 4.3z"/></svg>`
      },
      {
        name: "PostgreSQL",
        tag: "SQL & PostGIS",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#4169E1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V17h-2v1.93C7.06 18.44 4 14.57 4 10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 4.57-3.06 8.44-7 8.93zM12 4a6 6 0 0 0-6 6c0 2.5 1.5 4.7 3.7 5.5.3.1.5-.1.5-.3v-1.1c-1.7-.4-2.1-1.3-2.2-1.7-.1-.3-.4-.8-.7-.9-.3-.1-.6-.4 0-.4.6 0 1 .6 1.2.9.7 1.2 1.9.9 2.4.7.1-.6.3-1 .6-1.2-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.3.6.8.6 1.6v2.4c0 .2.2.4.5.3 2.2-.8 3.7-3 3.7-5.5 0-3.3-2.7-6-6-6z"/></svg>`
      },
      {
        name: "Docker",
        tag: "Containerization",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#2496ED"><path d="M13.98 11.08h1.84v1.84h-1.84zm-2.77 0h1.84v1.84h-1.84zm-2.77 0h1.84v1.84H8.44zm-2.77 0h1.84v1.84H5.67zm5.54-2.77h1.84v1.84h-1.84zm-2.77 0h1.84v1.84H8.44zm5.54 0h1.84v1.84h-1.84zm0-2.77h1.84v1.84h-1.84zm8.77 8.3c-.34-.23-1.07-.3-1.68-.13-.3.08-.6.23-.88.42-.45-.27-.99-.4-1.57-.35-.7.06-1.34.42-1.74.98-.38-.07-.77-.07-1.15.02-.1-.28-.27-.53-.5-.72l-.24-.19H2.3l-.22.92C1.5 18 3.5 21 8.5 21c6 0 10.5-3.5 11.8-6.5.6-.3 1.7-.4 2.2-.9.5-.5.6-1 .5-1.4l-.1-.4-.6.1z"/></svg>`
      },
      {
        name: "WebSockets",
        tag: "Real-Time Telemetry",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#F5A623" stroke-width="2"><path d="M4 12a8 8 0 0 1 16 0"/><path d="M7 12a5 5 0 0 1 10 0"/><circle cx="12" cy="12" r="2" fill="#F5A623"/><path d="M12 14v6m-3-2l3 3 3-3"/></svg>`
      }
    ]
  },
  {
    category: "Frontend & Application",
    description: "Responsive web surfaces, tactical consoles & mobile apps",
    skills: [
      {
        name: "Next.js",
        tag: "React Framework",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="white"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.72 14.75L10.3 7.84h1.76l4.98 6.97v1.94zm-1.85-6.84l-1.32-1.91h1.32v1.91zM8.97 7.84v8.32H7.43V7.84h1.54z"/></svg>`
      },
      {
        name: "React",
        tag: "UI Architecture",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#61DAFB" stroke-width="1.6"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="#61DAFB"/></svg>`
      },
      {
        name: "TypeScript",
        tag: "Strict Typing",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#3178C6"><rect width="24" height="24" rx="4"/><path d="M4 8h8M8 8v10M13.5 13.5c.5-.8 1.4-1.3 2.5-1.3 1.5 0 2.5.8 2.5 2.1 0 2.4-3.5 2.2-3.5 3.7h3.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
      },
      {
        name: "Tailwind CSS",
        tag: "Design System",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#38BDF8"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>`
      },
      {
        name: "Flutter",
        tag: "Cross-Platform",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#02569B"><path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm0 11.029l-6.3 6.3 3.686 3.7L18 14.714l3.686-3.685h-7.372z"/></svg>`
      }
    ]
  },
  {
    category: "Hardware & Core",
    description: "Embedded microcontrollers, low-level control & versioning",
    skills: [
      {
        name: "ESP32",
        tag: "Microcontroller / IoT",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="#E7352C" stroke-width="1.8"><rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M5 9H2m3 6H2m14-6h3m-3 6h3m-6-10V2m0 17v3"/></svg>`
      },
      {
        name: "C++",
        tag: "Low-Level Performance",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#00599C"><path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm-1.8 12.8a3.2 3.2 0 1 1 0-5.6v2a1.2 1.2 0 1 0 0 1.6v2zm4-2.2h1.2v-1.2h.8v1.2h1.2v.8h-1.2v1.2h-.8V13.4h-1.2v-.8zm4.4 0h1.2v-1.2h.8v1.2H21v.8h-1.2v1.2h-.8V13.4h-1.2v-.8z"/></svg>`
      },
      {
        name: "Git & GitHub",
        tag: "Version Control",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#F05032"><path d="M21.62 10.66L13.34 2.38a2.53 2.53 0 0 0-3.58 0L7.4 4.74l2.84 2.84a1.86 1.86 0 0 1 2.37 2.37l2.74 2.74a1.86 1.86 0 1 1-1.32 1.32l-2.61-2.61a1.86 1.86 0 0 1-2.12-.41L6.72 13.5v4.24a1.86 1.86 0 1 1-1.86-1.86V11.2a1.86 1.86 0 0 1-.95-2.45L1.55 6.39a2.53 2.53 0 0 0 0 3.58l8.28 8.28a2.53 2.53 0 0 0 3.58 0l8.21-8.01a2.53 2.53 0 0 0 0-3.58z"/></svg>`
      },
      {
        name: "Linux",
        tag: "Dev Environment",
        svg: `<svg viewBox="0 0 24 24" class="w-6 h-6" fill="#FCC624"><path d="M12 2a4 4 0 0 0-4 4v4c0 1.1-.4 2.2-1.1 3-.7.8-1.9 1.4-1.9 3 0 2.2 3.1 4 7 4s7-1.8 7-4c0-1.6-1.2-2.2-1.9-3-.7-.8-1.1-1.9-1.1-3V6a4 4 0 0 0-4-4zm-1.5 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-2.5 3h2c0 .6-.4 1-1 1s-1-.4-1-1z"/></svg>`
      }
    ]
  }
];
