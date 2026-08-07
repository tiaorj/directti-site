import type { Metadata } from "next";
import { CTA, Container, SectionHeading, ServiceCard } from "@/components/ui";
import { PageHero } from "@/components/content";

export const metadata: Metadata = { title: "Serviços", description: "Serviços técnicos para modernização, desenvolvimento, sustentação, integrações, dados e automação de sistemas corporativos." };

const services = [
  { icon: "◫", title: "Modernização de sistemas legados", text: "Evoluímos aplicações críticas com migrações incrementais e menor risco operacional.", benefits: ["Diagnóstico de dependências", "Roadmap incremental", "Regras de negócio preservadas"], href: "/servicos/modernizacao-de-sistemas" },
  { icon: "⌘", title: "Desenvolvimento sob medida", text: "Sistemas internos, portais, SaaS, backoffice e APIs para regras de negócio complexas.", benefits: ["Arquitetura sob medida", "Entrega iterativa", "Base preparada para crescer"], href: "/servicos/desenvolvimento-sob-medida" },
  { icon: "↗", title: "Sustentação e evolução", text: "Correções, melhorias, documentação e continuidade para aplicações corporativas.", benefits: ["Prioridade pelo impacto", "Conhecimento documentado", "Evolução contínua"], href: "/servicos/sustentacao-e-evolucao" },
  { icon: "⇄", title: "Integrações e APIs", text: "Conexões confiáveis entre ERPs, aplicações corporativas e serviços externos.", benefits: ["Contratos claros", "Rastreabilidade", "Menos retrabalho"], href: "/servicos/integracoes-e-apis" },
  { icon: "▥", title: "Dados e BI", text: "Modelagem, performance, governança e indicadores em Power BI e bancos de dados.", benefits: ["Indicadores consistentes", "Fontes organizadas", "Decisão mais rápida"], href: "/servicos/dados-e-bi" },
  { icon: "✦", title: "IA e automação", text: "Automação assistida e IA aplicada a processos com validação humana.", benefits: ["Casos de uso controlados", "Integração à operação", "Supervisão humana"], href: "/servicos/ia-e-automacao" },
] as const;

export default function Services() { return <><PageHero eyebrow="Serviços" title="Tecnologia orientada à continuidade e à evolução" text="Atuamos do diagnóstico à implementação, com foco em sistemas corporativos que precisam avançar sem interromper a operação." /><section className="internal-section"><Container><SectionHeading eyebrow="Frentes de atuação" title="Capacidades técnicas para decisões mais seguras" text="Cada frente combina engenharia, contexto operacional e uma forma clara de acompanhar a evolução." /><div className="service-card-grid">{services.map((service) => <ServiceCard {...service} key={service.title} />)}</div></Container></section><CTA /></>; }
