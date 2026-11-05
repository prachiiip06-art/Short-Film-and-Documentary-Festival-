export default function WorkshopsPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Workshops
        </h1>
        <p className="text-charcoal-600 mb-12">
          Practical, hands-on sessions designed for aspiring filmmakers.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
            <h2 className="font-montserrat text-xl font-semibold text-charcoal mb-3">
              Scriptwriting Workshop
            </h2>
            <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
              Learn the foundations of writing compelling short-film scripts —
              structure, character, dialogue and visual storytelling.
            </p>
            <p className="text-sm text-champagne font-medium">24 January 2027 • 09:30 – 11:00</p>
          </div>

          <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm">
            <h2 className="font-montserrat text-xl font-semibold text-charcoal mb-3">
              Cinematography Workshop
            </h2>
            <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
              Explore camera language, lighting and framing techniques used in
              independent short films and documentaries.
            </p>
            <p className="text-sm text-champagne font-medium">24 January 2027 • 11:30 – 13:00</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-charcoal-500">
          Workshop seats are limited. Select the “Workshop Participant” ticket type when registering.
        </p>
      </div>
    </div>
  );
}
