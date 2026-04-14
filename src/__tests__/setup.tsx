import * as React from "react"

import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"
process.env.WEB3FORMS_ACCESS_KEY = "4fc93430-7b53-491f-a7ed-8cb2c3b3fd46"

const translationData: Record<string, Record<string, unknown>> = {
  "Index.About": {
    eyebrow: "Manifesto do Estúdio",
    title: "O Conceito MAGUI",
    title_1: "Precisão",
    title_2: "Editorial.",
    description: "Descrição",
    badge: "Autoridade de Interface",
    image_alt: "Imagem",
    panel_eyebrow: "O Estúdio",
    panel_title: "Rigor visual.",
    panel_description: "Painel",
    principles: ["Um", "Dois", "Três"],
    pillars: ["Autoridade", "Performance", "Escala", "Precisão"],
    highlights: [
      {
        id: "01",
        title: "Estratégia Visual",
        label: "Estratégia Visual",
        description: "Design",
      },
      {
        id: "02",
        title: "Entrega Engenheirada",
        label: "Entrega Engenheirada",
        description: "Sistema",
      },
    ],
  },
  "Index.Process": {
    eyebrow: "Protocolo MAGUI",
    title: "Protocolo de Execução.",
    title_1: "Execution",
    title_2: "Protocol.",
    description: "Processo",
    step_label: "Etapa {step}",
    method_label: "Método MAGUI",
    steps: [
      { title: "Estratégia", description: "Mapeamento" },
      { title: "Arquitetura", description: "Estruturação" },
      { title: "Design", description: "Criação" },
      { title: "Engenharia", description: "Implementação" },
    ],
  },
  "Index.FAQ": {
    eyebrow: "Dúvidas Técnicas",
    title: "Perguntas Frequentes.",
    items: [
      {
        answer: "Resposta um",
        question: "Pergunta um",
      },
    ],
  },
  "Index.Ids": {
    about: "manifesto",
    faq: "duvidas",
    process: "processo",
  },
  ProjectCases: {
    archive_eyebrow: "Portfólio",
    archive_title: "Projetos individuais.",
    archive_description: "Descrição do arquivo",
    archive_open: "Abrir projeto",
    archive_live: "Ver ao vivo",
    archive_back_home: "Voltar ao início",
    back_to_projects: "Voltar aos projetos",
    hero_label: "Projeto",
    summary_label: "Resumo",
    facts_sector: "Setor",
    facts_scope: "Escopo",
    facts_role: "Atuação",
    facts_format: "Formato",
    facts_year: "Ano",
    facts_audience: "Público",
    style_guide_label: "Style guide",
    palette_label: "Paleta",
    typeface_label: "Tipografia",
    mood_label: "Assinatura visual",
    mockups_label: "Mockups",
    desktop_mockup_label: "Desktop",
    mobile_mockup_label: "Mobile",
    design_notes_label: "Notas de design",
    article_label: "Leitura do projeto",
    objective_label: "Objetivo",
    challenge_label: "Desafio",
    solution_label: "Solução",
    design_system_label: "Design System",
    context_label: "Contexto",
    direction_label: "Direção",
    system_label: "Sistema",
    experience_label: "Experiência",
    capabilities_label: "O que essa página faz",
    journey_label: "Como a leitura se organiza",
    differentiators_label: "Decisões que elevam o projeto",
    deliverables_label: "Entregáveis",
    stack_label: "Stack",
    notes_label: "Destaques",
    quote_label: "Leitura editorial",
    closing_label: "Fechamento",
    live_project: "Ver projeto ao vivo",
    open_brief: "Solicitar proposta",
    more_projects: "Outros projetos",
    next_project: "Próximo projeto",
    previous_project: "Projeto anterior",
    cta_title: "Quer um projeto com esse nível de direção?",
    cta_description: "Descrição CTA",
  },
  Footer: {
    studio_title: "O Estúdio",
    nav_title: "Navegação",
    social_title: "Social",
    site_footer_label: "Rodapé do Site",
    scroll_to_top_label: "Voltar ao Topo",
    established: "Desde 2026",
    availability: "Disponível",
    credits: "© {year} MAGUI.studio",
    back_to_top: "Voltar ao Topo",
  },
  Config: {
    name: "MAGUI.studio",
    description: "Descrição",
    keywords: "MAGUI",
  },
}

const serverMessages = {
  Config: translationData.Config,
  Footer: translationData.Footer,
  Index: {
    About: translationData["Index.About"],
    FAQ: translationData["Index.FAQ"],
    Ids: translationData["Index.Ids"],
    Process: translationData["Index.Process"],
  },
  ProjectCases: translationData.ProjectCases,
}

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const scopedData = namespace ? (translationData[namespace] ?? {}) : {}
    const translate = (
      key: string,
      values?: Record<string, string | number>
    ): string => {
      const value = scopedData[key]

      if (typeof value !== "string") {
        return key
      }

      if (!values) {
        return value
      }

      return Object.entries(values).reduce(
        (result, [token, tokenValue]) =>
          result.replace(`{${token}}`, String(tokenValue)),
        value
      )
    }

    translate.raw = (key: string): unknown => scopedData[key] ?? []

    return translate
  },
  useLocale: () => "pt",
}))

vi.mock("next-intl/server", () => ({
  getLocale: async () => "pt",
  getMessages: async () => serverMessages,
  setRequestLocale: vi.fn(),
  getTranslations: async (namespace?: string) => {
    const scopedData = namespace ? (translationData[namespace] ?? {}) : {}

    const translate = (
      key: string,
      values?: Record<string, string | number>
    ): string => {
      const value = scopedData[key]

      if (typeof value !== "string") {
        return key
      }

      if (!values) {
        return value
      }

      return Object.entries(values).reduce(
        (result, [token, tokenValue]) =>
          result.replace(`{${token}}`, String(tokenValue)),
        value
      )
    }

    translate.raw = (key: string): unknown => scopedData[key] ?? []

    return translate
  },
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock("@/src/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children?: React.ReactNode
    href:
      | string
      | {
          pathname: string
          params?: Record<string, string>
        }
  }) => {
    const resolvedHref =
      typeof href === "string"
        ? href
        : href.pathname.replace("[slug]", href.params?.slug ?? "")

    return React.createElement(
      "a",
      {
        href: resolvedHref,
        ...props,
      } as React.HTMLAttributes<HTMLAnchorElement>,
      children
    )
  },
  getPathname: ({
    locale,
    href,
  }: {
    locale: "pt" | "en"
    href:
      | string
      | {
          pathname: string
          params?: Record<string, string>
        }
  }) => {
    const pathname = typeof href === "string" ? href : href.pathname
    const slug = typeof href === "string" ? "" : (href.params?.slug ?? "")

    if (pathname === "/contato") {
      return locale === "en" ? "/contact" : "/contato"
    }

    if (pathname === "/metodo") {
      return locale === "en" ? "/method" : "/metodo"
    }

    if (pathname === "/estudio") {
      return locale === "en" ? "/studio" : "/estudio"
    }

    if (pathname === "/projetos/[slug]") {
      return locale === "en" ? `/projects/${slug}` : `/projetos/${slug}`
    }

    return pathname
  },
  redirect: vi.fn(),
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}))

const motionElement = ({
  children,
  ...props
}: { children?: React.ReactNode } & Record<string, unknown>) =>
  React.createElement(
    "div",
    props as React.HTMLAttributes<HTMLDivElement>,
    children
  )

vi.mock("framer-motion", () => ({
  motion: {
    div: motionElement,
  },
  m: {
    div: motionElement,
    span: motionElement,
    h2: motionElement,
    h3: motionElement,
    p: motionElement,
    article: motionElement,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useScroll: () => ({
    scrollYProgress: 0,
  }),
  useTransform: () => "0%",
}))
