import type { Metadata } from "next";
import { Container, CTA } from "@/components/ui";
import { PageHero } from "@/components/content";

export const metadata: Metadata = {
  title: "Cases",
  description:
    "Experiências da DIRECT TI em sistemas corporativos, modernização, dados e integrações.",
};

const cases = [
  {
    title: "Sistema jurídico corporativo",
    context:
      "Operação com regras processuais, documentos e etapas sensíveis.",
    problem:
      "Informações e regras estavam distribuídas entre fluxos que precisavam evoluir sem comprometer rotinas existentes.",
    challenge:
      "Organizar a evolução com rastreabilidade, preservando comportamentos essenciais e reduzindo dependências implícitas.",
    technologies: [".NET", "SQL Server", "APIs"],
    result:
      "Base mais clara para continuidade, manutenção e evolução incremental.",
  },
  {
    title: "Plataforma de gestão de frotas",
    context:
      "Operação de mobilidade com registros, status e informações distribuídas.",
    problem:
      "A equipe precisava consolidar processos operacionais e melhorar a visibilidade sobre os dados de campo.",
    challenge:
      "Construir uma experiência consistente sem perder aderência às regras e exceções da operação.",
    technologies: ["ASP.NET", "JavaScript", "SQL Server"],
    result:
      "Maior visibilidade das atividades e organização dos fluxos de gestão.",
  },
  {
    title: "Dashboard executivo e inteligência de dados",
    context:
      "Ambiente corporativo com dados em fontes distintas e leituras manuais.",
    problem:
      "Indicadores eram produzidos de formas diferentes, dificultando comparação e tomada de decisão.",
    challenge:
      "Definir modelo, métricas e contexto para transformar fontes heterogêneas em informação confiável.",
    technologies: ["Power BI", "DAX", "Power Query", "Oracle"],
    result:
      "Indicadores acessíveis, consistentes e adequados ao acompanhamento contínuo.",
  },
  {
    title: "Modernização de ERP legado",
    context:
      "Aplicação essencial com dependências históricas e conhecimento concentrado.",
    problem:
      "A evolução era limitada pelo risco de alterar regras críticas e pela ausência de uma visão consolidada da arquitetura.",
    challenge:
      "Criar um caminho de modernização sem paralisar a operação nem exigir uma reescrita imediata.",
    technologies: ["ASP Classic", ".NET", "SQL Server"],
    result:
      "Roadmap priorizado para reduzir risco e orientar a substituição gradual de componentes.",
  },
  {
    title: "Integração entre aplicações e serviços externos",
    context:
      "Sistemas corporativos que precisavam trocar informações com consistência.",
    problem:
      "Falhas de comunicação geravam retrabalho e correções manuais sem rastreabilidade suficiente.",
    challenge:
      "Definir contratos, autenticação, tratamento de exceções e reprocessamento para os fluxos críticos.",
    technologies: ["REST", "SOAP", "JSON", "XML"],
    result:
      "Comunicação mais previsível, observável e sustentável entre as aplicações.",
  },
];

export default function Cases() {
  return (
    <>
      <PageHero
        eyebrow="Cases"
        title="Experiência aplicada a cenários corporativos"
        text="Os cases abaixo representam tipos de projetos e experiências da equipe. Por confidencialidade, não divulgamos nomes de clientes ou informações que permitam sua identificação."
      />

      <section className="cases-page-section">
        <Container>
          <div className="cases-intro">
            <p className="eyebrow">Experiência prática</p>
            <h2>Problemas reais exigem decisões técnicas aplicáveis</h2>
            <p>
              Cada cenário combina contexto operacional, desafio técnico e
              uma abordagem orientada à continuidade.
            </p>
          </div>

          <div className="cases-list">
            {cases.map((item, index) => (
              <article className="case-detail-card" key={item.title}>
                <header className="case-detail-header">
                  <div>
                    <span className="case-number">
                      CASE {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2>{item.title}</h2>
                  </div>

                  <p>{item.context}</p>
                </header>

                <div className="case-flow">
                  <section className="case-flow-item">
                    <span className="case-flow-number">01</span>

                    <div>
                      <p className="case-flow-label">Problema</p>
                      <p className="case-flow-text">{item.problem}</p>
                    </div>
                  </section>

                  <section className="case-flow-item">
                    <span className="case-flow-number">02</span>

                    <div>
                      <p className="case-flow-label">Desafio</p>
                      <p className="case-flow-text">{item.challenge}</p>
                    </div>
                  </section>

                  <section className="case-flow-item case-flow-result">
                    <span className="case-flow-number">03</span>

                    <div>
                      <p className="case-flow-label">Resultado</p>
                      <p className="case-flow-text">{item.result}</p>
                    </div>
                  </section>
                </div>

                <footer className="case-detail-footer">
                  <span>Tecnologias</span>

                  <div className="case-technologies">
                    {item.technologies.map((technology) => (
                      <span className="product-tech" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}