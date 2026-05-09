import {
  Activity,
  BrainCircuit,
  Drill,
  Radar,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { ExperienceItem, Project, StoryStage } from "@/types";

export const PERSONAL_INFO = {
  name: "Brian Gelvez",
  role: "Full Stack Developer",
  location: "Córdoba, Argentina",
  email: "brian@example.com",
  github: "https://github.com/briangelvez",
  linkedin: "https://www.linkedin.com/in/brian-gelvez/",
  tagline: "Software a medida.",
  heroHeadline:
    "Construyo aplicaciones para negocios y equipos que necesitan soluciones reales.",
};

export const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "Historia", href: "#about" },
  { label: "Tecnologías", href: "#skills" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export const STORY_STAGES: StoryStage[] = [
  {
    id: "ejercito",
    title: "Ejercito Argentino (2017-2021)",
    description:
      "Serví como soldado voluntario en la Compañía Comando 602 del Regimiento de Infantería Paracaidista 2, en Córdoba. Paracaidismo, buceo, documentación sensible, logística y trabajo bajo presión eran parte del día a día.",
    photos: [
      {
        src: "/images/ejercito1.jpg",
        alt: "Salto en paracaídas durante instrucción",
        caption: "Curso de paracaidismo — Regimiento Infantería Paracaidista 2, Córdoba",
      },
      {
        src: "/images/ejercito2.jpg",
        alt: "Formación matutina de la compañía",
        caption: "Compañía Comando 602 en formación",
      },
      {
        src: "/images/ejercito3.jpg",
        alt: "Entrenamiento de buceo",
        caption: "Salto en fuera aerea Argentina",
      },
      {
        src: "/images/ejercito4.jpg",
        alt: "Operaciones logísticas",
        caption: "Salida al terreno - Primeros Pinos, Neuquen",
      },
    ],
  },
  {
    id: "formacion",
    title: "Formación y aprendizaje (2020-2023)",
    description:
      "En 2020 (pandemia) empecé a estudiar programación por mi cuenta. Mientras continuaba trabajando aprendi HTML, CSS y JavaScript con cursos y videos de YouTube. Después profundicé mi formación con estudio intensivo y el bootcamp de Soy Henry, donde consolidé mis bases de desarrollo web full stack.",
    photos: [
      {
        src: "/images/aprendizaje1.jpg",
        alt: "Setup de estudio en casa",
        caption: "Primer setup — 2020, pandemia",
      },
      {
        src: "/images/aprendizaje2.jpg",
        alt: "Código en pantalla durante el bootcamp",
        caption: "inverti en un mejor setup de estudio — 2022/2023, pandemia",
      },
      {
        src: "/images/certificadohenry.png",
        alt: "Notas y diagramas de aprendizaje",
        caption: "Finalizado el bootcamp Soy Henry — 2023,",
      },
      {
        src: "/images/aprendizaje3.jpg",
        alt: "Notas y diagramas de aprendizaje",
        caption: "Con algo de experiencia, empecé a crear proyectos",
      },
    ],
  },
  {
    id: "profesional",
    title: "Experiencia profesional (2023-Presente)",
    description:
      "Después de formarme y construir algunos proyectos, mi siguiente paso fue empezar a trabajar profesionalmente en desarrollo, colaborando en aplicaciones web, sistemas e integraciones para entornos reales.",
    photos: [
      {
        src: "/images/proyecto1.png",
        alt: "Kemis, Brasil",
        caption: "Primer empleo | Kemis, Brasil. venta de cursos online",
      },
      {
        src: "/images/proyecto2.png",
        alt: "Reunión con equipo técnico",
        caption: "Busque y consegui proyecto freelance | E-commerce",
      },
      {
        src: "/images/proyecto3.png",
        alt: "Dashboard de proyecto en producción",
        caption: "Procampo | e-commerce + chatbot (Web y WhatsApp)",
      },
      {
        src: "/images/proyecto4.png",
        alt: "Planificación en pizarra",
        caption: "Web oficial e institucional de la cooperativa Eléctrica de San José de la Dormida",
      },
    ],
  },
];

export const VALUES = [
  {
    title: "Disciplina",
    description: "Trabajo con constancia, orden y atención al detalle.",
    icon: ShieldCheck,
  },
  {
    title: "Aprendizaje continuo",
    description:
      "Aprendí gran parte de mi base técnica de forma autodidacta y sigo formándome de manera activa.",
    icon: Rocket,
  },
  {
    title: "Adaptación",
    description:
      "Pude reconvertirme profesionalmente y moverme con rapidez en entornos nuevos.",
    icon: Radar,
  },
  {
    title: "Compromiso",
    description:
      "Me interesa construir soluciones útiles, claras y pensadas para uso real.",
    icon: Activity,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "military",
    type: "military",
    company: "Ejército Argentino",
    role: "Soldado Voluntario",
    location: "Regimiento de Infantería Paracaidista 2, Córdoba",
    period: "2017 — 2021",
    description:
      "Cuatro años en el Regimiento de Infantería Paracaidista 2, Compañía Comando 602. Trabajé en el área de personal, manejando documentación y operaciones de la compañía. Hice el curso de paracaidismo, buceo y salto aereo. Lo que me quedó de esa etapa: disciplina, trabajo en equipo y saber mantener la cabeza fría cuando las cosas se complican.",
    skills: [
      "Disciplina",
      "Trabajo en equipo",
      "Operaciones bajo presión",
      "Logística",
      "Resiliencia",
    ],
    highlight: "10+ saltos en paracaídas",
  },
  {
    id: "autodidacta ",
    type: "Aprendizaje ",
    company: "Formación en desarrollo web",
    role: "Aprendizaje autodidacta + Bootcamp Soy Henry",
    location: "Argentina",
    period: "2020 — 2023",
    description:
      "En 2020, mientras todavía estaba en el Ejército y cursaba de forma virtual por la pandemia, me compré una notebook y empecé a investigar programación por mi cuenta. freeCodeCamp, tutoriales de YouTube, documentación, etc.. Sin un rumbo claro al principio, pero con mucha dedicación. En 2022 tomé la decisión de enfocarme de lleno. Dejé el Ejército y me metí en el bootcamp de Soy Henry, que en ese momento era una de las opciones más sólidas para aprender desarrollo full stack de forma intensiva. Fue un salto enorme. El bootcamp me dio una base muy completa: HTML, CSS, JavaScript, React, Node.js, PostgreSQL, ORMs y APIs REST. Todo lo que hoy uso en mi trabajo diario tiene raíces en lo que aprendí ahí. Lo terminé a principios de 2023 y arranqué la búsqueda laboral. En menos de cuatro meses tenía mi primer empleo.",
    achievements: [
      "Aprendí programación de forma autodidacta durante más de un año antes de tomar un curso formal.",
      "Completé el bootcamp de Soy Henry full stack, uno de los más intensivos de LATAM en ese momento.",
      "Pasé de cero conocimiento técnico a conseguir mi primer empleo en menos de cuatro meses de terminar.",
      "Construí la base que hoy uso a diario: JavaScript, React, Node.js, PostgreSQL y APIs REST.",
    ],
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "TypeORM",
      "APIs REST",
    ],
  },
  {
    id: "kemis",
    type: "work",
    company: "Kemis",
    role: "Frontend Developer Jr.",
    location: "Brasil (Remoto)",
    period: "Sep 2023 — Mar 2024",
    description:
      "Mi primer trabajo como desarrollador. Kemis es una empresa de software brasilera donde trabajé en una plataforma educativa: una academia de cursos online con panel de profesores y panel de alumnos. Los alumnos tenían distintos planes de acceso y al completar un curso recibían un certificado. Trabajé codo a codo con dos seniors que me exigían entender y escribir cada línea de código. Aprendí muchísimo en esos meses.",
    achievements: [
      "Migramos el frontend de Create React App a Next.js 14.",
      "Reesctructuramos la lógica de exámenes.",
      "Construí la generación de certificados PDF al completar cursos.",
      "Trabajé lógica de negocio real en el backend.",
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeORM"],
  },
  {
    id: "vida-natural",
    type: "work",
    company: "Vida Natural",
    role: "Frontend Developer",
    location: "Argentina (Remoto)",
    period: "May 2024 — Sep 2024",
    description:
      "Vida Natural es una empresa de cosméticos y suplementos naturales. Fue un proyecto de medio tiempo donde desarrollé su sitio web completo con un catálogo de productos integrado a la API de su sistema de gestión. El objetivo era claro, crear un sitio con los productos de venta al publico. lo cumplimos y el proyecto finalizó.",
    achievements: [
      "Desarrollé el sitio web completo de la empresa desde cero.",
      "Integré el catálogo de productos en tiempo real desde la API del sistema de gestión.",
      "Entregué el proyecto en tiempo y forma dentro del alcance acordado.",
    ],
    stack: ["Next.js", "server components", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "freelance",
    type: "work",
    company: "Freelance",
    role: "Desarrollador Full Stack & Marketing Digital",
    location: "Argentina",
    period: "Oct 2024 — Presente",
    description:
      "Durante varios meses me dediqué de lleno al freelance. Conseguí clientes, gestioné proyectos y aprendí a manejar todo el ecosistema que rodea al trabajo independiente. Además del desarrollo, me metí en el mundo del marketing digital y las redes sociales, lo que me dio una visión más completa del negocio digital.",
    achievements: [
      "Desarrollé e-commerces, landing pages y chatbots para distintos clientes.",
      "Gestioné redes sociales con publicidad paga (Meta Ads), publicaciones diarias y edición gráfica.",
      "Trabajé con WhatsApp Cloud API y Meta Business Suite para automatizaciones y campañas.",
      "Aprendí a manejar el ciclo completo de un proyecto: cliente, presupuesto, desarrollo y entrega.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WhatsApp Cloud API",
      "Meta Ads",
      "Meta Business Suite",
      "IA en General",
    ],
  },
  {
    id: "cooperativa",
    type: "work",
    company: "Cooperativa Eléctrica de San José de la Dormida",
    role: "Area de Sistemas y Tecnología",
    location: "Córdoba",
    period: "2025 — Presente",
    description:
      "Trabajo en el área de sistemas junto a un ingeniero en sistemas. Es un trabajo variado donde combinamos desarrollo de software, gestión de sistemas internos, facturación electrónica, capacitaciones y soporte técnico. Desarrollé varios proyectos que hoy están en uso en la cooperativa, que presta servicios a más de 2.500 familias.",
    achievements: [
      "Desarrollé el sitio web actual de la cooperativa.",
      "Construí un asistente virtual de WhatsApp: los socios envían su número de cuenta y reciben su factura en PDF al instante. Más de 800 conversaciones gestionadas.",
      "Trabajamos con ordenes de trabajo, facturacion, servicios sociales, capacitaciones, etc.",
      "Desarrollé un sistema de gestión de servicios sociales con turnos, especialistas y prestaciones por socio, conectado a una vista personalizada en SQL Server del sistema de facturación real.",
      "Trabajamos con un sistema de medidores inteligentes (DISCAR): monitoreo de tensión, corriente y demanda en tiempo real. La cooperativa lleva colocados aproximadamente 500 medidores.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "SQL Server",
      "Prisma",
      "WhatsApp Cloud API",
      "Google Drive API",
      "Vercel",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "chatbot-cooperativa",
    title: "Chatbot WhatsApp & Web",
    subtitle: "Cooperativa La Dormida",
    image: "https://placehold.co/1200x675/0b1220/22d3ee?text=Chatbot+WhatsApp+%26+Web",
    imageAlt: "Vista del chatbot WhatsApp y web para la cooperativa",
    description:
      "Asistente virtual 24/7 para solicitar facturas por número de cuenta y resolver consultas frecuentes desde WhatsApp y web.",
    stack: ["Next.js", "Supabase", "WhatsApp Cloud API", "Google", "Vercel"],
    metrics: [
      "+800 conversaciones",
      "+2.500 socios potenciales",
      "24/7 activo",
    ],
    status: "production",
    liveUrl: "https://cooperativaladormida.com",
    githubUrl: "https://github.com/briangelvez",
  },
  {
    id: "gestion-socios",
    title: "Sistema de Gestión de Socios",
    subtitle: "Cooperativa La Dormida",
    image: "https://placehold.co/1200x675/111827/22c55e?text=Sistema+de+Gestion+de+Socios",
    imageAlt: "Dashboard del sistema de gestión de socios",
    description:
      "Sistema interno para gestionar más de 2.000 socios activos con integración en tiempo real al sistema de facturación legacy mediante una VIEW personalizada en SQL Server.",
    stack: ["Next.js", "Prisma", "SQL Server", "PostgreSQL"],
    metrics: ["+2.000 socios gestionados", "Integración legacy en tiempo real"],
    status: "production",
    liveUrl: "https://cooperativaladormida.com",
    githubUrl: "https://github.com/briangelvez",
  },
  {
    id: "academia-kemis",
    title: "Academia Online SaaS",
    subtitle: "Kemis · Brasil",
    image: "https://placehold.co/1200x675/1f2937/f59e0b?text=Academia+Online+SaaS",
    imageAlt: "Pantalla de academia online SaaS con cursos y exámenes",
    description:
      "Plataforma de academia online con cursos, clases, exámenes y certificados PDF con firma digital sobre una base de Next.js.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "TypeORM"],
    metrics: ["Migración CRA -> Next.js", "Certificados PDF firmados"],
    status: "client",
    githubUrl: "https://github.com/briangelvez",
  },
  {
    id: "freelance-suite",
    title: "E-commerce & Chatbots para clientes",
    subtitle: "Freelance / productos propios",
    image: "https://placehold.co/1200x675/0f172a/a855f7?text=E-commerce+%26+Chatbots",
    imageAlt: "Colección de proyectos e-commerce y chatbots",
    description:
      "Desarrollo de e-commerces funcionales, chatbots personalizados y sitios web para clientes reales, además de productos SaaS propios en etapa de maduración.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Vercel"],
    metrics: ["Soluciones reales para clientes", "En evolución hacia SaaS"],
    status: "client",
    liveUrl: "https://cooperativaladormida.com",
    githubUrl: "https://github.com/briangelvez",
  },
];

export const SKILLS = {
  frontend: {
    eyebrow: "Frontend",
    title: "Interfaces y experiencia de usuario",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  backend: {
    eyebrow: "Backend",
    title: "Lógica de negocio, APIs y estructura",
    items: [
      "NestJS",
      "Node.js",
      "Express.js",
      "Arquitectura MVC",
      "API REST",
      "Next.js API Routes",
      "Server Actions",
    ],
  },
  databases: {
    eyebrow: "Datos",
    title: "Persistencia y acceso a datos",
    items: [
      "PostgreSQL",
      "Firabase",
      "SQL Server",
      "Supabase",
      "Prisma ORM",
      "TypeORM",
    ],
  },
  tools: {
    eyebrow: "Herramientas e integracione",
    title: "Servicios, despliegue y flujo de trabajo",
    items: [
      "IA en Gnal.",
      "Open code",
      "Cursor",
      "Antigravity",
      "Codex",
      "Git",
      "GitHub",
      "Vercel",
      "Docker",
      "WhatsApp Cloud API",
    ],
  },
};

export const TRAINING_CARDS = [
  {
    title: "Bootcamp Soy Henry",
    description:
      "HTML, CSS, JavaScript, Node.js, React.js, SQL, PostgreSQL y APIs REST.",
    icon: Drill,
  },
  {
    title: "Autodidacta por diseño",
    description:
      "freeCodeCamp, YouTube, documentación oficial y práctica diaria hasta conseguir experiencia real.",
    icon: BrainCircuit,
  },
];
