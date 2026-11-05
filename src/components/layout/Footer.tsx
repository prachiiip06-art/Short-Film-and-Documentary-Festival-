import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-wide section-padding">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="Frame By Frame"
                width={48}
                height={48}
                className="h-12 w-12 object-contain brightness-0 invert"
              />
              <span className="font-playfair text-xl font-semibold text-champagne">
                FRAME BY FRAME
              </span>
            </div>
            <p className="text-sm text-charcoal-300 leading-relaxed max-w-xs">
              Every Frame Tells a Story. Every Story Creates an Impact.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-champagne mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li><Link href="/about" className="hover:text-champagne transition-colors">About</Link></li>
              <li><Link href="/agenda" className="hover:text-champagne transition-colors">Agenda</Link></li>
              <li><Link href="/speakers" className="hover:text-champagne transition-colors">Speakers</Link></li>
              <li><Link href="/register" className="hover:text-champagne transition-colors">Register</Link></li>
              <li><Link href="/contact" className="hover:text-champagne transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-sm font-semibold uppercase tracking-wider text-champagne mb-4">
              Event Details
            </h4>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>23 – 24 January 2027</li>
              <li>9:00 AM – 6:00 PM IST</li>
              <li>Suchitra Cinema and Cultural Academy</li>
              <li>Banashankari 2nd Stage, Bengaluru</li>
              <li className="pt-2">
                <a href="mailto:prachiiip06@gmail.com" className="hover:text-champagne transition-colors">
                  prachiiip06@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-400">
          <p>© 2027 Frame By Frame Festival. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-champagne transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-champagne transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
