import type { LucideIcon } from "lucide-react";
import {
  Award,
  Brain,
  CircuitBoard,
  Code2,
  Compass,
  Github,
  GraduationCap,
  Layers3,
  Lightbulb,
  Instagram,
  Linkedin,
  Mail,
  Map,
  Rocket,
  ShieldCheck,
  Workflow,
  Zap
} from "lucide-react";

export type Project = {
  name: string;
  label: string;
  title: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  highlights: string[];
  technologies: string[];
  challenges: string[];
  lessons: string[];
  future: string[];
  emphasis?: "flagship" | "standard";
  url?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type TimelineItem = {
  year: string;
  text: string;
};

export const site = {
  baseUrl: "https://ayushanimeshbarik.co.in",
  name: "Ayush Animesh Barik",
  initials: "AB",
  tagline: "Building intelligent systems for real-world impact.",
  role: "AI Enthusiast • Full-Stack Developer • Builder • Engineering Student",
  university: "Institute of Technical Education and Research (ITER), SOA University",
  cgpa: "8.0",
  graduation: "2028",
  email: "ayushanimeshbarik@gmail.com",
  instagram: "https://www.instagram.com/__ayush.animesh__",
  github: "https://github.com/Ayushanibarik",
  linkedin: "https://www.linkedin.com/in/ayushanimeshbarik",
  resumePath: "/resume.pdf",
  portrait: "/images/ayush-portrait.jpg",
  nav: [
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Mission", href: "#mission" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "Digital headquarters",
    headline:
      "Building intelligent systems, solving meaningful problems, and exploring the future through technology.",
    mission:
      "I am a B.Tech student at ITER, SOA University driven by curiosity and a passion for building technology that creates real-world impact. My interests span Artificial Intelligence, software engineering, product development, and entrepreneurship.",
    primaryCta: "View Selected Work",
    resumeCta: "Download Resume",
    githubCta: "View My GitHub",
    connectCta: "Connect"
  },
  signals: [
    { label: "University", value: "ITER, SOA University", icon: GraduationCap },
    { label: "CGPA", value: "8.0", icon: Award },
    { label: "Graduation", value: "Expected 2028", icon: Rocket },
    { label: "Direction", value: "AI systems and product ventures", icon: Compass }
  ] satisfies Array<{ label: string; value: string; icon: LucideIcon }>,
  currentMission: {
    title: "Current Mission",
    body:
      "My goal is to become a world-class builder by continuously learning, experimenting, and shipping products that solve meaningful problems.",
    focusAreas: [
      "Artificial Intelligence",
      "AI Agents",
      "Full Stack Development",
      "Product Development",
      "Entrepreneurship",
      "System Design"
    ]
  },
  about: {
    title: "A Little About Me",
    paragraphs: [
      "I approach technology as a way to understand systems: how people make decisions, how institutions create rules, how information moves, and how software can make complicated workflows clearer.",
      "My strongest learning happens when I build. I like taking an ambiguous problem, breaking it into smaller operating parts, and turning the result into a product surface that someone can reason about.",
      "Right now, I am focused on becoming the kind of engineer who can move from idea to architecture to shipped execution while keeping the product useful, the system understandable, and the ambition high."
    ]
  },
  drives: {
    title: "What Drives Me",
    body:
      "I'm fascinated by how technology can solve complex real-world problems. Whether it's regulatory intelligence, disaster response, or consumer trust systems, I enjoy building products that combine technical depth with practical impact. I believe meaningful learning happens through execution, experimentation, and continuous iteration.",
    principles: [
      { title: "Systems First", text: "Understand the workflow before choosing the tool.", icon: CircuitBoard, avatar: "/images/avatar-systems.png" },
      { title: "Execution Bias", text: "Convert curiosity into working products and sharper judgment.", icon: Zap, avatar: "/images/avatar-execution.png" },
      { title: "Practical AI", text: "Use intelligence where it can clarify, prioritize, or coordinate.", icon: Brain, avatar: "/images/avatar-ai.png" }
    ] satisfies Array<{ title: string; text: string; icon: LucideIcon; avatar: string }>
  },
  projects: [
    {
      name: "PRAMANIKA",
      label: "Flagship case study",
      title: "AI-Powered Publication Title Admissibility & Verification System",
      problem:
        "Publication title verification requires large-scale title comparison, regulatory compliance validation, and risk assessment.",
      solution:
        "Built an AI-powered verification platform aligned with the Press Registration of Periodicals Act.",
      architecture:
        "A layered verification pipeline connects title ingestion, normalization, semantic comparison, compliance checks, risk classification, explainability, and governance review into one decision workflow.",
      features: [
        "Title normalization and semantic comparison",
        "Similarity detection across large title sets",
        "Rule-aware compliance validation",
        "Explainable decision trails",
        "Risk classification and review dashboard"
      ],
      highlights: [
        "8-Layer Verification Pipeline",
        "NLP",
        "Explainable AI",
        "Regulatory Compliance Engine",
        "Similarity Detection",
        "Risk Classification",
        "Governance Dashboard",
        "160K+ Verification Capability"
      ],
      technologies: [
        "Python",
        "FastAPI",
        "Next.js",
        "TypeScript",
        "SQLite",
        "SQLAlchemy",
        "spaCy",
        "PyTorch",
        "scikit-learn",
        "Sentence Transformers"
      ],
      challenges: [
        "Balancing semantic similarity with rule-based admissibility checks",
        "Making AI-assisted decisions interpretable enough for governance workflows",
        "Designing a pipeline that can reason across multiple risk signals"
      ],
      lessons: [
        "AI systems need clear decision boundaries, not only model outputs.",
        "Compliance products benefit from explainability as a first-class feature.",
        "Good architecture turns a complex policy problem into a reviewable workflow."
      ],
      future: [
        "Improve multilingual and regional title handling",
        "Add deeper audit workflows for reviewer collaboration",
        "Explore stronger retrieval and ranking strategies for large title corpora"
      ],
      emphasis: "flagship"
    },
    {
      name: "VayuNetra",
      label: "Military C2 & C-UAS Platform",
      title: "Autonomous Drone Detection, Multi-Sensor Kinematic Fusion & Tracking System",
      problem:
        "Airspace defense against rogue, high-speed, and low-altitude unauthorized UAS requires microsecond-latency detection, multi-sensor kinematic fusion, and autonomous tracking under dynamic battlefield conditions.",
      solution:
        "Built a military-grade Command & Control (C2) situational awareness and counter-unmanned aerial system (C-UAS) platform providing automated real-time drone detection, multi-sensor kinematic fusion, 3D trajectory forecasting, automated threat evaluation (TEWA), and pan-tilt tracking gimbal control.",
      architecture:
        "A high-performance pipeline combining YOLOv8 & ByteTrack optical computer vision with Extended Kalman Filter (EKF) sensor fusion, FMCW radar simulations, dynamic TEWA threat scoring, and an ESP32 microsecond PID servo gimbal bridge with a real-time WebSocket telemetry HUD.",
      features: [
        "Real-time drone detection with YOLOv8 & ByteTrack multi-object tracking",
        "360° PPI tactical airspace radar scope with configurable engagement perimeters",
        "3D isometric & multi-view trajectory forecasting using Constant-Velocity EKF",
        "Dynamic TEWA threat evaluation matrix with Time-to-Impact (TTI) metrics",
        "Hardware pan-tilt gimbal interface with ESP32 & closed-loop PID tracking",
        "Multi-modal vision feeds (Optical, Simulated FLIR White-Hot, NVG Night Vision)"
      ],
      highlights: [
        "YOLOv8 + ByteTrack Vision Engine",
        "Kinematic EKF Sensor Fusion",
        "360° PPI Tactical Radar Scope",
        "3D Isometric Trajectory Prediction",
        "TEWA Threat Scoring Matrix",
        "ESP32 Closed-Loop PID Gimbal",
        "FLIR & NVG Multi-Modal Stream",
        "Real-Time WebSocket C2 Telemetry"
      ],
      technologies: [
        "Python",
        "FastAPI",
        "PyTorch",
        "YOLOv8",
        "OpenCV",
        "Extended Kalman Filter (EKF)",
        "WebSockets",
        "ESP32 / C++",
        "HTML5 Canvas",
        "JavaScript",
        "CSS3"
      ],
      challenges: [
        "Maintaining persistent target tracking IDs during optical occlusions and rapid aerial maneuvers",
        "Fusing asynchronous optical bearing and FMCW radar Doppler velocities into a unified EKF state vector",
        "Achieving sub-millisecond servo command streaming over serial to eliminate gimbal overshoot and lag"
      ],
      lessons: [
        "Defensive AI demands deterministic state estimation and uncertainty covariance cones alongside raw neural network predictions.",
        "Hardware-in-the-loop validation is vital for high-speed tracking pan-tilt mechanisms.",
        "Real-time tactical consoles must prioritize low-latency telemetry visualization without dropping frames."
      ],
      future: [
        "Integration with physical SDR RF spectrum analyzers for active countermeasure RF jamming",
        "Edge deployment on NVIDIA Jetson Orin platforms for decentralized autonomous field units",
        "Swarm threat vector interception algorithms and multi-gimbal coordinated defense"
      ],
      emphasis: "standard",
      url: "https://github.com/Ayushanibarik/VayuNetra"
    },
    {
      name: "JanSevak",
      label: "AI Governance Platform",
      title: "AI-Powered Citizen Feedback & Prioritization System",
      problem:
        "Citizen grievances are siloed, poorly tracked, and prioritize subjective judgment over data-backed infrastructure planning.",
      solution:
        "Built a multi-modal AI platform integrating NLP, OCR, and GIS to aggregate citizen inputs and objectively prioritize public projects.",
      architecture:
        "Microservices architecture with an API Gateway connecting mobile and web clients to isolated FastAPI AI services for speech recognition, NLP, and GIS processing, backed by a spatial database.",
      features: [
        "Multi-modal entry (voice, image, text, PDF)",
        "Automatic language translation and detection",
        "NLP topic classification and duplicate clustering",
        "AI-driven priority scoring engine",
        "GIS mapping and analytics dashboard"
      ],
      highlights: [
        "Microservices Architecture",
        "NLP & Computer Vision",
        "GIS Mapping",
        "Multilingual Support",
        "AI Priority Scoring",
        "Cross-Platform App"
      ],
      technologies: [
        "Flutter",
        "Next.js",
        "FastAPI",
        "Python",
        "PyTorch",
        "PostgreSQL",
        "PostGIS",
        "Meta Llama 3",
        "OpenAI Whisper"
      ],
      challenges: [
        "Ensuring high accuracy in regional language translation and speech recognition",
        "Designing scalable microservices to handle concurrent AI model inference",
        "Creating an intuitive and accessible UX for low-literacy users"
      ],
      lessons: [
        "Citizen-facing systems must support familiar, frictionless channels like voice and WhatsApp.",
        "Data standardization across multiple entry points is critical for accurate AI analysis.",
        "A modular architecture is essential when integrating multiple specialized ML models."
      ],
      future: [
        "Integration with existing government departmental databases",
        "Predictive analytics for infrastructure wear and tear",
        "Offline-first capabilities for remote rural reporting"
      ],
      emphasis: "standard",
      url: "https://jan-sevak-xi.vercel.app/"
    },
    {
      name: "SAVE",
      label: "AI coordination system",
      title: "Strategic Agent-Based Victim Evacuation System",
      problem:
        "Disaster response requires efficient resource allocation, communication, and coordination.",
      solution:
        "Built AI-powered disaster response platform integrating optimization, mapping, and communication systems.",
      architecture:
        "The platform models victims, hospitals, routes, and emergency communication as coordinated agents that support triage, allocation, mapping, and response workflows.",
      features: [
        "Agent-based evacuation planning",
        "Hospital allocation workflow",
        "Map-aware response visualization",
        "AI-assisted triage signals",
        "Emergency communication integration"
      ],
      highlights: [
        "Multi-Agent Coordination",
        "Reinforcement Learning",
        "Hospital Allocation",
        "GIS Mapping",
        "AI Triage",
        "Emergency Voice Calls"
      ],
      technologies: ["Python", "Flask", "Streamlit", "PyTorch", "Twilio", "OpenStreetMap"],
      challenges: [
        "Representing emergency constraints without oversimplifying real-world response",
        "Connecting optimization logic with a usable operator-facing interface",
        "Coordinating multiple technical services into one response flow"
      ],
      lessons: [
        "Mission-critical software needs clarity before visual complexity.",
        "AI assistance is most valuable when paired with understandable operational context.",
        "Mapping and communication are core system components, not secondary features."
      ],
      future: [
        "Improve simulation depth for different disaster scenarios",
        "Add richer resource constraints and live status handling",
        "Explore offline-first response workflows"
      ]
    },
    {
      name: "SafeChoice",
      label: "Trust intelligence",
      title: "Restaurant Trust Index",
      problem:
        "Consumers often lack transparency into food safety and compliance.",
      solution: "Created compliance and trust intelligence platform.",
      architecture:
        "SafeChoice organizes restaurant compliance signals, complaint workflows, reporting, and administrative review into a trust-oriented information system.",
      features: [
        "Restaurant trust scoring",
        "Compliance verification flow",
        "Complaint analytics",
        "Structured reporting workflow",
        "Administrative dashboard"
      ],
      highlights: [
        "Trust Scoring",
        "Compliance Verification",
        "Complaint Analytics",
        "Reporting Workflow",
        "Administrative Dashboard"
      ],
      technologies: ["Node.js", "JavaScript", "REST APIs"],
      challenges: [
        "Turning messy trust signals into a clear user-facing score",
        "Separating consumer transparency from administrative review needs",
        "Designing an information model that can grow with more compliance inputs"
      ],
      lessons: [
        "Trust products need careful language and transparent reasoning.",
        "Administrative tools must make review faster without hiding context.",
        "Simple product surfaces can still represent sophisticated workflows."
      ],
      future: [
        "Add stronger evidence trails for trust scoring",
        "Design consumer-facing comparison views",
        "Explore integrations with public compliance datasets"
      ]
    }
  ] satisfies Project[],
  skills: [
    { title: "Programming", items: ["Java", "Python", "JavaScript", "SQL", "C++"] },
    { title: "Backend", items: ["FastAPI", "Flask", "Node.js", "Django", "WebSockets"] },
    { title: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind"] },
    { title: "AI & CV", items: ["Computer Vision", "YOLOv8", "NLP", "Machine Learning", "AI Agents", "EKF Fusion"] },
    { title: "Tools & Hardware", items: ["Git", "GitHub", "Docker", "PostgreSQL", "ESP32", "OpenCV"] }
  ] satisfies SkillGroup[],
  community: [
    "Operations Team Member, Innovation and Entrepreneurship Cell (IEC)",
    "GeeksforGeeks Student Chapter Operations Team",
    "IIT Bhubaneswar Pravaah",
    "Silicon University Nirman",
    "XIM Innovation Challenge",
    "Multiple Online Hackathons"
  ],
  timeline: [
    { year: "2026", text: "Started building software projects." },
    { year: "2026", text: "Participated in hackathons and innovation programs." },
    {
      year: "2026",
      text: "Built AI systems, military C-UAS platforms, compliance intelligence systems, and disaster response tools."
    },
    { year: "Future", text: "Building technology ventures that solve meaningful problems." }
  ] satisfies TimelineItem[],
  buildingNow: [
    "Exploring AI Agents and autonomous workflows",
    "Deepening understanding of scalable system design",
    "Building practical AI and software products",
    "Studying startup ecosystems and product strategy",
    "Improving engineering fundamentals"
  ],
  githubSection: {
    title: "Engineering Velocity & Consistency",
    subtitle: "Live GitHub Activity & Contributions",
    activityLabel: "Verified GitHub Contribution Graph",
    cta: "Explore GitHub Profile"
  },
  resume: {
    title: "Resume",
    body:
      "Access my complete professional timeline, technical skillset, and academic background in a clean, print-ready format.",
    cta: "Download Resume"
  },
  contact: {
    title: "Build, discuss, collaborate.",
    body:
      "For engineering conversations, hackathon collaboration, AI product ideas, or early-stage technology work, reach out directly.",
    copyEmail: "Copy Email",
    openEmail: "Open Email",
    channels: [
      { label: "Email", value: "ayushanimeshbarik@gmail.com", href: "mailto:ayushanimeshbarik@gmail.com", icon: Mail },
      {
        label: "Instagram",
        value: "@__ayush.animesh__",
        href: "https://www.instagram.com/__ayush.animesh__",
        icon: Instagram
      },
      { label: "GitHub", value: "github.com/Ayushanibarik", href: "https://github.com/Ayushanibarik", icon: Github },
      {
        label: "LinkedIn",
        value: "linkedin.com/in/ayushanimeshbarik",
        href: "https://www.linkedin.com/in/ayushanimeshbarik",
        icon: Linkedin
      }
    ] satisfies Array<{ label: string; value: string; href: string; icon: LucideIcon }>
  },
  footer: {
    line: "Designed as a digital headquarters for a builder in motion.",
    signature: "Ayush Animesh Barik"
  },
  visualSystem: {
    sectionIcons: {
      mission: Lightbulb,
      work: Layers3,
      journey: Map,
      resume: ShieldCheck,
      workflow: Workflow,
      code: Code2
    }
  }
};
