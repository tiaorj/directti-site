import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";
import { PageHero } from "@/components/content";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contato", description: "Converse com a equipe DIRECT TI sobre modernização, desenvolvimento e sustentação de sistemas." };

const channels = [
  { icon: "◌", label: "WhatsApp", value: site.phone, href: `https://wa.me/${site.whatsapp}`, external: true },
  { icon: "@", label: "E-mail", value: site.email, href: `mailto:${site.email}`, external: false },
  { icon: "in", label: "LinkedIn", value: "Acompanhe a DIRECT TI", href: site.linkedin, external: true },
  { icon: "↗", label: "GitHub", value: "Projetos e referências", href: site.github, external: true },
] as const;

export default function Contato() { return <><PageHero eyebrow="Contato" title="Vamos avaliar o próximo passo para seu sistema" text="Conte brevemente o cenário. Nossa equipe retorna pelo canal mais adequado para iniciar a conversa." /><section className="internal-section"><Container className="contact-layout"><div><p className="contact-kicker">Conversa inicial</p><h2 className="contact-form-title">Descreva o contexto da sua operação</h2><p className="contact-form-intro">Use o formulário para indicar o desafio, o momento atual e o que você espera alcançar.</p><ContactForm /></div><aside className="contact-aside"><SectionHeading eyebrow="Canais diretos" title="Prefere falar agora?" text="Escolha o canal mais confortável. O formulário continua sendo a melhor opção para compartilhar detalhes." /><div className="contact-channel-list">{channels.map((channel) => <a className="contact-channel" href={channel.href} key={channel.label} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}><span aria-hidden="true">{channel.icon}</span><div><strong>{channel.label}</strong><small>{channel.value}</small></div><b aria-hidden="true">→</b></a>)}</div></aside></Container></section></>; }
