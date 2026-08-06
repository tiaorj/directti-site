import type { Metadata } from "next";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { PageHero } from "@/components/content";

export const metadata: Metadata = {
  title: "Legado360",
  description: "Diagnóstico técnico e roadmap de modernização para sistemas legados críticos, com risco controlado e continuidade operacional.",
};

const steps = [
  ["01", "Descoberta técnica", "Levantamos stack, infraestrutura, jobs, integrações, bancos e regras que sustentam a operação."],
  ["02", "Mapeamento de dependências", "Relacionamos módulos, tabelas, serviços e fluxos para revelar acoplamentos e pontos de falha."],
  ["03", "Análise de risco", "Classificamos criticidade, segurança, performance, observabilidade, dívida técnica e conhecimento concentrado."],
  ["04", "Roadmap priorizado", "Organizamos quick wins, contenção de risco e ondas de modernização com esforço e dependências explícitos."],
  ["05", "Execução assistida", "Apoiamos a implementação incremental, preservando regras de negócio e reduzindo o risco de transição."],
] as const;

const benefits = [
  ["Decisão baseada em evidência", "Troque opiniões sobre o legado por um inventário técnico verificável e uma visão clara do custo de cada caminho."],
  ["Continuidade operacional", "Modernize por fatias, isolando componentes críticos sem exigir uma substituição total e abrupta."],
  ["Conhecimento recuperado", "Transforme dependências implícitas e conhecimento tribal em documentação útil para a equipe."],
  ["Investimento priorizado", "Direcione orçamento para riscos e gargalos que afetam disponibilidade, segurança e capacidade de evolução."],
] as const;

const technologies = ["ASP Classic", ".NET", "C#", "PHP", "SQL Server", "Oracle", "REST", "SOAP", "IIS", "Power BI", "Docker", "Azure"];

export default function Legado() {
  return <>
    <PageHero eyebrow="Legado360" title="Modernização segura começa com visibilidade técnica" text="Diagnóstico estruturado para sistemas corporativos que concentram regras críticas, dependências históricas e não podem parar durante a evolução." />

    <section className="py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
      <SectionHeading eyebrow="O problema" title="O risco não está apenas no código antigo" text="Em sistemas legados, regras de negócio podem estar distribuídas entre telas, procedures, jobs, integrações e conhecimento de poucas pessoas. Sem esse mapa, qualquer mudança vira uma aposta operacional." />
      <div className="grid gap-4 sm:grid-cols-2">
        {["Dependências que não aparecem na documentação", "Integrações sem contrato, logs ou rastreabilidade", "Alterações que exigem conhecimento concentrado", "Banco de dados carregando regras críticas", "Ambientes difíceis de reproduzir e testar", "Receio de mexer em uma operação essencial"].map((item) => <div className="card border-l-4 border-l-blue-600" key={item}><p className="font-medium text-slate-800">{item}</p></div>)}
      </div>
    </Container></section>

    <section className="bg-slate-50 py-16 sm:py-24"><Container>
      <SectionHeading eyebrow="Como funciona" title="Da evidência técnica ao plano executável" text="O Legado360 organiza a investigação em etapas objetivas, conectando arquitetura, operação e decisão de investimento." />
      <ol className="mt-10 grid gap-4 md:grid-cols-5">{steps.map(([number, title, text]) => <li className="card relative" key={number}><span className="text-sm font-bold text-blue-700">{number}</span><h3 className="mt-4 font-semibold text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></li>)}</ol>
    </Container></section>

    <section className="py-16 sm:py-24"><Container>
      <SectionHeading eyebrow="Benefícios" title="Mais controle para evoluir sem interromper" />
      <div className="mt-10 grid gap-5 md:grid-cols-2">{benefits.map(([title, text]) => <article className="card" key={title}><h3 className="text-xl font-semibold text-slate-900">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div>
    </Container></section>

    <section className="bg-slate-950 py-16 text-white sm:py-24"><Container>
      <SectionHeading eyebrow="Fluxo de modernização" title="Uma transição por ondas, não um salto no escuro" text="O roadmap pode combinar contenção imediata, extração gradual de capacidades e substituição controlada de componentes." />
      <div className="mt-10 grid gap-3 md:grid-cols-4">{["Estabilizar", "Isolar", "Modernizar", "Descontinuar"].map((title, index) => <div className="border border-slate-700 bg-slate-900/70 p-5" key={title}><span className="text-sm font-bold text-blue-400">0{index + 1}</span><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{["Corrigir riscos urgentes e criar observabilidade mínima.", "Definir contratos e separar dependências de alto acoplamento.", "Substituir capacidades com testes e rollout progressivo.", "Retirar componentes somente após evidência de estabilidade."][index]}</p></div>)}</div>
    </Container></section>

    <section className="py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-start">
      <div><SectionHeading eyebrow="Tecnologias" title="Experiência em ambientes heterogêneos" text="A análise considera o contexto real da aplicação, sem impor uma reescrita ou uma stack por preferência de ferramenta." /><div className="mt-7 flex flex-wrap gap-2">{technologies.map((technology) => <span className="rounded border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700" key={technology}>{technology}</span>)}</div></div>
      <div className="card bg-slate-50"><h3 className="font-semibold text-slate-900">O diagnóstico observa</h3><ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-600">{["Arquitetura e ciclo de deploy", "Modelo de dados e performance", "Segurança e autenticação", "Integrações e processamento assíncrono", "Monitoramento e recuperação", "Testabilidade e documentação"].map((item) => <li key={item}>✓ {item}</li>)}</ul></div>
    </Container></section>

    <section className="bg-slate-50 py-16 sm:py-24"><Container>
      <SectionHeading eyebrow="Antes x Depois" title="O que muda quando o cenário fica visível" />
      <div className="mt-10 grid gap-5 lg:grid-cols-2"><div className="card border-t-4 border-t-slate-400"><h3 className="text-xl font-semibold text-slate-900">Antes do Legado360</h3><ul className="mt-5 grid gap-3 text-slate-600">{["Prioridades definidas por urgência", "Dependências descobertas durante a mudança", "Risco difícil de comunicar à liderança", "Conhecimento retido em poucas pessoas"].map((item) => <li key={item}>— {item}</li>)}</ul></div><div className="card border-t-4 border-t-blue-600"><h3 className="text-xl font-semibold text-slate-900">Depois do Legado360</h3><ul className="mt-5 grid gap-3 text-slate-600">{["Backlog técnico conectado ao impacto operacional", "Mapa de dependências para planejar ondas", "Riscos classificados e comunicáveis", "Roadmap documentado para a equipe"].map((item) => <li key={item}>✓ {item}</li>)}</ul></div></div>
    </Container></section>

    <section className="py-16 sm:py-24"><Container className="max-w-4xl">
      <SectionHeading center eyebrow="Perguntas frequentes" title="Dúvidas comuns sobre o diagnóstico" />
      <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">{[["O Legado360 exige uma reescrita completa?", "Não. O objetivo é avaliar opções e priorizar uma evolução segura. Em muitos cenários, a estratégia adequada combina estabilização, isolamento e substituição gradual."], ["Quais sistemas podem ser avaliados?", "Aplicações web, ERPs, portais internos, integrações, bancos de dados e soluções desenvolvidas em tecnologias como ASP Classic, .NET, PHP, SQL Server e Oracle."], ["A operação precisa parar durante o diagnóstico?", "Não. A investigação é planejada para respeitar a rotina da empresa e pode começar com entrevistas, acesso controlado, documentação existente e análise dos fluxos críticos."], ["O que recebemos ao final?", "Um inventário técnico, mapa de dependências, riscos priorizados, recomendações de arquitetura, oportunidades de modernização e um roadmap inicial de execução."]].map(([question, answer]) => <details className="group py-5" key={question}><summary className="cursor-pointer list-none pr-8 font-semibold text-slate-900 marker:hidden">{question}<span className="float-right text-blue-700 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-slate-600">{answer}</p></details>)}</div>
    </Container></section>

    <section className="bg-blue-700 py-16 text-white sm:py-20"><Container className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><p className="eyebrow text-blue-200">Próximo passo</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Entenda o seu legado antes que ele limite o negócio.</h2><p className="mt-4 max-w-2xl leading-7 text-blue-100">Converse com a DIRECT TI para avaliar o contexto técnico, os riscos atuais e o primeiro recorte de modernização.</p></div><ButtonLink href="/contato" secondary>Solicitar diagnóstico</ButtonLink></Container></section>
  </>;
}
