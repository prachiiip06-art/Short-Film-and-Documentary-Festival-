import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Film, Award, Users, Clapperboard } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <Image
          src="/images/banner.jpeg"
          alt="Frame By Frame 2027"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/80" />
        <div className="relative z-10 container-wide px-4 text-center text-ivory">
          <p className="font-montserrat text-sm uppercase tracking-[0.3em] text-champagne mb-4">
            Short Film & Documentary Festival
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            FRAME BY FRAME
          </h1>
          <p className="font-poppins text-lg sm:text-xl text-ivory/90 max-w-2xl mx-auto mb-8">
            Every Frame Tells a Story. Every Story Creates an Impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-10">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-champagne" />
              23 – 24 January 2027
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-champagne" />
              Suchitra Cinema, Bengaluru
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="btn-primary">
              Register Now
            </Link>
            <Link href="/about" className="btn-secondary text-ivory border-ivory hover:bg-ivory hover:text-charcoal">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-ivory">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Festival Highlights
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Two days of powerful storytelling, learning and connection for the next generation of filmmakers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Film,
                title: "Screenings",
                desc: "Student short films and thought-provoking documentaries on the big screen."
              },
              {
                icon: Users,
                title: "Filmmaker Sessions",
                desc: "Interactive discussions with directors and independent creators."
              },
              {
                icon: Clapperboard,
                title: "Workshops",
                desc: "Hands-on scriptwriting and cinematography workshops."
              },
              {
                icon: Award,
                title: "Awards",
                desc: "Audience Choice and Best Film awards celebrating emerging talent."
              },
              {
                icon: Users,
                title: "Networking",
                desc: "Connect with peers, mentors and industry professionals."
              },
              {
                icon: Film,
                title: "Panel Discussions",
                desc: "Expert conversations on independent cinema and storytelling."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-charcoal-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-champagne/40 transition-all duration-300"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-champagne/10 text-champagne group-hover:bg-champagne group-hover:text-charcoal transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-montserrat text-lg font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-narrow text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">
            Be a Part of the Festival
          </h2>
          <p className="text-charcoal-300 mb-8 max-w-xl mx-auto">
            Whether you are a student filmmaker, cinema enthusiast or industry professional — join us in Bengaluru this January.
          </p>
          <Link href="/register" className="btn-primary">
            Register for Frame By Frame 2027
          </Link>
        </div>
      </section>
    </>
  );
}
