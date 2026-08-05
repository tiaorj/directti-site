export type ProductStatus = "Em operação" | "Em evolução" | "Projeto demonstrativo";

export const site = {
  name: "DIRECT TI",
  legalName: "DIRECT TI",
  description:
    "Consultoria e desenvolvimento de software para modernização de sistemas, integrações, dados e automação empresarial.",
  domain: "https://directti.dev.br/",
  email: "direct.ti.tec@gmail.com", // Substitua pelo e-mail corporativo.
  phone: "+55 (41) 99911-3960", // Substitua pelo telefone corporativo.
  whatsapp: "5541999113960", // Apenas números, com DDI e DDD.
  linkedin: "https://www.linkedin.com/in/sebastiao-oliveira-tech/", // Substitua pela URL institucional.
  github: "https://github.com/tiaorj/", // Substitua pela URL institucional.
  products: [
    { name: "DirectOS", description: "Plataforma SaaS para gestão de ordens de serviço, clientes, serviços, recebimentos, indicadores e comunicação operacional.", technologies: ["Next.js", "TypeScript", "SQL Server"], status: "Em evolução" as ProductStatus, href: "#" },
    { name: "Controle Financeiro", description: "Aplicação web para organização de receitas, despesas, categorias, carteiras e períodos financeiros.", technologies: ["React", "TypeScript", "PostgreSQL"], status: "Em operação" as ProductStatus, href: "#" },
    { name: "Meu Álbum 26", description: "Aplicação web/PWA para controle de coleções, itens repetidos e faltantes, com autenticação, busca, filtros e compartilhamento.", technologies: ["Next.js", "PWA", "TypeScript"], status: "Projeto demonstrativo" as ProductStatus, href: "#" },
  ],
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
