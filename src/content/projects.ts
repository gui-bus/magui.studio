import { locales } from "@/src/i18n/config"

export type AppLocale = (typeof locales)[number]

export interface ProjectCaseContent {
  title: string
  summary: string
  intro: string
  sector: string
  scope: string
  role: string
  year: string
  notes: string[]
}

export interface ProjectCaseRecord {
  id: string
  slug: string
  image: string
  liveUrl: string
  accent: string
  content: Record<AppLocale, ProjectCaseContent>
}

export const projectCases: readonly ProjectCaseRecord[] = [
  {
    id: "aparecaEVenda",
    slug: "apareca-e-venda",
    image: "/projects/thais.png",
    liveUrl: "https://aparecaevenda.com.br",
    accent: "from-[#ff7a18] via-[#ff8f3f] to-[#ffb36b]",
    content: {
      pt: {
        title: "Apareça e venda",
        summary:
          "Uma landing page pensada para transformar posicionamento em clareza comercial, com hierarquia forte, ritmo visual e uma chamada direta para ação.",
        intro:
          "Este projeto foi desenvolvido para demonstrar como a MAGUI estrutura páginas que precisam vender percepção antes de vender oferta. A direção parte de contraste alto, copy objetiva e blocos que sustentam leitura rápida sem perder sofisticação.",
        sector: "Posicionamento digital",
        scope: "Landing page estratégica",
        role: "Direção visual, interface e front-end",
        year: "2026",
        notes: [
          "Leitura direta com seções de decisão rápida",
          "Tipografia e contraste desenhados para percepção de valor",
          "Estrutura preparada para campanhas e aquisição",
        ],
      },
      en: {
        title: "Apareça e venda",
        summary:
          "A landing page was designed to turn positioning into commercial clarity, with strong hierarchy, visual rhythm, and a direct call to action.",
        intro:
          "This project was built to demonstrate how MAGUI structures pages that need to sell perception before they sell the offer itself. The direction starts with high contrast, concise copy, and sections that support quick reading without losing sophistication.",
        sector: "Digital positioning",
        scope: "Strategic landing page",
        role: "Visual direction, interface, and front-end",
        year: "2026",
        notes: [
          "Direct reading flow with quick decision sections",
          "Typography and contrast shaped for perceived value",
          "Structure prepared for campaigns and acquisition",
        ],
      },
    },
  },
  {
    id: "powervet",
    slug: "powervet",
    image: "/projects/powervet.png",
    liveUrl: "https://powervet.com.br",
    accent: "from-[#4f46e5] via-[#2563eb] to-[#38bdf8]",
    content: {
      pt: {
        title: "Powervet",
        summary:
          "Uma interface criada para um universo técnico e confiável, equilibrando clareza institucional, linguagem de produto e uma apresentação visual mais precisa.",
        intro:
          "A proposta do projeto foi construir uma presença digital com tom mais sólido e profissional, capaz de organizar informação técnica sem parecer fria ou burocrática. O foco esteve em precisão visual, confiança e leitura objetiva.",
        sector: "Saúde animal",
        scope: "Site institucional de produto",
        role: "Estrutura, direção visual e interface",
        year: "2026",
        notes: [
          "Tom visual mais confiável e controlado",
          "Organização de conteúdo técnico com boa escaneabilidade",
          "Direção pensada para marca, produto e contexto institucional",
        ],
      },
      en: {
        title: "Powervet",
        summary:
          "The interface was created for a technical and trustworthy space, balancing institutional clarity, product language, and a more precise visual presentation.",
        intro:
          "The goal of this project was to build a stronger, more professional digital presence capable of organizing technical information without feeling cold or bureaucratic. The focus stayed on visual precision, trust, and objective reading.",
        sector: "Animal health",
        scope: "Institutional product website",
        role: "Structure, visual direction, and interface",
        year: "2026",
        notes: [
          "A more trustworthy and controlled visual tone",
          "Technical content organized with strong scannability",
          "Direction designed for brand, product, and institutional context",
        ],
      },
    },
  },
  {
    id: "horizonTravels",
    slug: "horizon-travels",
    image: "/projects/horizon.png",
    liveUrl: "https://horizontravels.com.br",
    accent: "from-[#0f766e] via-[#14b8a6] to-[#7dd3fc]",
    content: {
      pt: {
        title: "Horizon Travels",
        summary:
          "Uma página com atmosfera editorial e foco aspiracional, criada para demonstrar como viagem, desejo e sofisticação podem conviver com leitura clara e navegação objetiva.",
        intro:
          "Este projeto explora um território mais sensorial. A intenção foi desenhar uma experiência que transmitisse escapismo, curadoria e valor percebido, sem cair em layouts genéricos de turismo ou em excesso de informação.",
        sector: "Viagens e experiência",
        scope: "Landing page de marca",
        role: "Conceito visual, interface e composição",
        year: "2026",
        notes: [
          "Escala tipográfica usada como elemento de cenário",
          "Narrativa visual mais sensorial e menos utilitária",
          "Equilíbrio entre impacto aspiracional e leitura objetiva",
        ],
      },
      en: {
        title: "Horizon Travels",
        summary:
          "The page brings an editorial atmosphere and an aspirational focus, showing how travel, desire, and sophistication can coexist with clear reading and objective navigation.",
        intro:
          "This project explores a more sensory territory. The goal was to design an experience that conveyed escapism, curation, and perceived value without falling into generic travel layouts or information overload.",
        sector: "Travel and experience",
        scope: "Brand landing page",
        role: "Visual concept, interface, and composition",
        year: "2026",
        notes: [
          "Typographic scale used as part of the scenery",
          "A more sensory visual narrative and less utilitarian feel",
          "Balance between aspirational impact and objective reading",
        ],
      },
    },
  },
] as const

export interface LocalizedProjectCase extends ProjectCaseContent {
  id: string
  slug: string
  image: string
  liveUrl: string
  accent: string
}

export function getProjectCaseSlugs(): string[] {
  return projectCases.map((projectCase) => projectCase.slug)
}

export function getProjectCases(locale: AppLocale): LocalizedProjectCase[] {
  return projectCases.map((projectCase) => ({
    id: projectCase.id,
    slug: projectCase.slug,
    image: projectCase.image,
    liveUrl: projectCase.liveUrl,
    accent: projectCase.accent,
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
    liveUrl: projectCase.liveUrl,
    accent: projectCase.accent,
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
