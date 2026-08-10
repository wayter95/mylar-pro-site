import Link from "next/link";

const faq = [
  {
    question: "Quanto tempo leva para migrar?",
    answer:
      "Depende do volume, mas a maioria das imobiliárias entra em operação em poucas semanas. A migração acontece em paralelo, com o sistema antigo ainda no ar.",
  },
  {
    question: "Vocês trazem os meus dados?",
    answer:
      "Sim. Imóveis, clientes, contratos e histórico financeiro são importados pela nossa equipe a partir das planilhas ou da exportação do sistema atual.",
  },
  {
    question: "Existe fidelidade ou multa de saída?",
    answer:
      "Não. O plano é mensal e pode ser cancelado a qualquer momento, com exportação dos seus dados.",
  },
  {
    question: "Preciso pagar por corretor?",
    answer:
      "Os aplicativos estão inclusos no plano. O que define o valor é o porte da operação, não quantas pessoas usam.",
  },
  {
    question: "O suporte é humano?",
    answer:
      "É. Atendimento por WhatsApp e e-mail com pessoas que conhecem a operação imobiliária, não só o software.",
  },
  {
    question: "E a LGPD?",
    answer:
      "Dados hospedados no Brasil, com controle de acesso por perfil, registro de quem viu o quê e contrato de tratamento de dados incluído.",
  },
];

export function HomeFaq() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
              Dúvidas frequentes
            </span>
            <h2 className="mt-3.5 text-[27px] leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              O que costuma travar a decisão.
            </h2>
            <p className="mt-4 text-base leading-[1.6] text-slate-600">
              Não achou a sua pergunta?{" "}
              <Link href="/contact" className="font-bold text-[#2facde] transition hover:text-[#2599bb]">
                Fale com um especialista
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-[22px]">
            {faq.map((item) => (
              <div key={item.question} className="border-t border-slate-200 pt-5">
                <h3 className="text-base font-extrabold tracking-tight text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-slate-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
