import { MapPin, Clock, Calendar } from "lucide-react";

export default function VenuePage() {
  return (
    <div className="section-padding">
      <div className="container-narrow">
        <h1 className="font-playfair text-4xl font-bold text-charcoal mb-8">
          Venue & Location
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-champagne shrink-0 mt-1" />
              <div>
                <h2 className="font-montserrat font-semibold text-charcoal text-lg">
                  Suchitra Cinema and Cultural Academy
                </h2>
                <p className="text-charcoal-600 mt-1 leading-relaxed">
                  #36, 9th Main, B. V. Karanth Road,<br />
                  near Post Office, Banashankari 2nd Stage,<br />
                  Bengaluru, Karnataka 560070, India
                </p>
                <p className="text-sm text-charcoal-500 mt-2 italic">
                  (Proposed venue; booking and auditorium availability are not yet confirmed.)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-champagne shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-charcoal">Dates</h3>
                <p className="text-charcoal-600">23 – 24 January 2027</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-champagne shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-charcoal">Timings</h3>
                <p className="text-charcoal-600">9:00 AM – 6:00 PM IST (Asia/Kolkata)</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Suchitra+Cinema+and+Cultural+Academy+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-charcoal-100 bg-charcoal-50 aspect-video flex items-center justify-center">
            <iframe
              title="Suchitra Cinema Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.55!3d12.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzQ4LjAiTiA3N8KwMzMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
