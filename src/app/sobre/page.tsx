import type { Metadata } from "next";
import { Container, CTA, SectionHeading } from "@/components/ui";
import { PageHero } from "@/components/content";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Sobre", description: "Conheça a DIRECT TI, sua história, equipe técnica, tecnologias e produtos digitais." };

const timeline = [
  ["2001", "Início da trajetória", "Experiência construída em tecnologia aplicada a operações reais."],
  ["PUC-Rio", "Formação técnica", "Base para trabalhar com engenharia de software, dados e sistemas corporativos."],
  ["EuroIT", "Sistemas empresariais", "Vivência em aplicações, processos e integrações que sustentam negócios."],
  ["EasyCarros", "Produtos digitais", "Experiência em plataformas com operação, usuários e evolução contínua."],
  ["Petrobras", "Ambientes críticos", "Contato com escala, confiabilidade, regras complexas e responsabilidade operacional."],
  ["DIRECT TI", "Atuação independente", "Consultoria e desenvolvimento próximos de empresas que precisam evoluir com controle."],
  ["Produtos SaaS", "Construção própria", "Aplicação do conhecimento em produtos digitais como DirectOS e outras soluções."],
] as const;

const values = [
  ["Clareza técnica", "Documentamos decisões, dependências e riscos para que a tecnologia seja compreendida e mantida."],
  ["Continuidade", "Priorizamos mudanças que respeitam a operação e deixam o sistema mais preparado para o próximo ciclo."],
  ["Responsabilidade", "Comunicamos limites, impactos e trade-offs antes de transformar uma decisão em código."],
  ["Proximidade", "Trabalhamos diretamente com as pessoas que conhecem o negócio, sem camadas desnecessárias."],
] as const;

const technologies = [".NET", "C#", "ASP Classic", "PHP", "Python", "React", "Next.js", "TypeScript", "SQL Server", "Oracle", "PostgreSQL", "Power BI", "Docker", "Azure", "REST", "SOAP"];

export default function Sobre() { return <>
  <PageHero eyebrow="Sobre a DIRECT TI"  breadcrumbLabel="Sobre" title="Engenharia de software com responsabilidade sobre a operação" text="A DIRECT TI trabalha com desenvolvimento, modernização e sustentação de sistemas corporativos. Nossa experiência combina código, dados, integrações e entendimento do contexto em que cada aplicação precisa funcionar." />

  <section className="py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-start"><div><SectionHeading eyebrow="História" title="Uma trajetória construída em sistemas que precisam funcionar" text="A DIRECT TI reúne experiência em diferentes momentos do ciclo de tecnologia: formação, desenvolvimento de produtos, ambientes críticos, dados e evolução de sistemas legados. Essa trajetória orienta uma prática direta, técnica e conectada ao impacto no negócio." /></div><div className="card border-t-4 border-t-blue-600"><p className="eyebrow">DIRECT TI</p><h2 className="mt-3 text-2xl font-semibold text-slate-900">Tecnologia próxima das decisões</h2><p className="mt-4 leading-7 text-slate-600">Somos uma equipe especializada para empresas que precisam entender, construir ou modernizar software sem perder o controle da operação.</p></div></Container></section>

<section className="about-timeline-section">
  <Container>
    <SectionHeading
      center
      eyebrow="Linha do tempo"
      title="Experiência acumulada em contextos diferentes"
      text="Uma trajetória construída em ambientes, tecnologias e desafios distintos — sempre conectada à evolução de sistemas e operações."
    />

    <div className="about-timeline">
      {timeline.map(([period, title, text], index) => (
        <article className="timeline-item" key={`${period}-${title}`}>
          <div className="timeline-step" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="timeline-card">
            <p className="timeline-period">{period}</p>

            <h3>{title}</h3>

            <p className="timeline-description">
              {text}
            </p>
          </div>
        </article>
      ))}
    </div>
  </Container>
</section>

  <section className="py-16 sm:py-24"><Container><SectionHeading eyebrow="Missão" title="Tornar sistemas corporativos mais compreensíveis, confiáveis e evolutivos" text="Nossa missão é transformar conhecimento técnico em continuidade operacional: diagnosticar o que existe, construir o que falta e criar condições para que a equipe evolua o sistema com segurança." /><div className="mt-10 grid gap-5 md:grid-cols-2">{values.map(([title, text]) => <article className="card" key={title}><h3 className="text-xl font-semibold text-slate-900">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></Container></section>

  <section className="bg-slate-950 py-16 text-white sm:py-24"><Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Tecnologias" title="A ferramenta se adapta ao problema" text="Trabalhamos com stacks modernas e tecnologias presentes em ambientes corporativos. A escolha considera o legado, a equipe, a segurança e o custo de evolução." /><div className="flex flex-wrap content-start gap-2">{technologies.map((technology) => <span className="rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200" key={technology}>{technology}</span>)}</div></Container></section>

  <section className="py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><SectionHeading eyebrow="Equipe" title="Uma equipe técnica enxuta, com responsabilidade ponta a ponta" text="A DIRECT TI mantém comunicação direta entre diagnóstico, arquitetura, desenvolvimento e sustentação. Isso reduz ruído, preserva contexto e acelera decisões que dependem de conhecimento técnico." /><div className="grid gap-4 sm:grid-cols-2">{["Arquitetura e diagnóstico", "Backend e APIs", "Frontend e experiência", "Dados, BI e performance", "Modernização incremental", "Documentação e sustentação"].map((role) => <div className="card font-medium text-slate-800" key={role}>✓ {role}</div>)}</div></Container></section>

  <section className="bg-slate-50 py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Modernização" title="Evoluir sem apagar o conhecimento existente" text="Avaliamos dependências, regras, dados e riscos antes de propor mudanças. O objetivo é criar um caminho executável: estabilizar, isolar, modernizar e descontinuar no momento adequado." /><div className="mt-7"><a className="font-semibold text-blue-700" href="/legado360">Conheça o Legado360 →</a></div></div><div><SectionHeading eyebrow="Produtos" title="Conhecimento aplicado em soluções próprias" text="Além de projetos sob medida, desenvolvemos produtos para transformar problemas recorrentes em plataformas utilizáveis." /><div className="mt-7 grid gap-3">{site.products.map((product) => <a className="card block transition hover:-translate-y-1 hover:border-blue-300" href="/produtos" key={product.name}><h3 className="font-semibold text-slate-900">{product.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p></a>)}</div></div></Container></section>

  <CTA />
 </>; }
