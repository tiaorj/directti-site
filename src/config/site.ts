export type ProductStatus = "Em operação" | "Em evolução" | "Projeto demonstrativo";
export type Product = {
  name: string;
  description: string;
  technologies: readonly string[];
  status: ProductStatus;
  href: string;
  notes?: readonly string[];
};

export const site = {
  name: "DIRECT TI",
  legalName: "DIRECT TI",
  description:
    "Consultoria e desenvolvimento de software para modernização de sistemas, integrações, dados e automação empresarial.",
  domain: "https://directti.dev.br",
  email: "direct.ti.tec@gmail.com", // Substitua pelo e-mail corporativo.
  phone: "+55 (41) 99911-3960", // Substitua pelo telefone corporativo.
  whatsapp: "5541999113960", // Apenas números, com DDI e DDD.
  linkedin: "https://www.linkedin.com/in/sebastiao-oliveira-tech/", // Substitua pela URL institucional.
  github: "https://github.com/tiaorj/", // Substitua pela URL institucional.
  products: [
    {
      name: "DirectOS",
      description: "Plataforma SaaS multiempresa para gestão de ordens de serviço, clientes, serviços, recebimentos, indicadores e comunicação operacional.",
      technologies: ["PHP", "SQL Server", "PDO SQLSRV", "Bootstrap", "JavaScript", "jQuery", "HTML", "CSS"],
      notes: ["Arquitetura multiempresa/SaaS, autenticação e sessões, proteção CSRF.", "Integrações e APIs são apresentadas somente quando efetivamente implementadas."],
      status: "Em evolução",
      href: "https://directos.directti.dev.br/",
    },
    {
      name: "Controle Financeiro",
      description: "Aplicação web para organização de receitas, despesas, categorias, carteiras e períodos financeiros.",
      technologies: ["Python", "Flask", "SQL Server", "HTML", "CSS", "JavaScript", "Bootstrap"],
      notes: ["Inclui autenticação.", "Docker não é divulgado como tecnologia do projeto enquanto o uso em produção não estiver confirmado."],
      status: "Em operação",
      href: "https://directti.dev.br/login?next=/app/financeiro",
    },
    {
      name: "Meu Álbum 26",
      description: "Aplicação web para controle de coleções, itens repetidos e faltantes, com autenticação, busca, filtros e compartilhamento.",
      technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
      notes: ["PWA deve ser divulgado apenas quando os recursos correspondentes estiverem implementados."],
      status: "Projeto demonstrativo",
      href: "https://meu-album-26.vercel.app/",
    },
  ] satisfies readonly Product[],
} as const;

export const navItems = [
  { label: "Início", href: "/" }, { label: "Serviços", href: "/servicos" },
  { label: "Legado360", href: "/legado360" }, { label: "Produtos", href: "/produtos" },
  { label: "Cases", href: "/cases" }, { label: "Sobre", href: "/sobre" }, { label: "Contato", href: "/contato" },
];

export const contactLinks = {
  whatsapp: (message = "Olá, gostaria de conversar sobre um projeto.") => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
  email: (subject = "Contato pelo site DIRECT TI") => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`,
};
