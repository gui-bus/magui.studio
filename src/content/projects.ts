import { locales } from "@/src/i18n/config"

export type AppLocale = (typeof locales)[number]

export interface ProjectTypography {
  name: string
  category: string
}

export interface ProjectColor {
  hex: string
  name: string
  oklch: string
}

export interface ProjectCaseContent {
  title: string
  summary: string
  intro: string
  challenge: string
  solution: string
  sector: string
  scope: string
  role: string
  year: string
  stack: string[]
}

export interface ProjectCaseRecord {
  id: string
  slug: string
  image: string
  gallery: string[]
  liveUrl: string
  colors: ProjectColor[]
  typography: ProjectTypography[]
  content: Record<AppLocale, ProjectCaseContent>
}

export const projectCases: readonly ProjectCaseRecord[] = [
  {
    id: "aparecaEVenda",
    slug: "apareca-e-venda",
    image: "/projects/thais/cover.webp",
    gallery: [
      "/projects/thais/01.webp",
      "/projects/thais/02.webp",
      "/projects/thais/03.webp",
    ],
    liveUrl: "http://thaiscrisley.com.br/",
    colors: [
      {
        hex: "#bf4200",
        name: "Laranja Queimado",
        oklch: "oklch(0.547 0.211 46.36)",
      },
      { hex: "#F3E3D3", name: "Amêndoa", oklch: "oklch(0.9244 0.0277 67.48)" },
      {
        hex: "#623828",
        name: "Café Profundo",
        oklch: "oklch(0.3884 0.0655 41.44)",
      },
    ],
    typography: [
      { name: "Playfair Display", category: "Heading" },
      { name: "Montserrat", category: "Body" },
      { name: "Geist Mono", category: "Detail" },
    ],
    content: {
      pt: {
        title: "Apareça e Venda",
        summary:
          "Landing page estratégica desenvolvida para o infoproduto de Thaís Crisley, focada em converter autoridade visual em faturamento através de uma narrativa de desbloqueio emocional.",
        intro:
          "Este projeto demonstra a expertise da MAGUI em criar experiências que resolvem dores latentes (como o medo de se expor) através de um design que transmite segurança e profissionalismo imediato.",
        challenge:
          "O desafio era estruturar uma página que fosse além da venda de um curso, criando uma jornada de consciência para empreendedoras que 'travam' diante da câmera, exigindo um equilíbrio entre empatia e autoridade.",
        solution:
          "Implementamos uma interface de alto impacto com tipografia display, animações fluidas via Framer Motion para guiar o ritmo de leitura e uma arquitetura de conversão baseada em gatilhos mentais e prova social.",
        sector: "Infoprodutos e Posicionamento",
        scope: "Landing Page de Alta Conversão",
        role: "Direção visual, interface e front-end",
        year: "2026",
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      },
      en: {
        title: "Apareça e Venda",
        summary:
          "A strategic landing page developed for Thaís Crisley's digital product, focused on converting visual authority into revenue through an emotional breakthrough narrative.",
        intro:
          "This project showcases MAGUI's expertise in creating experiences that address latent pain points (like the fear of public exposure) through a design that conveys immediate security and professionalism.",
        challenge:
          "The challenge was to structure a page that went beyond selling a course, creating a consciousness journey for entrepreneurs who 'freeze' in front of the camera, requiring a balance between empathy and authority.",
        solution:
          "We implemented a high-impact interface with display typography, fluid animations via Framer Motion to guide the reading rhythm, and a conversion architecture based on mental triggers and social proof.",
        sector: "Digital Products & Positioning",
        scope: "High-Conversion Landing Page",
        role: "Visual direction, interface, and front-end",
        year: "2026",
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      },
    },
  },
  {
    id: "powervet",
    slug: "powervet",
    image: "/projects/powervet/cover.webp",
    gallery: [
      "/projects/powervet/01.webp",
      "/projects/powervet/02.webp",
      "/projects/powervet/03.webp",
    ],
    liveUrl: "https://powervet.guibus.dev/",
    colors: [
      {
        hex: "#087750",
        name: "Verde Esmeralda Escuro",
        oklch: "oklch(0.5582 0.101975 178.9916)",
      },
      {
        hex: "#1A2421",
        name: "Verde Petróleo Negro",
        oklch: "oklch(0.2496 0.0152 174.74)",
      },
      {
        hex: "#F8FAFB",
        name: "Branco Gelo",
        oklch: "oklch(0.9839 0.0025 228.78)",
      },
    ],
    typography: [
      { name: "Libre Baskerville", category: "Heading" },
      { name: "Manrope", category: "Body" },
    ],
    content: {
      pt: {
        title: "PowerVet",
        summary:
          "Interface técnica para uma clínica veterinária especializada em medicina felina, focada em precisão clínica e um ambiente de baixo estresse.",
        intro:
          "O PowerVet foi projetado para elevar o padrão digital da saúde animal, utilizando uma abordagem baseada em evidências para transmitir autoridade e cuidado especializado.",
        challenge:
          "Equilibrar a densidade de informações técnicas e protocolos médicos com uma experiência de usuário acolhedora, reduzindo a fricção no agendamento de consultas.",
        solution:
          "Implementamos uma arquitetura de informação modular e visualmente sóbria, utilizando animações suaves e um sistema de agendamento intuitivo que prioriza a triagem clínica.",
        sector: "Saúde Felina Especializada",
        scope: "Site Institucional e Plataforma de Agendamento",
        role: "Estrutura, direção visual e interface",
        year: "2026",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      en: {
        title: "PowerVet",
        summary:
          "A technical interface for a veterinary clinic specializing in feline medicine, focused on clinical precision and a low-stress environment.",
        intro:
          "PowerVet was designed to elevate the digital standard of animal health, using an evidence-based approach to convey authority and specialized care.",
        challenge:
          "To balance dense technical information and medical protocols with a welcoming user experience, reducing friction in the appointment booking process.",
        solution:
          "We implemented a modular and visually sober information architecture, using smooth animations and an intuitive booking system that prioritizes clinical triage.",
        sector: "Specialized Feline Health",
        scope: "Institutional Website & Booking Platform",
        role: "Structure, visual direction, and interface",
        year: "2026",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
    },
  },
  {
    id: "horizonTravels",
    slug: "horizon-travels",
    image: "/projects/horizon/cover.webp",
    gallery: [
      "/projects/horizon/01.webp",
      "/projects/horizon/02.webp",
      "/projects/horizon/03.webp",
    ],
    liveUrl: "https://horizon.guibus.dev/",
    colors: [
      {
        hex: "#4F4024",
        name: "Bronze Oliva Escuro",
        oklch: "oklch(0.3802 0.0474 82.11)",
      },
      {
        hex: "#1A1C1E",
        name: "Preto Fosco Azulado",
        oklch: "oklch(0.2252 0.0049 248.05)",
      },
      {
        hex: "#FDFCFB",
        name: "Branco Neve Quente",
        oklch: "oklch(0.9916 0.0017 67.8)",
      },
    ],
    typography: [
      { name: "Playfair Display", category: "Heading" },
      { name: "Montserrat", category: "Body" },
      { name: "Sora", category: "Detail" },
    ],
    content: {
      pt: {
        title: "Horizon Travels",
        summary:
          "Uma landing page de luxo com atmosfera editorial, concebida para demonstrar como o design sensorial e a fluidez de movimento podem elevar a percepção de uma marca de turismo premium.",
        intro:
          "O projeto foca na curadoria e no escapismo. Através de uma interface que 'respira', buscamos transformar a reserva de uma viagem em uma experiência de descoberta, unindo sofisticação técnica e leitura clara.",
        challenge:
          "Vender experiências intangíveis e de alto valor através de uma tela, equilibrando uma carga visual imersiva com performance impecável e navegação intuitiva.",
        solution:
          "Utilizamos máscaras de revelação (Mask Reveal) e animações de scroll refinadas com Framer Motion. A tipografia generosa, integrada ao HeroUI, cria um ritmo de leitura que mimetiza o folhear de uma revista de luxo internacional.",
        sector: "Viagens e Estilo de Vida",
        scope: "Landing Page Internacional",
        role: "Conceito Visual, UI Design e Desenvolvimento Full-stack",
        year: "2026",
        stack: [
          "Next.js",
          "Framer Motion",
          "Tailwind CSS",
        ],
      },
      en: {
        title: "Horizon Travels",
        summary:
          "A luxury landing page with an editorial atmosphere, designed to demonstrate how sensory design and fluid motion can elevate a premium travel brand's perception.",
        intro:
          "The project focuses on curation and escapism. Through a 'breathing' interface, we aimed to transform travel booking into a discovery experience, merging technical sophistication with clear readability.",
        challenge:
          "To sell intangible, high-value experiences through a screen, balancing immersive visuals with flawless performance and intuitive navigation.",
        solution:
          "We implemented mask reveal effects and refined scroll animations using Framer Motion. The generous typography, integrated with HeroUI, creates a reading rhythm that mimics flipping through an international luxury magazine.",
        sector: "Travel and Lifestyle",
        scope: "International Landing Page",
        role: "Visual Concept, UI Design, and Full-stack Development",
        year: "2026",
        stack: [
          "Next.js",
          "Framer Motion",
          "Tailwind CSS",
        ],
      },
    },
  },
] as const

export interface LocalizedProjectCase extends ProjectCaseContent {
  id: string
  slug: string
  image: string
  gallery: string[]
  liveUrl: string
  colors: ProjectColor[]
  typography: ProjectTypography[]
}

export function getProjectCaseSlugs(): string[] {
  return projectCases.map((projectCase) => projectCase.slug)
}

export function getProjectCases(locale: AppLocale): LocalizedProjectCase[] {
  return projectCases.map((projectCase) => ({
    id: projectCase.id,
    slug: projectCase.slug,
    image: projectCase.image,
    gallery: [...projectCase.gallery],
    liveUrl: projectCase.liveUrl,
    colors: [...projectCase.colors],
    typography: [...projectCase.typography],
    ...projectCase.content[locale],
  }))
}

export function getProjectCaseBySlug(
  slug: string,
  locale: AppLocale
): LocalizedProjectCase | null {
  const projectCase = projectCases.find((entry) => entry.slug === slug)

  if (!projectCase) {
    return null
  }

  return {
    id: projectCase.id,
    slug: projectCase.slug,
    image: projectCase.image,
    gallery: [...projectCase.gallery],
    liveUrl: projectCase.liveUrl,
    colors: [...projectCase.colors],
    typography: [...projectCase.typography],
    ...projectCase.content[locale],
  }
}

export function getAdjacentProjectCases(
  slug: string,
  locale: AppLocale
): {
  nextProject: LocalizedProjectCase
  previousProject: LocalizedProjectCase
} | null {
  const cases = getProjectCases(locale)
  const currentIndex = cases.findIndex(
    (projectCase) => projectCase.slug === slug
  )

  if (currentIndex === -1) {
    return null
  }

  const previousProject =
    cases[(currentIndex - 1 + cases.length) % cases.length] ?? cases[0]
  const nextProject = cases[(currentIndex + 1) % cases.length] ?? cases[0]

  return { nextProject, previousProject }
}
