export function BlogHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#020617] pt-16 pb-14 sm:pt-20 sm:pb-16"
      aria-labelledby="blog-hero-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 right-[8%] h-[500px] w-[700px] rounded-full"
        style={{
          background: "rgba(47,172,222,0.1)",
          filter: "blur(130px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-700" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Blog
          </span>
        </div>

        <h1
          id="blog-hero-title"
          className="mt-6 max-w-3xl text-[2rem] leading-[1.07] font-extrabold tracking-tight text-white sm:text-[2.5rem] md:text-5xl"
        >
          O que muda no mercado imobiliário —{" "}
          <span className="text-[#2facde]">e o que muda na plataforma.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-[1.0625rem]">
          Índices, legislação, gestão de carteira e as novidades que entram no
          Mylar Pro a cada semana.
        </p>
      </div>
    </section>
  );
}
