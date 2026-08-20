import { MotionDiv } from "@/components/landing/MotionDiv";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { ContactForm } from "@/app/contact/ContactForm";
import { Icons, type IconType } from "@/lib/icons";

const REGISTER_URL = "https://app.mylarpro.com.br/register";

type ContactInfo = {
  label: string;
  value: string;
  href?: string;
  icon: IconType;
};

const contactInfo: ContactInfo[] = [
  {
    label: "E-mail",
    value: "contato@mylarapp.com",
    href: "mailto:contato@mylarapp.com",
    icon: Icons.mail,
  },
  {
    label: "Resposta",
    value: "Até 24 horas úteis",
    icon: Icons.clock,
  },
  {
    label: "Localização",
    value: "Brasil — 100% remoto",
    icon: Icons.mapPin,
  },
];

export default function ContatoPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-1/4 right-1/4 h-[500px] w-[600px] rounded-full bg-[#2facde]/8 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/60 uppercase backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-[#2facde]" />
              Fale conosco
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Como podemos
              <br />
              <span className="bg-gradient-to-r from-[#2facde] to-[#37d6c0] bg-clip-text text-transparent">
                ajudar você?
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Tire dúvidas, solicite uma demonstração ou fale sobre parcerias.
              Nossa equipe responde em até 24 horas.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            {/* Left — info */}
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Vamos conversar
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Seja para conhecer a plataforma, tirar dúvidas técnicas ou
                discutir uma parceria — estamos aqui para ajudar sua
                imobiliária a dar o próximo passo.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde]">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-slate-900 transition hover:text-[#2facde]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Quick CTA */}
              <div className="mt-10 rounded-2xl border border-[#2facde]/15 bg-gradient-to-br from-[#2facde]/5 to-white p-5">
                <p className="text-sm font-bold text-slate-900">
                  Quer conhecer a plataforma agora?
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Crie sua conta gratuita e explore todos os módulos sem
                  compromisso.
                </p>
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2facde] transition hover:gap-3"
                >
                  Criar conta grátis
                  <Icons.arrowRight className="size-4" />
                </a>
              </div>
            </MotionDiv>

            {/* Right — form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Perguntas frequentes
              </h2>
              <p className="mt-3 text-slate-600">
                Respostas rápidas para as dúvidas mais comuns.
              </p>
            </MotionDiv>
            <FAQ />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
