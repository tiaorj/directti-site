import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { PageHero } from "@/components/content";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Política de privacidade da DIRECT TI.",
};

export default function Politica() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de privacidade"
        text="Como tratamos os dados enviados por nossos canais digitais e de contato."
      />

      <article className="prose-page">
        <Container className="max-w-3xl py-16 sm:py-24">
          <h2>Dados de contato</h2>

          <p>
            Quando você utiliza o formulário
            de contato, podemos registrar
            informações como nome, empresa,
            e-mail, área de interesse e a
            mensagem enviada.
          </p>

          <p>
            Esses dados são utilizados para
            responder à solicitação e permitir
            o acompanhamento comercial ou
            técnico relacionado ao contato.
          </p>

          <h2>Origem do contato</h2>

          <p>
            Também podem ser registrados
            dados de atribuição, como página
            de origem, referência e parâmetros
            de campanha UTM, quando
            disponíveis.
          </p>

          <h2>Analytics</h2>

          <p>
            O site utiliza ferramentas de
            análise para compreender
            navegação e interações com
            páginas, serviços, produtos e
            canais de contato.
          </p>

          <p>
            O conteúdo pessoal informado no
            formulário, como nome, e-mail,
            empresa e mensagem, não é enviado
            como parâmetro de evento ao
            Google Analytics.
          </p>

          <h2>WhatsApp e e-mail</h2>

          <p>
            Caso você escolha continuar o
            atendimento por WhatsApp ou
            e-mail, o tratamento dessas
            informações também estará sujeito
            às condições do respectivo
            serviço utilizado.
          </p>

          <h2>Atualizações</h2>

          <p>
            Esta política poderá ser
            atualizada conforme novos canais,
            integrações ou recursos forem
            disponibilizados.
          </p>
        </Container>
      </article>
    </>
  );
}