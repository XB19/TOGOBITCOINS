import Reveal from './Reveal'

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="grid-glow relative overflow-hidden border-b border-line bg-ink px-5 pb-16 pt-16 text-center">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="inline-block rounded-full border border-bitcoin/30 bg-bitcoin/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-bitcoin">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-display text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-400">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
