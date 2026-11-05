export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-xl">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-2">
          Contact
        </h1>
        <p className="text-charcoal-600 mb-10">
          Have questions about Frame By Frame 2027? Reach out to the organizing team.
        </p>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-champagne mb-1">
              Festival Director
            </h2>
            <p className="text-lg font-medium text-charcoal">Prachi Patel</p>
          </div>

          <div>
            <h3 className="text-sm text-charcoal-500">Email</h3>
            <a
              href="mailto:prachiiip06@gmail.com"
              className="text-charcoal font-medium hover:text-champagne transition-colors"
            >
              prachiiip06@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-sm text-charcoal-500">Phone / WhatsApp</h3>
            <a
              href="tel:+919113693553"
              className="text-charcoal font-medium hover:text-champagne transition-colors"
            >
              +91 91136 93553
            </a>
          </div>

          <div>
            <h3 className="text-sm text-charcoal-500">Venue</h3>
            <p className="text-charcoal">
              Suchitra Cinema and Cultural Academy<br />
              Banashankari 2nd Stage, Bengaluru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
