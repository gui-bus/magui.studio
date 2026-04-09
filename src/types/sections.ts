export interface Project {
  title: string
  image: string
  link: string
}

export interface Service {
  id: string
  title: string
  label: string
  description: string
  color: string
  textColor: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Discipline {
  id: string
  title: string
  label: string
  description: string
}
