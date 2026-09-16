import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { initPortfolioSections } from "./sections-init.js";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrollToPlugin,
  Flip
);

// Initialize live portfolio dynamic sections
initPortfolioSections();

ScrollSmoother.create({
  smooth: 1, 
  effects: true, 
  smoothTouch: 0.1, 
});

let landingText = SplitText.create(".maintext h1", {
  type: "chars",
  mask: "chars",
});
let alagtext = SplitText.create(".alagtext", {
  type: "words",
  mask: "lines",
});

window.addEventListener("load", () => {
  const counter = document.querySelector(".counter");
  const images = document.querySelectorAll("img");
  const underline = document.querySelector(".underline");
  const imageLength = images.length;

  const tl_loaded = gsap
    .timeline({ paused: true })
    .to(".loadingtext", {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .to(
      ".colordiv",
      {
        y: "-100%",
        duration: 1,
        stagger: {
          each: 0.04,
          from: "edges",
        },
        ease: "expo.inOut",
      },
      "a"
    )
    .to(
      "#bg-loader",
      {
        autoAlpha: 0,
        duration: 1,
        ease: "expo.inOut",
      },
      "a"
    )
    .from(
      ".scaleImage",
      {
        scale: 2,
        duration: 2.5,
        ease: "expo.out",
      },
      "a"
    )
    .from(
      landingText.chars,
      {
        y: "100%",
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.03,
      },
      "a"
    )
    .from(
      alagtext.words,
      {
        y: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.08,
      },
      "a"
    );

  const preloadImage = (image) => {
    return new Promise((resolve) => {
      if (image.complete) {
        resolve();
      } else {
        image.onload = resolve;
        image.onerror = resolve;
      }
    });
  };

  gsap.set(".loadingtext", {
    autoAlpha: 0,
  });

  const startProgress = () => {
    let imagesReady = false;
    let loadedCount = 0;

    if (imageLength === 0) {
      imagesReady = true;
    } else {
      images.forEach((img) => {
        if (img.dataset.src) {
          img.src = `${img.dataset.src}`;
        }
        preloadImage(img).then(() => {
          loadedCount++;
          if (loadedCount >= imageLength) {
            imagesReady = true;
          }
        });
      });
    }

    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 3,
      ease: "power1.inOut",
      onUpdate: () => {
        const current = Math.round(progressObj.value);
        counter.textContent = `${current}%`;
        underline.style.width = `${current}%`;
      },
      onComplete: () => {
        counter.textContent = "100%";
        underline.style.width = "100%";
        if (imagesReady) {
          tl_loaded.play(0);
        } else {
          const checkInterval = setInterval(() => {
            if (imagesReady) {
              clearInterval(checkInterval);
              tl_loaded.play(0);
            }
          }, 80);
        }
      },
    });
  };

  const tl_namaste = gsap
    .timeline()
    .from(".namaste", {
      autoAlpha: 0,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(".namaste", {
      delay: 0.5,
      autoAlpha: 0,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(".loadingtext", {
      autoAlpha: 1,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        startProgress();
      },
    });
});

gsap.to(".image-div", {
  scrollTrigger: {
    trigger: ".image-div",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
  },
});

// navbar animation

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down
    gsap.to("nav", {
      y: "-100%",
      duration: 0.5,
      ease: "power2.Out",
    });
  } else {
    // scrolling up
    gsap.to("nav", {
      y: "0%",
      duration: 0.5,
      ease: "power2.Out",
    });
  }
  lastScrollY = window.scrollY;
});

// links hover interaction

const links = document.querySelectorAll(".links");
let linkAnimating = false;

links.forEach((link, index) => {
  const first = link.querySelector("h3:nth-child(1)");
  const second = link.querySelector("h3:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  link.addEventListener("mouseenter", () => {
    if (linkAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025, 
      ease: "power3.inOut",
      onComplete: () => {
        linkAnimating = false;
      },
    });
  });
});

// button hover interaction

const buttons = document.querySelectorAll(".buttondiv");
let buttonAnimating = false;

buttons.forEach((button, index) => {
  const first = button.querySelector("h2:nth-child(1)");
  const second = button.querySelector("h2:nth-child(2)");
  let h3up = SplitText.create(first, { type: "chars" });
  let h3bottom = SplitText.create(second, { type: "chars" });
  button.addEventListener("mouseenter", () => {
    if (buttonAnimating === true) return;
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "-100%", 
      stagger: 0.025, 
      ease: "power3.inOut",
    });
    linkAnimating = true;
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(h3up.chars, {
      duration: 0.3,
      y: "0%",
      stagger: -0.025,
      ease: "power3.inOut",
    });
    gsap.to(h3bottom.chars, {
      duration: 0.3,
      y: "0%", 
      stagger: -0.025,
      ease: "power3.inOut",
      onComplete: () => {
        buttonAnimating = false;
      },
    });
  });
});

// project animation

const projects = [
  {
    title: "PRAMANIKA",
    link: "https://github.com/Ayushanibarik",
    year: 2026,
    tagline: "AI-Powered Publication Title Admissibility & Verification System.",
    description: `Built an AI-powered verification platform aligned with the Press Registration of Periodicals Act.
    
    Publication title verification requires large-scale semantic comparison, regulatory compliance validation, and explainable risk assessment.
    
    The platform implements an 8-layer verification pipeline connecting title ingestion, normalization, multi-language semantic similarity comparison, rule-aware compliance checks, risk classification, explainability logs, and an administrative governance review dashboard capable of screening 160K+ titles with sub-second indexing.`,
    techStack: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "spaCy",
      "PyTorch",
      "scikit-learn",
      "Sentence Transformers"
    ],
    highlights: [
      "8-Layer End-to-End Regulatory Verification Pipeline",
      "Semantic similarity detection across 160K+ title database",
      "Explainable AI decision trails & governance dashboard",
    ],
    recognition: [
      "Designed for institutional compliance workflows",
      "Enterprise-grade NLP & verification pipeline",
    ],
  },
  {
    title: "VayuNetra",
    link: "https://vayunetra-eta.vercel.app/?backend=https://aaaaaaayush-vayunetra-backend.hf.space",
    year: 2026,
    tagline: "Autonomous Drone Detection, Multi-Sensor Kinematic Fusion & C-UAS Platform.",
    description: `A military-grade Command & Control (C2) situational awareness and counter-unmanned aerial system (C-UAS) platform providing automated real-time drone detection, multi-sensor kinematic fusion, 3D trajectory forecasting, and automated threat evaluation (TEWA).
    
    Combines YOLOv8 & ByteTrack optical tracking with an Extended Kalman Filter (EKF) state estimator, simulated FMCW radar Doppler fusion, a 360° PPI tactical radar scope, and an ESP32 closed-loop PID servo tracking gimbal bridge with real-time WebSocket telemetry HUD.`,
    techStack: [
      "Python",
      "FastAPI",
      "PyTorch",
      "YOLOv8",
      "Extended Kalman Filter",
      "WebSockets",
      "ESP32 / C++",
      "HTML5 Canvas"
    ],
    highlights: [
      "YOLOv8 + ByteTrack optical multi-object tracking with microsecond latency",
      "Kinematic EKF multi-sensor fusion & 3D trajectory forecasting",
      "360° tactical radar scope & closed-loop ESP32 pan-tilt gimbal telemetry",
    ],
    recognition: [
      "Tactical Defense & Aerospace Innovation Project",
      "Full Command & Control live WebSocket telemetry HUD",
    ],
  },
  {
    title: "JanSevak",
    link: "https://jan-sevak-xi.vercel.app/",
    year: 2026,
    tagline: "AI-Powered Citizen Feedback Telemetry & Prioritization System.",
    description: `A multi-modal AI platform integrating NLP, OCR, and GIS to aggregate citizen inputs and objectively prioritize public infrastructure projects.
    
    Citizens can submit feedback via voice, image, or text across regional languages. The system automatically transcribes, translates, clusters duplicate grievances using semantic embeddings, and runs an algorithmic priority scoring engine backed by interactive spatial GIS mapping for administrative governance.`,
    techStack: [
      "Flutter",
      "Next.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "Meta Llama 3",
      "OpenAI Whisper"
    ],
    highlights: [
      "Multi-modal intake: Voice, OCR, Image, and Regional Text",
      "Automated Whisper speech translation & Llama 3 semantic clustering",
      "Interactive PostGIS spatial mapping & AI priority scoring dashboard",
    ],
    recognition: [
      "Smart Governance & Public Infrastructure Tech",
      "Scalable microservices architecture for concurrent AI inference",
    ],
  },
  {
    title: "SAVE",
    link: "https://github.com/Ayushanibarik",
    year: 2026,
    tagline: "Strategic Agent-Based Victim Evacuation & Disaster Response System.",
    description: `An AI-powered emergency coordination platform integrating reinforcement learning optimization, GIS mapping, and automated emergency communication.
    
    The system models victims, dynamic hazard perimeters, hospital capacities, and rescue routes as coordinated agents. It automates triage prioritization, computes optimal evacuation paths in real time, and executes automated emergency voice dispatch to first responders.`,
    techStack: [
      "Python",
      "Flask",
      "Streamlit",
      "PyTorch",
      "Twilio",
      "OpenStreetMap"
    ],
    highlights: [
      "Multi-agent reinforcement learning for hospital & resource allocation",
      "Real-time GIS crisis mapping with dynamic route calculation",
      "Automated Twilio emergency voice calls & AI triage prioritization",
    ],
    recognition: [
      "Disaster Management & Humanitarian AI Project",
      "Rapid-deployment emergency coordination system",
    ],
  },
];

gsap.set(".projectoverlay .colordivs", {
  y: "100%",
});

const projectBox = document.querySelectorAll(".projectBox");
const previews = document.querySelectorAll(".projectPreview");

const projectsOverlay = document.querySelector(".projects-overlay");
const flipTarget = document.querySelector(".projectflip .project-img");
const closeBtn = document.querySelector(".closeBtn");

const heading = document.querySelector(".infoverview .heading");
const right = document.querySelector(".infoverview .right-part");

projectBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    const originalParent = previews[index];

    const project = projects[index];
    heading.innerHTML = `<h3
                class="projecttitle text-[14vw] md:text-[7.6vw] leading-[1] text-white"
              >
                ${project.title}
              </h3>
              <div class="subheading flex items-center gap-[3vw] md:gap-[2vw]">
                <div class="year">
                  <h2
                    class="projectyear text-white text-[4vw] leading-[1.1] md:text-[2vw]"
                  >
                   ${project.year}
                  </h2>
                </div>
                <div class="shortdescription">
                  <h4
                    class="projectshorttag text-white text-[3vw] leading-[1] md:text-[1.3vw]"
                  >
                     ${project.tagline}
                  </h4>
                </div>
              </div>
              <div class="livelink mt-[3vw] md:mt-[1vw]">
                <a target="_blank" href= ${project.link}>
                  <div
                    class="buttondiv w-fit border border-white cursor-pointer px-[3vw] md:px-[2vw] py-[1.5vw] md:py-[0.65vw] bg-[#141618]"
                  >
                    <div class="links cursor-pointer h-[1rem] overflow-hidden">
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                      <h2
                        class="text-white text-[4vw] md:text-[1.3vw] leading-[1]"
                      >
                        live link
                      </h2>
                    </div>
                  </div>
                </a>
              </div>
          `;
    right.innerHTML = `<div class="right-part-wrapper px-[2vw]">
              <div class="description">
                <h2 class="text-white text-[5.5vw] md:text-[2.5vw]">
                  description
                </h2>
                <h4
                  class="text-[2.5vw] md:text-[1.2vw] mt-[1.3vw] text-white leading-[1.2]"
                >
                  ${project.description}
                </h4>
              </div>
              <div
                class="techstackandhighlights mt-[4vw] md:mt-[2vw] h-[25vh] md:h-[20vh] w-full flex md:flex-row flex-col"
              >
                <div
                  class="techstack flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full md:w-[35%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    tech Stack
                  </h2>
                  <div class="tech flex mt-[1.5vw] flex-col gap-[0.2vw]">
                  ${project.techStack
                    .map(
                      (tech) =>
                        `<h4 class="text-white text-[2.5vw] md:text-[0.8vw] leading-[1.1]">${tech}</h4>`
                    )
                    .join("")}
                    
                  </div>
                </div>
                <div
                  class="highlights flex flex-row md:flex-col justify-between h-[50%] md:h-full w-full w-[65%]"
                >
                  <h2 class="text-white text-[4.5vw] md:text-[1.8vw]">
                    highlights
                  </h2>
                  <div
                    class="tech flex mt-[1.5vw] flex-col gap-[1vw] md:gap-[0.4vw]"
                  >
                   ${project.highlights
                     .map(
                       (h) =>
                         `<h4 class="text-white text-[2.5vw] md:text-[1vw] leading-[1.1]">${h}</h4>`
                     )
                     .join("")}
                  </div>
                </div>
              </div>
            </div>`;

    const previewImgDiv = previews[index].querySelector(".project-img");

    let title = SplitText.create(".projecttitle", {
      type: "chars",
      mask: "chars",
    });
    let year = SplitText.create(".projectyear", {
      type: "chars",
      mask: "chars",
    });
    let tag = SplitText.create(".projectshorttag", {
      type: "words",
      mask: "words",
    });

    gsap.set([title.chars, year.chars, tag.words], {
      y: "100%",
    });

    gsap.set(
      [
        ".closeBtn",
        ".livelink",
        ".description h2",
        ".techstackandhighlights h2",
        ".right-part-wrapper",
      ],
      {
        autoAlpha: 0,
      }
    );

    
    function closeProject() {
      
      closeBtn.removeEventListener("click", closeProject);

      const state = Flip.getState(previewImgDiv);

      gsap
        .timeline() // Flip animation (move image back to original box)
        .to(
          [
            ".closeBtn",
            ".livelink",
            ".description h2",
            ".techstackandhighlights h2",
            ".right-part-wrapper",
          ],
          {
            autoAlpha: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "a"
        )
        .to(
          [title.chars, year.chars, tag.words],
          {
            y: "100%",
            stagger: 0.05,
            duration: 1.4,
            ease: "expo.out",
          },
          "a"
        )
        .add(() => {
          originalParent.appendChild(previewImgDiv);
          Flip.from(state, {
            delay: 0.8,
            duration: 1.2,
            ease: "power3.inOut",
            absolute: true,
            scale: true,
          }, "a");
        })
        .to(".projectoverlay .colordivs", {
          y: "-100%",
          duration: 1,
          stagger: {
            each: 0.07,
            from: "edges",
          },
          ease: "power2.inOut",
          onComplete: () => {
            projectsOverlay.classList.add("hidden");
            gsap.set(".projectoverlay .colordivs", {
              y: "100%",
            });
          },
        });
    }

    
    const state = Flip.getState(previewImgDiv);

    // Make overlay visible
    projectsOverlay.classList.remove("hidden");

    // Add close event listener (once)
    closeBtn.addEventListener("click", closeProject);

    gsap
      .timeline()
      // Flip image into overlay target
      .add(() => {
        flipTarget.appendChild(previewImgDiv);
        Flip.from(state, {
          delay: 0.8,
          duration: 1,
          ease: "power3.inOut",
          absolute: true,
          scale: true,
        });
      })
      .to(".projectoverlay .colordivs", {
        y: "0%",
        duration: 1,
        stagger: {
          each: 0.07,
          from: "edges",
        },
        ease: "power2.inOut",
      })
      .to(
        [
          ".closeBtn",
          ".livelink",
          ".description h2",
          ".techstackandhighlights h2",
          ".right-part-wrapper",
        ],
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "a"
      )
      .to(
        [title.chars, year.chars, tag.words],
        {
          y: "0%",
          stagger: 0.05,
          duration: 1.4,
          ease: "expo.out",
        },
        "a"
      );
  });

  box.addEventListener("mouseenter", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "0%", // reveal the preview
      duration: 1.2,
      ease: "expo.out",
    });
    gsap.to(image, {
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    });
  });

  box.addEventListener("mouseleave", () => {
    const image = previews[index].querySelector(".project-img img");
    gsap.to(previews[index], {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    }); // optional speed adjustment
    gsap.to(image, {
      scale: 1.2,
      duration: 1,
      ease: "expo.out",
    });
  });

  window.addEventListener("scroll", () => {
    gsap.to(previews, {
      "--moveX": "100%", // hide again
      duration: 1,
      ease: "expo.out",
    });
  });
});

// nav

const about = document.querySelector("#aboutlink");
const project = document.querySelector("#projectlink");
const experience = document.querySelector("#experiencelink");
const arsenal = document.querySelector("#arsenallink");
const reco = document.querySelector("#recolink");
const endorse = document.querySelector("#endorselink");
const contact = document.querySelector("#contactlink");

if (about) {
  about.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#about", ease: "power2.out" });
  });
}
if (project) {
  project.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#projects", ease: "power2.out" });
  });
}
if (experience) {
  experience.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#experience", ease: "power2.out" });
  });
}
if (arsenal) {
  arsenal.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#arsenal", ease: "power2.out" });
  });
}
if (reco) {
  reco.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#cover", ease: "power2.out" });
  });
}
if (endorse) {
  endorse.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#endorsements", ease: "power2.out" });
  });
}
if (contact) {
  contact.addEventListener("click", () => {
    gsap.to(window, { duration: 0.8, scrollTo: "#contact", ease: "power2.out" });
  });
}
