# DIRECT TI Website

[![Website](https://img.shields.io/badge/Website-directti.dev.br-2563eb?style=for-the-badge)](https://directti.dev.br)

Site institucional da DIRECT TI desenvolvido com Next.js, TypeScript e Tailwind CSS, apresentando os serviços, produtos e posicionamento da empresa em modernização de sistemas, desenvolvimento sob medida, integrações, dados e Inteligência Artificial.

## Visão Geral

Este projeto representa o site institucional da DIRECT TI e centraliza a apresentação da empresa, de seus serviços, produtos, cases e canais de contato.

## Principais funcionalidades

- Site institucional
- Landing page do Legado360
- Catálogo de produtos
- Página de serviços
- Cases
- Página Sobre
- Contato
- SEO otimizado
- Sitemap
- Robots
- Dados estruturados
- Layout responsivo

## Tecnologias

### Framework

- Next.js
- React
- TypeScript

### Interface

- Tailwind CSS

### SEO

- Metadata API
- Open Graph
- Sitemap
- Robots
- Structured Data

### Deploy

- Vercel

## Arquitetura

```text
Browser
  ↓
Next.js
  ↓
Pages
  ↓
Components
  ↓
Config
  ↓
Assets
```

## Estrutura de pastas

```text
.
├── public/                 # Arquivos estáticos e assets públicos
├── src/
│   ├── app/                # Rotas, páginas, layout e recursos de SEO
│   │   ├── servicos/       # Página e páginas dinâmicas de serviços
│   │   ├── sitemap.ts      # Sitemap da aplicação
│   │   └── robots.ts       # Configuração de robots
│   ├── components/         # Componentes de interface e conteúdo
│   ├── config/             # Configurações e dados institucionais
│   └── lib/                # Utilitários, incluindo recursos de SEO
├── next.config.ts          # Configuração do Next.js
├── package.json            # Scripts e dependências do projeto
└── tsconfig.json           # Configuração do TypeScript
```

## Executando localmente

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Deploy

O projeto está publicado na Vercel.

Domínio: [https://directti.dev.br](https://directti.dev.br)

## Roadmap

Concluído:

- [x] Novo site institucional
- [x] SEO
- [x] Landing Legado360
- [x] Produtos
- [x] Responsividade

Planejado:

- [ ] Blog
- [ ] Área de demonstrações
- [ ] Cases completos
- [ ] Landing pages dos produtos
- [ ] Analytics
- [ ] Search Console

## Screenshots

<!-- Insira aqui uma captura da página inicial. -->
<!-- Insira aqui uma captura da landing page do Legado360. -->
<!-- Insira aqui uma captura da página de produtos ou serviços. -->

## Sobre a DIRECT TI

A DIRECT TI é especializada na modernização de sistemas legados, desenvolvimento de soluções sob medida, integrações entre sistemas, dados e Inteligência Artificial aplicada ao desenvolvimento de software.

[Conheça a DIRECT TI](https://directti.dev.br)

## Contato

- Site: [directti.dev.br](https://directti.dev.br)
- LinkedIn: [Sebastião Oliveira](https://www.linkedin.com/in/sebastiao-oliveira-tech/)
- GitHub: [@tiaorj](https://github.com/tiaorj/)

## Licença

MIT
